import Layout from 'components/Layout';
import Image from 'next/image';
import { getDiscussions } from 'lib/api';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import useSWR from 'swr';
import { useAuth } from '../../lib/hooks/useAuth';

const Home: FC = () => {
  const auth = useAuth();

  const { data } = useSWR(
    () => (auth.user ? `/discussion` : null),
    () => getDiscussions(auth.user?.posts ?? []),
  );

  return (
    <Layout
      header={
        <>
          <div>Discussion</div>
          <div>
            <Link href="/discussion/add">
              <a>Create a New Discussion</a>
            </Link>
          </div>
        </>
      }
    >
      {(data ?? []).map((e) => {
        if (e)
          return (
            <div
              key={e._id}
              className="my-2 ml-10 w-full max-w-3xl flex flex-col bg-blue-100 rounded-xl border-2"
            >
              {/* <img src={e.avatar} className="w-10 h-10 rounded-full m-2" /> */}
              <div className="px-4 pt-3 m-2 font-bold">{e.user_name}</div>
              <div className="pb-5 px-4 mx-2"> {e.body} </div>
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
          );
      })}
    </Layout>
  );
};

export default Home;
