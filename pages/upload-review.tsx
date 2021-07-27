import Layout from '../components/Layout';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { uploadCode } from 'lib/api';
import { useAlert } from 'react-alert';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useAuth } from 'lib/hooks/useAuth';
import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/outline';
import FilePicker from 'components/FilePicker';
import Code from 'components/Code';

const UploadReviewPage: React.FC = () => {
  const [file, setFile] = useState<File | null>();
  const auth = useAuth();
  const alert = useAlert();
  const router = useRouter();
  const { handleSubmit, register } = useForm();
  const [reviewers, setReviewers] = useState<string[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    if (file) {
      file.text().then((e) => setText(e));
    }
  }, [file]);

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
    <Layout
      header={<>Add New Review Request</>}
      side={
        <>
          <div className="m-2 flex flex-col w-72 justify-start">
            {file && (
              <button
                className="m-2  border border-gray-700 bg-gray-50 text-gray-700 py-2 px-4 rounded-lg text-sm"
                onClick={() => setFile(null)}
              >
                cancel
              </button>
            )}
            <div className="my-4 w-full border-b border-gray-400 pb-1">Add Reviewers</div>

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

            {file && (
              <button
                className="m-2 mx-auto border-2 bg-gray-700 text-gray-50 py-2 px-4 rounded-lg text-sm"
                onClick={uploadFile}
              >
                Submit Review Request
              </button>
            )}
          </div>
        </>
      }
    >
      <div className="min-h-full flex max-w-full flex-shrink">
        <div className="flex flex-col  m-auto">
          {file && (
            <div className="">
              <Code code={text} ext={file?.name.split('.').pop()} />{' '}
            </div>
          )}
          {!file && <FilePicker file={file} setFile={setFile} />}
        </div>
      </div>
    </Layout>
  );
};

export default UploadReviewPage;
