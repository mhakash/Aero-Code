import Layout from '../components/Layout';
import React, { ChangeEvent, useState } from 'react';
import { uploadCode } from 'lib/api';
import { useAlert } from 'react-alert';
import { useRouter } from 'next/router';

const UploadReviewPage: React.FC = () => {
  const [file, setFile] = useState<File>();
  const alert = useAlert();
  const router = useRouter();

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

      const data = await uploadCode(filename);

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

  return (
    <Layout header={<>Upload Code</>}>
      <div>
        <input
          className="p-2 m-2 border-2"
          onChange={handleChange}
          type="file"
          multiple={false}
        />
        <button className="p-2 m-2 border-2 border-gray-200" onClick={uploadFile}>
          Upload
        </button>
      </div>
    </Layout>
  );
};

export default UploadReviewPage;
