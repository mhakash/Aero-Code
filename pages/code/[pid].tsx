import Layout from 'components/Layout';
import { getCodeById } from 'lib/api';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import useSWR from 'swr';
import { useAuth } from '../../lib/hooks/useAuth';

const Home: FC = () => {
  const auth = useAuth();
  const router = useRouter();
  const { pid } = router.query;

  const { data } = useSWR(
    () => (pid && auth.user ? `/codes/${pid}` : null),
    () => getCodeById(pid as string),
  );

  return (
    <Layout
      header={
        <>
          <div>{data?.name}</div>
        </>
      }
    >
      {data?.data && (
        <pre>
          {typeof data.data === 'object'
            ? JSON.stringify(data.data, null, 2)
            : data?.data}
        </pre>
      )}
    </Layout>
  );
};

export default Home;
