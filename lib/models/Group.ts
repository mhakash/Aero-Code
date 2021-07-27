import { dbConnect } from '../utils/dbConnect';
import { Group , Post, User} from 'types';
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
        const promise = await userCollection.updateMany({_id: {$in: id_array }}, { $push: { groups: {_id:group_id.insertedId, name: groupname }} });
        //console.log("added group id to users");
        return promise;
    } catch (err) {
      throw new Error('Could not create user\n' + err?.message);
    }
  };
  export const getDiscussionByGroupID = async (
    grId: string,user_id: string,
  ): Promise<{posts: Post[], group: Group, friends: {_id: string, name: string}[]}> => {
    try {
      const groupCollection = (await dbConnect()).db.collection('groups');
      const group: Group = await groupCollection.findOne({ _id: new ObjectId(grId) });
      const postCollection = (await dbConnect()).db.collection('posts');
      const cursor = await postCollection.find({ _id: {$in: group.posts_id} });
      const posts: Post[] = [];
      for await (const doc of cursor) {
            posts.push(doc);
      }
      const userCollection = (await dbConnect()).db.collection('users');
      const user: User = await userCollection.findOne({ _id: user_id });

      let memberids : string[] = group.members?.map(x=>x._id)??[];
      memberids = memberids.filter(item => item != user_id);

      const nonMemberfriends: {_id: string, name: string}[] = user.friends?.filter(item => !memberids.includes(item._id))??[]
     
      const data = {posts: posts, group: group, friends: nonMemberfriends as {_id: string, name: string}[]}
      return data;
    } catch (err) {
      throw new Error('cannot get');
    }
  };
  

  export const addGroupMember = async (
    _id: string,
    name: string,
    grid: string,
  ): Promise<UpdateWriteOpResult> => {
    try {
      console.log("in addGM in group.ts");
      const groupCollection = (await dbConnect()).db.collection('groups');
      const group: Group = await groupCollection.findOne({ _id: new ObjectId(grid) });
      console.log("group name : "+group.name);
      const promise = await groupCollection.updateOne({_id: new ObjectId(grid) }, { $push: { members: { _id: _id, name: name, role: 0 } }});
      console.log("group updated one");
      
      const userCollection = (await dbConnect()).db.collection('users');
      const promise2 = await userCollection.updateOne({_id: _id}, { $push: { groups: { _id:group._id , name: group.name}}});
      console.log("user updated one");
      return promise2;
    } catch (err) {
      throw new Error('cannot get');
    }
  };
  