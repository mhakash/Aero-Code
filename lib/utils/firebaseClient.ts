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

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

type Method = 'google' | 'google.com' | 'github' | 'github.com';

const getProviderByMethod = (method: string) => {
  switch (method) {
    case 'google.com':
    case 'google':
      return new firebase.auth.GoogleAuthProvider();
    case 'github.com':
    case 'github':
      return new firebase.auth.GithubAuthProvider();
    default:
      throw new Error('invalid method');
  }
};

// const linkwithProvider= async (method: string): Promise<{ success: boolean }> => {
//   const provider = getProviderByMethod(method)
//   firebaseApp.auth().currentUser?.linkWithPopup(provider);
// }

export const authenticateWithProvider = async (
  method: Method,
): Promise<{ success: boolean }> => {
  try {
    const provider = getProviderByMethod(method);
    firebaseApp.auth().languageCode = 'en';

    await firebaseApp.auth().signInWithPopup(provider);
    return { success: true };
  } catch (err) {
    console.log('error occured cannot sign in', err);

    if (err.code === 'auth/account-exists-with-different-credential') {
      // const pendingCred: firebase.auth.UserCredential = err.credential;
      const email: string = err.email;
      const methods = await firebaseApp.auth().fetchSignInMethodsForEmail(email);
      console.log('already registered at', methods[0]);
    }
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
