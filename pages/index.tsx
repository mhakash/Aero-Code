import Layout from 'components/Layout';
import { getCodes } from 'lib/api';
import Link from 'next/link';
import React, { FC } from 'react';
import useSWR from 'swr';
import { useAuth } from '../lib/hooks/useAuth';

const Home: FC = () => {
  const auth = useAuth();
  const { data } = useSWR(() => (auth.user ? '/codes' : null), getCodes);

  return (
    <Layout
      header={
        <>
          <div>Reviews</div>
          <div>
            <Link href="/upload-review">
              <a>Add Review Request</a>
            </Link>
          </div>
        </>
      }
    >
      <div className="min-h-full ">
        {(data ?? []).map((e) => {
          return (
            <Link href={`/code/${e._id}`} key={e._id}>
              <a>
                <div className="px-4 py-3 m-2 bg-gray-700 rounded-md text-gray-50">
                  {e.name}
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </Layout>
  );
};

export default Home;
