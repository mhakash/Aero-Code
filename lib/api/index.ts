import axios from 'axios';
import { User } from 'types';
import firebase from '../utils/firebaseClient';

const BASE_URL = 'http://localhost:3000/api';

export const get = async (url: string): Promise<unknown> => {
  try {
    const token = await firebase.auth().currentUser?.getIdToken();
    const res = await axios.get(BASE_URL + url, {
      headers: { 'x-firebase-token': token },
    });
    return res.data;
  } catch (err) {
    throw new Error('cannot get');
  }
};

export const getUser = async (): Promise<User> => {
  const user = await get('/test');
  return user as User;
};
