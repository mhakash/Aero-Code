import Layout from 'components/Layout';
import Discussion from 'components/Discussion';
import Image from 'next/image';
import { getCodes, getDiscussions, getUser } from 'lib/api';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import useSWR from 'swr';
import { useAuth } from '../../lib/hooks/useAuth';

const Home: FC = () => {
  const auth = useAuth();
  const { data } = useSWR(
    () => (auth.user ? `/discussion` : null),
    () => getDiscussions()
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
        if (e && !e.is_reply)
          return (
            <div key={e._id} className="ml-5">
              <Link href={e.codes?.code_id ?  `/code/${e.codes?.code_id}` : `/discussion/${e._id}`}>
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
