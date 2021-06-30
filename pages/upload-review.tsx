import Layout from '../components/Layout';
import React, { ChangeEvent, useState } from 'react';
import { uploadCode } from 'lib/api';
import { useAlert } from 'react-alert';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useAuth } from 'lib/hooks/useAuth';
import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/outline';

const UploadReviewPage: React.FC = () => {
  const [file, setFile] = useState<File>();
  const auth = useAuth();
  const alert = useAlert();
  const router = useRouter();
  const { handleSubmit, register } = useForm();
  const [reviewers, setReviewers] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFile(file);
    }
  };

  const uploadFile = async () => {
    if (file) {
      console.log('uploading');
      const filename = encodeURIComponent(file.name);

      const data = await uploadCode(filename, reviewers);

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
        router.push('/', '/');
      } else {
        console.error('Upload failed.');
        alert.show('upload failed', { type: 'error' });
      }
    } else {
      alert.show('no file selected', { type: 'error' });
      console.log('no file selected');
    }
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Layout header={<>Add New Review Request</>}>
      <div className="min-h-full flex flex-row">
        <div className="flex flex-col justify-center m-auto">
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
              upload file
            </div>
          </label>
          {/* <form onSubmit={handleSubmit(onSubmit)}>
          <input
          type="text"
          autoComplete="off"
          placeholder="Add Reviewer"
          {...register('friend')}
          className="text-gray-700 bg-gray-200 py-2 px-4 text-center rounded-lg text-sm mx-auto outline-none"
          />
        </form> */}

          <button
            className="m-2 mx-auto border-2 bg-gray-700 text-gray-50 py-2 px-4 rounded-lg text-sm"
            onClick={uploadFile}
          >
            Submit Review Request
          </button>
        </div>
        <div className="m-2">
          <div className="my-4">Add Reviewers</div>
          {auth.user?.friends?.map((e) => (
            <div key={e._id} className="my-2">
              <div
                className="flex cursor-pointer"
                onClick={() => {
                  reviewers.find((x) => x === e._id)
                    ? setReviewers(reviewers.filter((x) => x !== e._id))
                    : setReviewers([...reviewers, e._id]);
                }}
              >
                {reviewers.find((x) => x === e._id) ? (
                  <MinusCircleIcon className="w-5 h-5 mr-2" />
                ) : (
                  <PlusCircleIcon className="w-5 h-5 mr-2" />
                )}
                <div className="font-semibold text-sm text-gray-700">{e.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default UploadReviewPage;
