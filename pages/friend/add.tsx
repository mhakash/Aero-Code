import Layout from 'components/Layout';
import { addFriend, searchFriend } from 'lib/api';
import Link from 'next/link';
import router, { useRouter } from 'next/router';
import React, { FC, useState } from 'react';
import useSWR from 'swr';
import { useAuth } from '../../lib/hooks/useAuth';
import { useForm } from 'react-hook-form';
import { User } from 'types';
import Image from 'next/image';

const Home: FC = () => {
  const auth = useAuth();
  const { register, handleSubmit } = useForm();
  // const { data } = useSWR(
  //   () => (pid && auth.user ? `/codes/${pid}` : null),
  //   () => getCodeById(pid as string),
  // );

  const [searchResult, setSearchResult] = useState<User[]>([]);

  const onSubmit = async (data: { name: string }) => {
    console.log(auth.user?.friends);
    const res = await searchFriend(data.name);
    setSearchResult(res ?? []);
  };

  const handleAddFriend = async (id: string, name: string) => {
    await addFriend(id, name);
    router.push('/friend')
    return null;
  };

  return (
    <Layout
      header={
        <>
          <div>Add Friend</div>
        </>
      }
    >
      {searchResult &&
        searchResult.map((e) => (
          <div key={e._id} className="m-2 flex items-center ">
            <Image
              src={e.avatar}
              width={24}
              height={24}
              alt={`${e.name}_avatar`}
              className="rounded-full"
            />
            <div className=" p-2 flex-1">{e.name}</div>
            {auth.user?.friends?.find((x) => x._id === e._id) ? null : (
              <button
                onClick={() => handleAddFriend(e._id, e.name)}
                className="p-2 mr-4 border-2 border-gray-500 text-sm rounded-md"
              >
                Add Friend
              </button>
            )}
          </div>
        ))}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          autoComplete="off"
          {...register('name')}
          className="m-2 p-2 border-2 rounded-md border-gray-400"
        />
        <button
          type="submit"
          className="m-2 p-2 border-2 rounded-md border-gray-400 hover:border-gray-700 text-sm"
        >
          Search Friend
        </button>
      </form>
    </Layout>
  );
};

export default Home;
