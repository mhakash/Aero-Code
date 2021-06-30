import Layout from 'components/Layout';
import { getDiscussionByID } from 'lib/api';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import useSWR from 'swr';
import { useAuth } from '../../lib/hooks/useAuth';
import { Post } from 'types';
import Image from 'next/image';

const Discussion: FC<{ pid: string }> = ({ pid }) => {
  const auth = useAuth();

  const { data } = useSWR(
    () => (pid && auth.user ? `/discussion/${pid}` : null),
    () => getDiscussionByID(pid as string),
  );

  if (data) {
    return (
      <div className="ml-10">
        <div className="my-2 w-full max-w-3xl flex flex-col bg-blue-100 rounded-xl border-2">
          <div className="px-4 pt-3 m-2 font-bold">{data.user_name}</div>
          <div className="pb-5 px-4 mx-2"> {data?.body} </div>
          <div className="pb-5 px-4 mx-2 flex">
            <div className="mr-2">
              <Image src="/images/like.svg" width={20} height={20} alt="upvote" />
            </div>
            <div className="ml-2">
              <Image
                src="/images/like.svg"
                width={20}
                height={20}
                alt="upvote"
                className="transform rotate-180"
              />
            </div>
          </div>
        </div>
        {data.replies
          ? data.replies.map((e) => (
              <div key={data._id}>
                <Discussion pid={e} />
              </div>
            ))
          : null}
      </div>
    );
  }
  return null;
};

const Home: FC = () => {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <Layout
      header={
        <>
          <div>{Discussion}</div>
        </>
      }
    >
      <div className="h-full">
        <Discussion pid={pid as string} />
      </div>
    </Layout>
  );
};

export default Home;
