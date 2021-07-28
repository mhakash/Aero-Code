import Layout from 'components/Layout';
import Discussion from 'components/Discussion';
import Image from 'next/image';
import { getGroupDiscussions, addGroupMember } from 'lib/api';
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
  const handleAddMember = async (id: string, name: string) => {
    await addGroupMember(id, name, grid as string);
    return null;
  };

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
      side={
        <>
          <h1 className="border-gray-400 border-b pb-2">Group Members</h1>
          {data?.group?.members?.map((e) => (
            <div key={e._id} className="my-2">
              <div className="flex cursor-pointer">
                <div className="font-light text-sm text-gray-700">{e.name}</div>
              </div>
            </div>
          ))}
          <h1 className="mt-4 border-gray-400 border-b pb-2">Add Members</h1>
          {data?.friends?.map((e) => (
            <div key={e._id} className="my-2">
              <div className="flex cursor-pointer items-center justify-between">
                <div className="font-light text-sm text-gray-700">{e.name}</div>

                <button
                  onClick={() => handleAddMember(e._id, e.name)}
                  className="px-2 py-1.5 text-sm rounded-md"
                >
                  Add to Group
                </button>
              </div>
            </div>
          ))}
        </>
      }
    >
      {(data?.posts ?? []).map((e) => {
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
