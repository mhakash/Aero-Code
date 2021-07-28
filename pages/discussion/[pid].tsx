import Layout from 'components/Layout';
import Discussion from 'components/Discussion';
import { getDiscussionByID } from 'lib/api';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import useSWR from 'swr';
import { useAuth } from '../../lib/hooks/useAuth';
import Image from 'next/image';
import Link from 'next/link';

const DiscussionTree: FC<{ pid: string }> = ({ pid }) => {
  const auth = useAuth();

  const { data } = useSWR(
    () => (pid && auth.user ? `/discussion/${pid}` : null),
    () => getDiscussionByID(pid as string),
  );

  if (data) {
    return (
      <div className="ml-10">
        {/*<Discussion post={data} />*/}
        <Link
                href={
                  data.codes?.code_id ? `/code/${data.codes?.code_id}` : `/discussion/${data._id}`
                }
              >
                <a>
                  <Discussion post={data} hasLink={true} />
                </a>
              </Link>

        {data.replies
          ? data.replies.map((e) => (
              <div key={e}>
                <DiscussionTree pid={e} />
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
          <div>Discussion</div>
        </>
      }
    >
      <div className="h-full">
        <DiscussionTree pid={pid as string} />
      </div>
    </Layout>
  );
};

export default Home;
