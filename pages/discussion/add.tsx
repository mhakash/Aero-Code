import Layout from 'components/Layout';
import { addDiscussion } from 'lib/api';
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
  const router = useRouter();
  // const { data } = useSWR(
  //   () => (pid && auth.user ? `/codes/${pid}` : null),
  //   () => getCodeById(pid as string),
  // );

  const onSubmit = async (data: { body: string }) => {
    await addDiscussion(data.body);
    router.push('/discussion', '/discussion');
  };

  return (
    <Layout
      header={
        <>
          <div>Add Discussion</div>
        </>
      }
    >
      <div className="my-2 h-full w-full max-w-3xl flex flex-col">
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            autoComplete="off"
            {...register('body')}
            className="m-2 p-2 max-w-2xl w-full h-52 border-2 border-gray-400"
          />
          <button type="submit" className="m-2 p-2 border-2 border-gray-400">
            Post Discussion
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Home;
