import Layout from 'components/Layout';
import { addGroupDiscussion, uploadCode } from 'lib/api';
import { useAlert } from 'react-alert';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC,ChangeEvent, useState } from 'react';

import useSWR from 'swr';
import { useAuth } from '../../../lib/hooks/useAuth';
import { useForm } from 'react-hook-form';
import { User } from 'types';
import Image from 'next/image';

const Home: FC = () =>  {

  const auth = useAuth();
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const { grid } = router.query;
  console.log("group id: "+grid);
  
  const [file, setFile] = useState<File>();
  const alert = useAlert();
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFile(file);
    }
  };

  // const { data } = useSWR(
  //   () => (pid && auth.user ? `/codes/${pid}` : null),
  //   () => getCodeById(pid as string),
  // );
  const uploadFile = async (postText: string) => {
      console.log('uploading');
      let filename = "";
      if (file) {
        filename = encodeURIComponent(file.name);
      }
      const data = await addGroupDiscussion(filename, postText, grid as string);
      if (file) {
        const { url, fields } = data;

        const formData = new FormData();

        Object.entries({ ...fields, file }).forEach(([key, value]) => {
          formData.append(key, value as Blob);
        });

        const upload = await fetch(url, {
          method: 'POST',
          body: formData,
        });

        if (upload.ok) {
          console.log('Uploaded successfully!');
          alert.show('upload successful', { type: 'success' });
        } else {
          console.error('Upload failed.');
          alert.show('upload failed', { type: 'error' });
        }
      }
      router.push(`/group/${grid}`);
      
  };

  const onSubmit = async (data: { body: string }) => {
    uploadFile(data.body);
    //router.push('/discussion', '/discussion');
  };

  return (
    <Layout
    header={
      <>
        <div>Add Discussion</div>
      </>
    }>

    <div className="my-2 h-full w-full max-w-3xl flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          autoComplete="off"
          {...register('body')}
          className="m-2 p-2 max-w-2xl w-full h-52 border-2 border-gray-400"
        />

        {file && <div className="text-center">{file.name}</div>}
          <label htmlFor="file-upload" className="flex mb-4">
            <input
              id="file-upload"
              name="file-upload"
              className=" hidden"
              onChange={handleChange}
              type="file"
              multiple={false}
            />
            <div className="m-2 mx-auto bg-gray-700 text-gray-50 py-2 px-4 rounded-lg text-sm cursor-pointer inline-block">
              Add Code
            </div>
          </label>
          
        <button type="submit" className="m-2 p-2 border-2 border-gray-400">
          Post Discussion
        </button>
      </form>
    </div>
  </Layout> 
  );
  
};

export default Home;
