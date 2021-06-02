import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from 'lib/hooks/useAuth';
import HomeLayout from './HomeLayout';

const Layout: React.FC<{
  header?: JSX.Element;
}> = ({ children, header }) => {
  const auth = useAuth();

  return auth.user ? (
    <HomeLayout header={header}>{children}</HomeLayout>
  ) : (
    <div>
      <div>
        <div className="min-h-screen flex">
          <div className="bg-gray-200 w-1/3 flex flex-col items-center">
            <div className="mt-20">
              <Image src="/images/aero-code.svg" width={135} height={118} />
            </div>

            <div className="flex-1 flex justify-center flex-col">
              <div>You are not signed in</div>
              <Link href="/signin">
                <a className=" pb-2 m-2 mb-40 border-b-2 text-center border-gray-400 hover:border-gray-700  ">
                  Sign in
                </a>
              </Link>
            </div>
          </div>

          <div className="bg-gray-800 flex-1">
            <div className="p-4 text-center flex flex-col justify-center min-h-full">
              <Image src="/images/aero-code-text.svg" width={472} height={405} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
