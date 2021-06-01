import { uploadCode } from 'lib/api';
import { ChangeEvent } from 'react';
import Layout from '../components/Layout';

export default function Upload(): JSX.Element {
  const uploadPhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
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
      } else {
        console.error('Upload failed.');
      }
    }
  };

  return (
    <Layout>
      <p className="m-4">Upload a .png or .jpg image (max 10MB).</p>
      <input
        className="p-4 m-4 border-2"
        onChange={uploadPhoto}
        type="file"
        // accept="image/png, image/jpeg"
      />
    </Layout>
  );
}
