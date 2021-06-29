export type User = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  profileCompleted?: boolean;
  friends?: { _id: string; name: string }[];
  codes?: { _id: string; name: string }[];
  chatRooms?: string[];
};

export type Code = {
  _id: string;
  name: string;
  user_id: string;
  reviewers?: string[];
};

export type Message={
  _id:string;
  sender_id:string;
  text:string; 
};

export type ChatRoom = {
  _id: string;
  messages?: string[];
};