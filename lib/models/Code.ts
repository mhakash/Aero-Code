import { dbConnect } from '../utils/dbConnect';
import { ObjectId } from 'mongodb';
import { Code, User, Group } from 'types';

export const createCode = async (
  user_id: string,
  name: string,
  reviewers?: string[],
): Promise<Code> => {
  const temp = {
    user_id: user_id,
    name: name,
    reviewers: reviewers,
  };

  try {
    const codeCollection = (await dbConnect()).db.collection('codes');
    const res = await codeCollection.insertOne(temp);

    const code: Code = {
      ...temp,
      _id: res.insertedId,
    };

    const userCollection = (await dbConnect()).db.collection('users');

    const t = { _id: res.insertedId, name: name };
    await userCollection.updateOne({ _id: user_id }, { $push: { codes: t } });

    return code;
  } catch (err) {
    throw new Error('Could not create code\n' + err?.message);
  }
};

export const createGroupCode = async (
  user_id: string,
  name: string,
  grid: string,
): Promise<Code> => {
  const temp = {
    user_id: user_id,
    name: name,
  };

  try {
    const codeCollection = (await dbConnect()).db.collection('codes');
    const res = await codeCollection.insertOne(temp);

    //update reviews of res & add post to group
    const groupCollection = (await dbConnect()).db.collection('groups');
    const group: Group = await groupCollection.findOne({_id: new ObjectId(grid)});

    let memberids : string[] = group.members?.map(x=>x._id)??[];
    memberids = memberids.filter(item => item != user_id);
    
    //console.log("group member sonkha :"+ String(memberids.length));
    if(memberids.length>0){
      await codeCollection.updateOne(
        {_id: new ObjectId(res.insertedId)},
        { $push: { reviewers: memberids } },
      );
    }
    const code: Code = {
      ...temp,
      _id: res.insertedId,
    };

    
    return code;
  } catch (err) {
    throw new Error('Could not create code\n' + err?.message);
  }
};

export const getCodeById = async (id: string): Promise<Code | null> => {
  try {
    const codeCollection = (await dbConnect()).db.collection('codes');
    const result = await codeCollection.findOne({ _id: new ObjectId(id) });
    return result;
  } catch (err) {
    throw new Error('connection error');
  }
};

export const getCodesByUserId = async (
  userId: string,
): Promise<{ _id: string; name: string }[]> => {
  try {
    const userCollection = (await dbConnect()).db.collection('users');
    const user: User = await userCollection.findOne({ _id: userId });
    return user.codes ?? [];
  } catch (err) {
    throw new Error('cannot get');
  }
};
