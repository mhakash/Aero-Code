import Layout from 'components/Layout';
import { getUser } from 'lib/api';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import useSWR from 'swr';
import { useAuth } from '../../lib/hooks/useAuth';

const Home: FC = () => {
  const auth = useAuth();

  const { data } = useSWR(() => (auth.user ? `/user` : null), getUser);

  return (
    <Layout
      header={
        <>
          <div>Friends</div>
          <div>
            <Link href="/friend/add">
              <a>Add friend</a>
            </Link>
          </div>
        </>
      }
    >
      {data?.friends?.map((e) => (
        <div
          key={e._id}
          className="m-2 p-2 flex items-center bg-gray-700 text-gray-50 border-2 rounded-lg"
        >
          {/* <img src={e.avatar} className="w-10 h-10 rounded-full m-2" /> */}
          <div className=" p-2 flex-1">{e.name}</div>
        </div>
      ))}
    </Layout>
  );
};

export default Home;
