import React, { useContext, useEffect, useState } from 'react';
import firebase from '../utils/firebaseClient';
import { User } from '../../types';
import { getUser } from '../api';

type ContextProps = {
  firebaseUser: firebase.User | null;
  user: User | null;
  navOpen: boolean;
  setNavOpen: any;
};

const AuthContext = React.createContext<ContextProps>({
  firebaseUser: null,
  user: null,
  navOpen: true,
  setNavOpen: null,
});

const useAuthProvider = (): ContextProps => {
  const [firebaseUser, setFirebaseUser] = useState<firebase.User | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [navOpen, setNavOpen] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      setFirebaseUser(user);

      if (!user) {
        setUser(null);
        return;
      }

      try {
        const data = await getUser();
        // console.log('data', data);
        setUser(data);
      } catch (err) {
        console.log(err);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user: user,
    firebaseUser: firebaseUser,
    navOpen,
    setNavOpen,
  };
};

export const AuthProvider: React.FC = (props) => {
  const authContext = useAuthProvider();
  return (
    <AuthContext.Provider value={authContext}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = (): ContextProps => {
  return useContext(AuthContext);
};
