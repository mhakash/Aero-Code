import React from 'react';
import Image from 'next/image';
import { signout } from 'lib/utils/firebaseClient';
import Link from 'next/link';

const HomeLayout: React.FC = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <div className="bg-gray-700 text-gray-200 w-96 flex flex-col items-center flex-shrink-0 max-h-screen">
        <div className="mt-8">
          <Image src="/images/aero-code-full.svg" width={182} height={67} />
        </div>
        <div className="flex-1 overflow-y-scroll no-scrollbar">
          <div>
            <Link href="/">
              <a>Reviews</a>
            </Link>
          </div>
        </div>
        <div className="">
          <div>
            <button onClick={signout} className="p-2 m-2 border-gray-400 border-2">
              Log out
            </button>
          </div>
          bottom
        </div>
      </div>

      <div className="flex flex-col flex-1 max-h-screen">
        <div className=" bg-gray-200 w-full p-4 flex justify-between">
          <div>Reviews</div>
          <div>
            <Link href="/upload-review">
              <a>Add review</a>
            </Link>
          </div>
        </div>

        <div className="px-4 flex-1 bg-gray-50 overflow-y-scroll flex flex-col">
          <div className="flex-1"></div>
          <>{children}</>
        </div>

        <footer className="text-center bg-gray-200">
          <div className="py-4 text-gray-700">AeroCode 2021</div>
        </footer>
      </div>
    </div>
  );
};

export default HomeLayout;
