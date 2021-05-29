import { useAuth } from 'lib/hooks/useAuth';
import { authenticateWithProvider, signout } from 'lib/utils/firebaseClient';
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
          <pre>{JSON.stringify(auth.user, null, 2)}</pre>
        </>
      ) : (
        <>
          <button
            className="border-2 m-4 p-2"
            onClick={() => authenticateWithProvider('google')}
          >
            signin with google
          </button>
          <br />
          <button
            className="border-2 m-4 p-2"
            onClick={() => authenticateWithProvider('github')}
          >
            signin with github
          </button>
        </>
      )}
    </div>
  );
};

export default TestPage;
