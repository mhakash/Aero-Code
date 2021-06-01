export type User = {
  _id: string;
  email: string;
  avatar: string;
  profileCompleted?: boolean;
  codes?: { _id: string; name: string }[];
};

export type Code = {
  _id: string;
  name: string;
  user_id: string;
  reviewers?: string[];
};
