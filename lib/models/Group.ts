import { dbConnect } from '../utils/dbConnect';
import { Group , Post} from 'types';
import { UpdateWriteOpResult } from 'mongodb';
import { post } from 'lib/api';
import { ObjectId } from 'mongodb';

export const createNewGroup = async (user_id: string,user_name: string, groupname: string, members: {_id: string, name: string, role: number}[]): Promise<UpdateWriteOpResult> => {
    members.push({_id: user_id, name: user_name, role: 1});
    const newGroup = {
        name: groupname,
        members: members,
        posts_id: [],
    };
    
    try {
        const groupCollection = (await dbConnect()).db.collection('groups');
        const group_id = await groupCollection.insertOne(newGroup);
        //console.log("group id :"+ group_id);
        const id_array: string[] = members.map(x=>x._id);
        const userCollection = (await dbConnect()).db.collection('users');
        const promise = userCollection.updateMany({_id: {$in: id_array }}, { $push: { groups: {_id:group_id.insertedId, name: groupname }} });
        //console.log("added group id to users");
        return promise;
    } catch (err) {
      throw new Error('Could not create user\n' + err?.message);
    }
  };
  export const getDiscussionByGroupID = async (
    grId: string,
  ): Promise<Post[]> => {
    try {
      const groupCollection = (await dbConnect()).db.collection('groups');
      const group: Group = await groupCollection.findOne({ _id: new ObjectId(grId) });
      const postCollection = (await dbConnect()).db.collection('posts');
      const cursor = await postCollection.find({ _id: {$in: group.posts_id} });
      const posts: Post[] = [];
      for await (const doc of cursor) {
            posts.push(doc);
      }

      return posts;
    } catch (err) {
      throw new Error('cannot get');
    }
  };
  