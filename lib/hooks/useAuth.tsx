import React, { useContext, useEffect, useState } from 'react';
import firebase from '../utils/firebase-client';
// import { User } from '../../types';
// import { getUser } from '../api';

type ContextProps = {
  firebaseUser: firebase.User | null;
  // user: User | null;
  // setUser: any;
};

export const AuthContext = React.createContext<ContextProps>({
  firebaseUser: null,
  // user: null,
  // setUser: null,
});

const useAuthProvider = (): ContextProps => {
  const [firebaseUser, setFirebaseUser] = useState<firebase.User | null>(null);
  // const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      setFirebaseUser(user);
      // if (!user) {
      //   setUser(null);
      //   return;
      // }
      // try {
      // const data = await getUser();
      // console.log("data", data);
      // if (data?.IsAdmin) setUser(data);
      // else {
      //   // no admin access
      //   await signout();
      //   setUser(null);
      // }
      // } catch (err) {
      //   console.log(err);
      // }
    });

    return () => unsubscribe();
  }, []);

  return {
    // user: user,
    firebaseUser: firebaseUser,
    // setUser: setUser,
  };
};

export const AuthProvider: React.FC = (props) => {
  const authContext = useAuthProvider();
  return <AuthContext.Provider value={authContext}>{props.children}</AuthContext.Provider>;
};

export const useAuth = (): ContextProps => {
  return useContext(AuthContext);
};
