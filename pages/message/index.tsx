import Layout from 'components/Layout';
import { getMessageFriends } from 'lib/api';

import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import useSWR from 'swr';
import { useAuth } from '../../lib/hooks/useAuth';
import Image from 'next/image';

const Home: FC = () => {
  const auth = useAuth();

  const { data } = useSWR(() => (auth.user ? `/message` : null), getMessageFriends);

  return (
    <Layout
      header={
        <>
          <div>Messages</div>
        </>
      }
    >
      {data?.map((e) => (
        <div
          key={e._id}
          className="m-5 items-center bg-blue-100 border-gray-200 border-2 rounded-xl"
        >
          {/* <img src={e.avatar} className="w-10 h-10 rounded-full m-2" /> */}

          <div className="px-4 py-3 m-2 flex flex-row">
            <div>
              {e.friend_avatar && (
                <Image
                  className="rounded-full mr-5"
                  src={e.friend_avatar}
                  alt="avatar"
                  width={40}
                  height={40}
                />
              )}
            </div>
            <div className="font-bold px-2 pt-2 ">{e.friend_name}{' '}</div>
          </div>
          <div className="pb-5 px-8 py-3">{e?.recentmsg?.text}</div>
          <div className="text-right ">
            <Link href={`/message/${e._id}`} key={e._id}>
              <a>Chat</a>
            </Link>
          </div>
        </div>
      ))}
    </Layout>
  );
};

export default Home;
