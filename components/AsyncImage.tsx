import React, { useEffect, useState } from 'react';
import firebase from '../lib/utils/firebaseClient';
import axios from 'axios';
import { useAuth } from '../lib/hooks/useAuth';

const getImage = async () => {
  const token = await firebase.auth().currentUser?.getIdToken();

  const res = await axios.get('/api/raw/cat-image-2.jpg', {
    headers: { 'x-firebase-token': token },
    responseType: 'blob',
  });

  const imageURL = URL.createObjectURL(res.data);
  return imageURL;
};

const AsyncImage: React.FC<{ src: string }> = () => {
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState('');
  const auth = useAuth();

  useEffect(() => {
    if (auth.user) {
      getImage().then((e) => {
        setImage(e);
      });
    }
  }, [auth.user]);

  useEffect(() => {
    if (image) {
      setLoading(false);
    }
  }, [image]);

  return (
    <div>
      {loading ? <div className="">Loading Image ....</div> : <img src={image} />}
    </div>
  );
};

export default AsyncImage;
