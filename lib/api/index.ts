import axios from 'axios';
import { Code, User } from 'types';
import firebase from '../utils/firebaseClient';

const BASE_URL = '/api';

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

export const post = async (url: string): Promise<unknown> => {
  try {
    const token = await firebase.auth().currentUser?.getIdToken();
    // console.log('token', token);
    const res = await axios.post(BASE_URL + url, null, {
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

export const getCodes = async (): Promise<{ _id: string; name: string }[]> => {
  const codes = await get('/code');
  // console.log('data', codes);
  return codes as { _id: string; name: string }[];
};

export const getCodeById = async (id: string): Promise<any> => {
  const code = await get(`/code/${id}`);
  // if (typeof code === 'object' && code !== null) {
  //   return JSON.stringify(code, null, 2);
  // }
  console.log(code);
  return code;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const uploadCode = async (filename: string): Promise<any> => {
  const data = await post(`/code?file=${filename}`);
  // console.log('data', data);
  return data;
};
