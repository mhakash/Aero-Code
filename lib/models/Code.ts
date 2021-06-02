import { dbConnect } from '../utils/dbConnect';
import { Code, User } from 'types';

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
    console.log('error here');
    throw new Error('Could not create user\n' + err?.message);
  }
};

export const getCodeById = async (id: string): Promise<Code | null> => {
  try {
    const codeCollection = (await dbConnect()).db.collection('codes');
    const result = await codeCollection.findOne({ _id: id });

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
