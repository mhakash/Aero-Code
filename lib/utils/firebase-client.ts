import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBlhy2EwkT52R321V1p-IX1y1s_OuB_620',
  authDomain: 'test-e1abe.firebaseapp.com',
  projectId: 'test-e1abe',
  storageBucket: 'test-e1abe.appspot.com',
  messagingSenderId: '873248290129',
  appId: '1:873248290129:web:86cf1eb20ee4123c708f70',
  measurementId: 'G-RNPCQS04MB',
};

const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export const authenticate = async (): Promise<{ success: boolean }> => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebaseApp.auth().languageCode = 'en';
  try {
    await firebaseApp.auth().signInWithPopup(provider);
    return { success: true };
  } catch (error) {
    console.log('error occured cannot sign in');
    return { success: false };
  }
};

export const signout = async (): Promise<{ success: boolean }> => {
  try {
    await firebaseApp.auth().signOut();
    return { success: true };
  } catch (err) {
    console.log(err.message);
    return { success: false };
  }
};

export default firebase;
