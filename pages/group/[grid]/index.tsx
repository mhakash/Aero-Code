import Layout from 'components/Layout';
import Discussion from 'components/Discussion';
import Image from 'next/image';
import { getCodes, getGroupDiscussions, getUser } from 'lib/api';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import useSWR from 'swr';
import { useAuth } from '../../../lib/hooks/useAuth';

const Home: FC = () => {
  const auth = useAuth();
  const router = useRouter();
  const { grid } = router.query;
  const { data } = useSWR(
    () => (grid && auth.user ? `/group/${grid}` : null),
    () => getGroupDiscussions(grid as string),
    { refreshInterval: 1000 },
  );

  return (
    <Layout
      header={
        <>
          <div>Discussion</div>
          <div>
            <Link href={`/group/${grid}/add`}>
              <a>Create a New Discussion</a>
            </Link>
          </div>
        </>
      }
    >
      {(data ?? []).map((e) => {
        if (e)
          return (
            <div key={e._id} className="ml-5">
              <Link href={`/discussion/${e._id}`}>
                <a>
                  <Discussion post={e} />
                </a>
              </Link>
            </div>
          );
      })}
    </Layout>
  );
};

export default Home;
