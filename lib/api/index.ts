import axios from 'axios';
import { Code, User, Message } from 'types';
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

export const post = async (url: string, body?: any): Promise<unknown> => {
  try {
    const token = await firebase.auth().currentUser?.getIdToken();
    // console.log('token', token);
    const res = await axios.post(BASE_URL + url, body ?? null, {
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

type CodeData = { data: string | Object; ext?: string; name: string };

export const getCodeById = async (id: string): Promise<CodeData> => {
  const code = (await get(`/code/${id}`)) as CodeData;
  // console.log(code);
  return code;
};

export const uploadCode = async (filename: string): Promise<any> => {
  const data = await post(`/code?file=${filename}`);
  // console.log('data', data);
  return data;
};

export const searchFriend = async (name: string): Promise<User[]> => {
  const data = await post('/friend', { name });
  console.log('data', data);
  return data as User[];
};

export const addFriend = async (id: string, name: string): Promise<void> => {
  const data = await post('/friend/add', { id, name });
  console.log('data', data);
  // return data as User[];
};

export const addMessage = async (chat_room_id: string, msg: string): Promise<void> => {
  const data = await post('/message', { chat_room_id, msg });
};

export const getMessages = async (chid: string): Promise<Message[]> => {
  const data = await get(`/message/${chid}`);
  // if (typeof code === 'object' && code !== null) {
  //   return JSON.stringify(code, null, 2);
  // }
  //console.log(code);
  return data as Message[];
};
