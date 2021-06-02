import Layout from 'components/Layout';
import { getCodeById } from 'lib/api';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import useSWR from 'swr';
import { useAuth } from '../../lib/hooks/useAuth';

const Home: FC = () => {
  const auth = useAuth();

  // const { data } = useSWR(
  //   () => (pid && auth.user ? `/codes/${pid}` : null),
  //   () => getCodeById(pid as string),
  // );

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
      Friends page
    </Layout>
  );
};

export default Home;
