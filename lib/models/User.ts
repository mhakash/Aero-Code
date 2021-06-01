import { dbConnect } from '../utils/dbConnect';
import { User } from 'types';

export const createUser = async (user: User): Promise<User> => {
  const newUser = {
    _id: user._id,
    email: user.email,
    avatar: user.avatar,
    profileCompleted: false,
    codes:user.codes
  };

  try {
    const userCollection = (await dbConnect()).db.collection('users');
    await userCollection.insertOne(newUser);

    return newUser;
  } catch (err) {
    throw new Error('Could not create user\n' + err?.message);
  }
};

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const userCollection = (await dbConnect()).db.collection('users');
    const result = await userCollection.findOne({ _id: id });
    
    return result;
  } catch (err) {
    throw new Error('connection error');
  }
};
