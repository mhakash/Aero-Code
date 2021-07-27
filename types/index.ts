export type User = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  profileCompleted?: boolean;
  friends?: { _id: string; name: string }[];
  codes?: { _id: string; name: string }[];
  chatRooms?: { _id: string; friend_id: string; friend_name: string }[];
  posts?: string[];
  groups?: { _id: string; name: string }[];
};

export type Code = {
  _id: string;
  name: string;
  user_id: string;
  reviewers?: string[];
};

export type Message = {
  _id: string;
  sender_id: string;
  text: string;
};

export type ChatRoom = {
  _id: string;
  messages?: string[];
};

export type Post = {
  _id: string;
  user_id: string;
  user_name: string;
  body: string;
  upvotes: number;
  downvotes: number;
  is_reply: boolean;
  replies?: string[];
  codes?: { filename: string; code_id: string };
  group_name?: string;
};

export type Group = {
  _id: string;
  name: string;
  members?: { _id: string; name: string; role: number }[];
  posts_id: string[];
};
