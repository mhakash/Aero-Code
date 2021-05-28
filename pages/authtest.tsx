import { useAuth } from 'lib/hooks/useAuth';
import { authenticate, signout } from 'lib/utils/firebase-client';
import { FC } from 'react';

const TestPage: FC = () => {
  const auth = useAuth();
  return (
    <div className="p-4">
      {auth.firebaseUser ? (
        <>
          <button className="border-2" onClick={signout}>
            signout
          </button>{' '}
          <br />
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
