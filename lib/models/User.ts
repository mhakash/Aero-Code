import { dbConnect } from '../utils/dbConnect';
import { User } from 'types';

export const createUser = async (user: User): Promise<User> => {

  const newUser = {
    _id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    profileCompleted: false,
    friends: [],
    codes: []
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

export const getUsersByName = async (name: string): Promise<User[]> => {
  try {
    const userCollection = (await dbConnect()).db.collection('users');
    const cursor = await userCollection.find({ $text: { $search: name } });
    const result:User[] = []
    for await (const doc of cursor) {
      result.push(doc);
    }
    console.log(result);
    return result;
  } catch (err) {
    throw new Error('connection error');
  }
};
