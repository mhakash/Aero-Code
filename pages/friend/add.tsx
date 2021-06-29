import Layout from 'components/Layout';
import { addFriend, searchFriend } from 'lib/api';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
    const res = await searchFriend(data.name);
    setSearchResult(res ?? []);
  };

  const handleAddFriend = async (id: string, name: string) => {
    await addFriend(id, name);
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
          <div key={e._id} className="m-2 flex items-center border-gray-200 border-2">
            <div className='className="w-10 h-10 rounded-full m-2"'>
              <Image src={e.avatar} width={10} height={10} alt={`${e.name}_avatar`} />
            </div>
            <div className=" p-2 flex-1">{e.name}</div>
            <button
              onClick={() => handleAddFriend(e._id, e.name)}
              className="p-2 mr-4 border-2 border-gray-500"
            >
              ADD FRIEND
            </button>
          </div>
        ))}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register('name')}
          className="m-2 p-2 border-2 border-gray-400"
        />
        <button type="submit" className="m-2 p-2 border-2 border-gray-400">
          Search friend
        </button>
      </form>
    </Layout>
  );
};

export default Home;
