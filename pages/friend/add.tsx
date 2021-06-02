import Layout from 'components/Layout';
import { getCodeById } from 'lib/api';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import useSWR from 'swr';
import { useAuth } from '../../lib/hooks/useAuth';
import { useForm } from 'react-hook-form';

const Home: FC = () => {
  const auth = useAuth();
  const { register, handleSubmit } = useForm();
  // const { data } = useSWR(
  //   () => (pid && auth.user ? `/codes/${pid}` : null),
  //   () => getCodeById(pid as string),
  // );

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Layout
      header={
        <>
          <div>Add Friend</div>
        </>
      }
    >
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