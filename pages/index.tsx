import Layout from 'components/Layout';
import { signout } from 'lib/utils/firebaseClient';
import Link from 'next/link';
import React, { FC } from 'react';
import { useAuth } from '../lib/hooks/useAuth';

const Home: FC = () => {
  const auth = useAuth();

  return (
    <Layout>
      <div className="m-4 ">
        <div className="text-2xl mb-4">Hello from Home</div>
        <pre>{JSON.stringify(auth.user, null, 2)}</pre>
        <div>
          <Link href="/testupload">
            <a>go to testupload</a>
          </Link>
        </div>
        <button onClick={signout} className="p-2 m-2 border-gray-400 border-2">
          Log out
        </button>
      </div>
    </Layout>
  );
};

export default Home;
