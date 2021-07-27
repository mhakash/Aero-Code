import axios from 'axios';
import { Code, User, Group, Message, Post } from 'types';
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
    console.log(err);
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

export const getMessageFriends = async (): Promise<
  { _id: string; friend_name: string; recentmsg: Message; friend_avatar: string }[]
> => {
  const data = await get('/message');
  return data as {
    _id: string;
    friend_name: string;
    recentmsg: Message;
    friend_avatar: string;
  }[];
};

export const getCodes = async (): Promise<{ _id: string; name: string }[]> => {
  const codes = await get('/code');
  // console.log('data', codes);
  console.log(codes);
  return codes as { _id: string; name: string }[];
};

type CodeData = { data: string | Object; ext?: string; name: string };

export const getCodeDataById = async (id: string): Promise<CodeData> => {
  const code = (await get(`/code/${id}`)) as CodeData;
  // console.log(code);
  return code;
};

export const getPostByCodeId = async (id: string): Promise<Post> => {
  const code = (await get(`/code/${id}/data`)) as Post;
  return code;
};

export const uploadCode = async (filename: string, reviewers: string[]): Promise<any> => {
  const data = await post(`/code`, { file: filename, reviewers });
  // console.log('data', data);
  return data;
};

export const searchFriend = async (name: string): Promise<User[]> => {
  const data = await post('/friend', { name });
  // console.log('data', data);
  return data as User[];
};

export const addFriend = async (id: string, name: string): Promise<void> => {
  const data = await post('/friend/add', { id, name });
  // console.log('data', data);
  // return data as User[];
};

export const addMessage = async (chid: string, msg: string): Promise<void> => {
  const data = await post(`/message/${chid}`, { msg });
};

export const getMessages = async (chid: string): Promise<Message[]> => {
  const data = await get(`/message/${chid}`);

  return data as Message[];
};

export const getDiscussions = async (): Promise<Post[]> => {
  const user = await getUser();
  const post_ids = user.posts ?? [];
  let discussions: Post[] = [];

  for (let index = 0; index < post_ids.length; index++) {
    const e = post_ids[index];
    const data = await getDiscussionByID(e);
    discussions.push(data);
  }

  return discussions;
};

export const getDiscussionByID = async (pid: string): Promise<Post> => {
  const data = await get(`/discussion/${pid}`);
  // if (typeof code === 'object' && code !== null) {
  //   return JSON.stringify(code, null, 2);
  // }
  //console.log(code);
  return data as Post;
};

export const addDiscussion = async (body: string): Promise<void> => {
  const data = await post(`/discussion`, { body });
};

export const addVote = async (id: string, type: string, add: boolean): Promise<void> => {
  await post(`/discussion/${id}`, { type: type, add: add });
};

export const createNewGroup = async (
  groupname: string,
  members: { _id: string; name: string; role: number }[],
): Promise<any> => {
  const data = await post(`/group/create`, { groupname, members });
  // console.log('data', data);
  return data;
};

export const getGroupDiscussions = async (
  grid: string,
): Promise<{ posts: Post[]; group: Group; friends: { _id: string; name: string }[] }> => {
  let discussions = await await get(`/group/${grid}`);

  return discussions as {
    posts: Post[];
    group: Group;
    friends: { _id: string; name: string }[];
  };
};
export const addGroupDiscussion = async (
  filename: string,
  txt: string,
  grid: string,
): Promise<any> => {
  const data = await post(`/group/${grid}/add`, { filename, txt, grid });

  return data;
};
export const addGroupMember = async (
  id: string,
  name: string,
  grid: string,
): Promise<{ posts: Post[]; group: Group; friends: { _id: string; name: string }[] }> => {
  const data = await await post(`/group/${grid}`, { id, name });

  return data as {
    posts: Post[];
    group: Group;
    friends: { _id: string; name: string }[];
  };
};

export const addReply = async (parent_id: string, body: string): Promise<void> => {
  await post(`/discussion/${parent_id}/add`, { body });
};

export const addReview = async (
  codeId: string,
  type: string,
  severity: string,
  details: string,
  line: number,
): Promise<void> => {
  const data = await post(`/code/${codeId}`, { type, severity, details, line });
};
