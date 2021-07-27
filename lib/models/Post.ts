import { dbConnect } from '../utils/dbConnect';
import { ObjectID, ObjectId, UpdateWriteOpResult } from 'mongodb';
import { User, Post, Code, Group, ReviewContent } from 'types';

export const createPost = async (
  user_id: string,
  user_name: string,
  body: string,
  is_reply: boolean = false,
  code_id: string = '',
  code_name: string = '',
  reviwers: string[] = [],
  review_content: ReviewContent = {},
): Promise<Post> => {
  const temp = {
    user_id: user_id,
    user_name: user_name,
    body: body,
    upvotes: 0,
    downvotes: 0,
    is_reply: is_reply,
    replies: [],
    codes: { filename: code_name, code_id: code_id },
    group_name: '',
    review_content: review_content,
  };
  try {
    const postCollection = (await dbConnect()).db.collection('posts');
    const res = await postCollection.insertOne(temp);

    const post: Post = {
      ...temp,
      _id: res.insertedId,
    };

    const userCollection = (await dbConnect()).db.collection('users');

    await userCollection.updateOne(
      { _id: user_id },
      { $push: { posts: res.insertedId } },
    );

    for (let i = 0; i < reviwers.length; i++) {
      await userCollection.updateOne(
        { _id: reviwers[i] },
        { $push: { posts: res.insertedId } },
      );
    }

    return post;
  } catch (err) {
    throw new Error('Could not create post\n' + err?.message);
  }
};

export const createGroupPost = async (
  user_id: string,
  user_name: string,
  body: string,
  code_id: string,
  code_name: string,
  grid: string,
  is_reply: boolean = false,
): Promise<UpdateWriteOpResult> => {
  const temp = {
    user_id: user_id,
    user_name: user_name,
    body: body,
    upvotes: 0,
    downvotes: 0,
    is_reply: is_reply,
    replies: [],
    codes: { filename: code_name, code_id: code_id },
  };
  try {
    const postCollection = (await dbConnect()).db.collection('posts');

    const groupCollection = (await dbConnect()).db.collection('groups');
    const group: Group = await groupCollection.findOne({ _id: new ObjectID(grid) });

    const post = {
      ...temp,
      group_name: group.name,
    };
    const res = await postCollection.insertOne(post);
    const res2 = await groupCollection.updateOne(
      { _id: new ObjectId(grid) },
      { $push: { posts_id: res.insertedId } },
    );

    let memberids: string[] = group.members?.map((x) => x._id) ?? [];
    memberids = memberids.filter((item) => item != user_id);

    const userCollection = (await dbConnect()).db.collection('users');
    for (let i = 0; i < memberids.length; i++) {
      await userCollection.updateOne(
        { _id: memberids[i] },
        { $push: { posts: res.insertedId } },
      );
    }

    return res2;
  } catch (err) {
    throw new Error('Could not create post\n' + err?.message);
  }
};

export const getPostById = async (id: string): Promise<Post | null> => {
  try {
    const postCollection = (await dbConnect()).db.collection('posts');
    const result = await postCollection.findOne({ _id: new ObjectId(id) });

    return result;
  } catch (err) {
    throw new Error('connection error');
  }
};

export const createReply = async (
  user_id: string,
  user_name: string,
  parent_id: string,
  body: string,
  review_content: ReviewContent = {},
): Promise<Post | null> => {
  try {
    const newPost: Post = await createPost(user_id, user_name, body, true, '', '', [], review_content);
    const postCollection = (await dbConnect()).db.collection('posts');

    postCollection.updateOne(
      { _id: new ObjectId(parent_id) },
      { $push: { replies: newPost._id } },
    );
    return newPost;
  } catch (err) {
    throw new Error('connection error');
  }
};

export const addVote = async (id: string, type: string, add: boolean): Promise<void> => {
  try {
    const postCollection = (await dbConnect()).db.collection('posts');
    const value = add ? 1 : -1;
    if (type === 'upvote') {
      postCollection.updateOne({ _id: new ObjectId(id) }, { $inc: { upvotes: value } });
    } else if (type === 'downvote') {
      postCollection.updateOne({ _id: new ObjectId(id) }, { $inc: { downvotes: value } });
    }
  } catch (err) {
    throw new Error('cannot increase upvote');
  }
};

export const getPostIdByCodeId = async (id: string): Promise<string> => {
  try {
    const postCollection = (await dbConnect()).db.collection('posts');
    const post: Post = await postCollection.findOne({ 'codes.code_id': id });
    return post._id;
  } catch (err) {
    throw new Error('cannot find post id');
  }
};
