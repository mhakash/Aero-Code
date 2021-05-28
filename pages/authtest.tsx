import { useAuth } from 'lib/hooks/useAuth';
import { authenticate, signout } from 'lib/utils/firebaseClient';
import { FC, useEffect, useState } from 'react';

const TestPage: FC = () => {
  const [token, setToken] = useState<string>();

  const auth = useAuth();
  useEffect(() => {
    const getToken = async () => {
      const t = await auth.firebaseUser?.getIdToken();
      setToken(t);
    };
    getToken().then();
  }, [auth.firebaseUser]);

  return (
    <div className="p-4">
      {auth.firebaseUser ? (
        <>
          <button className="border-2" onClick={signout}>
            signout
          </button>{' '}
          <br />
          <pre>{token}</pre>
          <pre>{JSON.stringify(auth.firebaseUser, null, 2)}</pre>
        </>
      ) : (
        <>
          <button className="border-2" onClick={authenticate}>
            signin
          </button>{' '}
          <br />
        </>
      )}
    </div>
  );
};

export default TestPage;
