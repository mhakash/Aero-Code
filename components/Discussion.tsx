import { addReply, addVote } from 'lib/api/index';
import Image from 'next/image';
import React, { FC, useState } from 'react';
import { Post } from 'types';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { mutate } from 'swr';

const Discussion: FC<{ post: Post }> = ({ post }) => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const [upVote, setUpVote] = useState(false); 
  const [downVote, setDownVote] = useState(false);
  const [showReply, setShowReply] = useState(false);

  // TODO: Upvote should toggle downvote if it is true and vice-versa
  const handleUpVote = async () => {
    await addVote(post._id, 'upvote', !upVote);
    setUpVote(!upVote);
  };

  const handleDownVote = async () => {
    await addVote(post._id, 'downvote', !downVote);
    setDownVote(!downVote);
  };

  const handleReply = async () => {
    setShowReply(!showReply);
  };

  const onSubmit = async (data: { body: string }) => {
    await addReply(post._id, data.body);
    setShowReply(!showReply);
    mutate(`/discussion/${post._id}`);
  };

  return (
    <div className="my-2 w-full max-w-3xl flex flex-col bg-blue-100 rounded-xl border-2">
      <div className="px-4 pt-3 m-2 font-bold">{post.user_name}</div>
      <div className="pb-5 px-4 mx-2"> {post.body} </div>

      {post.codes && (
        <div className="pb-5 px-4 mx-2">
          <Link href={`/code/${post.codes?.code_id}`} key={post.codes?.code_id}>
            <a>
              <div className="px-4 py-3 m-2 bg-gray-700 rounded-md text-gray-50">
                {post.codes?.filename}
              </div>
            </a>
          </Link>
        </div>
      )}

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

        {!showReply && (
          <div className="cursor-pointer ml-auto flex" onClick={() => handleReply()}>
            <span className="mx-2 font-semibold items-start">reply</span>
            <Image src="/images/reply.svg" width={20} height={20} alt="reply" />
          </div>
        )}
      </div>

      {showReply && (
        <div className="my-2 ml-4 h-full w-full max-w-3xl">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <textarea
              autoComplete="off"
              {...register('body')}
              className="m-2 p-2 max-w-2xl w-full h-16 border-2 border-gray-400 no-scrollbar rounded-lg"
            />
            <div className="self-end mx-16 px-4">
              <button
                type="submit"
                className="m-2 p-2 border-2 border-gray-400 rounded-lg self-end"
              >
                Post Reply
              </button>
              <button
                onClick={handleReply}
                className="m-2 p-2 border-2 border-gray-400 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Discussion;