import React, { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuth } from 'lib/hooks/useAuth';
import { authenticateWithProvider } from 'lib/utils/firebaseClient';

const SignInPage: React.FC = () => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth.user) {
      router.push('/');
    }
  }, [auth.user, router]);

  return (
    <div className="min-h-screen flex">
      <div className="bg-gray-200 w-1/3 flex flex-col items-center">
        <div className="mt-20">
          <Image src="/images/aero-code.svg" width={135} height={118} />
        </div>

        <div className="flex-1 flex justify-center flex-col">
          <button
            onClick={() => authenticateWithProvider('google')}
            className="p-4 m-2 border-2 border-gray-400 hover:border-gray-700 rounded-lg flex items-center"
          >
            <div className="h-6 w-6 mr-4">
              <Image src="/images/google.svg" width={512} height={512} />
            </div>
            <span>sign in with google</span>
          </button>
          <button
            onClick={() => authenticateWithProvider('github')}
            className="p-4 m-2 border-2 border-gray-400 hover:border-gray-700 rounded-lg mb-60 flex items-center"
          >
            <div className="h-6 w-6 mr-4">
              <Image src="/images/github.svg" width={512} height={512} />
            </div>
            <span>sign in with github</span>
          </button>
        </div>
      </div>

      <div className="bg-gray-800 flex-1">
        <div className="p-4 text-center flex flex-col justify-center min-h-full">
          <Image src="/images/aero-code-text.svg" width={472} height={405} />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
