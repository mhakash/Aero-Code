import { dbConnect } from '../utils/dbConnect';
import { ObjectId } from 'mongodb';
import { User, Post } from 'types';

export const createPost = async (user_id: string, body: string): Promise<Post> => {
  const temp = {
    user_id: user_id,
    body: body,
    upvotes: 0,
    downvotes: 0,
    replies: [],
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

    return post;
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
  parent_id: string,
  body: string,
): Promise<Post | null> => {
  try {
    const newPost: Post = await createPost(user_id, body);
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
