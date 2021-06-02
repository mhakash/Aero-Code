export type User = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  profileCompleted?: boolean;
  friends?: { _id: string; name: string }[];
  codes?: { _id: string; name: string }[];
};

export type Code = {
  _id: string;
  name: string;
  user_id: string;
  reviewers?: string[];
};
