import { addVote } from 'lib/api/index';
import Image from 'next/image';
import React, { FC, useState } from 'react';
import { Post } from 'types';

const Discussion: FC<{ post: Post }> = ({ post }) => {
  const [upVote, setUpVote] = useState(false);
  const [downVote, setDownVote] = useState(false);

  // TODO: Upvote should toggle downvote if it is true and vice-versa
  const handleUpVote = async () => {
    await addVote(post._id, 'upvote', !upVote);
    setUpVote(!upVote);
  };

  const handleDownVote = async () => {
    await addVote(post._id, 'downvote', !downVote);
    setDownVote(!downVote);
  };

  return (
    <div className="my-2 w-full max-w-3xl flex flex-col bg-blue-100 rounded-xl border-2">
      <div className="px-4 pt-3 m-2 font-bold">{post.user_name}</div>
      <div className="pb-5 px-4 mx-2"> {post.body} </div>
      <div className="pb-5 px-4 mx-2 flex">
        <div className="mr-2 cursor-pointer">
          <Image
            src={upVote ? '/images/like-dark.svg' : '/images/like.svg'}
            width={20}
            height={20}
            alt="upvote"
            onClick={() => handleUpVote()}
          />
        </div>
        <div className="ml-2 cursor-pointer">
          <Image
            src={downVote ? '/images/like-dark.svg' : '/images/like.svg'}
            width={20}
            height={20}
            alt="upvote"
            className="transform rotate-180"
            onClick={() => handleDownVote()}
          />
        </div>
      </div>
    </div>
  );
};

export default Discussion;
