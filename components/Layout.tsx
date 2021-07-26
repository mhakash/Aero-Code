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
              <Image
                src="/images/aero-code.svg"
                width={135}
                height={118}
                alt="aero-code-logo"
              />
            </div>

            <div className="flex-1 flex justify-center flex-col">
              <Link href="/signin">
                <a className=" px-4 py-2 m-2 mb-40 rounded-md text-center bg-green-700 text-gray-50 border hover:bg-green-800  ">
                  Sign in
                </a>
              </Link>
            </div>
          </div>

          <div className="bg-gray-800 flex-1">
            <div className="p-4 text-center flex flex-col justify-center min-h-full">
              <Image
                src="/images/aero-code-text.svg"
                width={472}
                height={405}
                alt="aero-code-text"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
