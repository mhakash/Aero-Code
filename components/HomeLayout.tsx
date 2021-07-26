import React from 'react';
import Image from 'next/image';
import { signout } from 'lib/utils/firebaseClient';
import Link from 'next/link';
import { useAuth } from 'lib/hooks/useAuth';
import { ChevronDownIcon } from '@heroicons/react/outline';

const HomeLayout: React.FC<{
  header?: JSX.Element;
}> = ({ children, header }) => {
  const auth = useAuth();

  return (
    <div className="flex min-h-screen">
      <div className="bg-gray-700 text-gray-200 w-64 flex flex-col px-8 py-4 pt-8 flex-shrink-0 max-h-screen text-sm">
        <Link href="/">
          <a>
            <div className="w-32">
              <Image
                src="/images/aero-code-full.svg"
                width={182}
                height={67}
                alt="aero-code-full"
              />
            </div>
          </a>
        </Link>

        <div className="flex-1 mt-8 overflow-y-scroll no-scrollbar flex flex-col">
          <div className="mb-2">
            <Link href="/">
              <a className="flex justify-between p-1 rounded hover:text-gray-100">
                <span>Reviews</span>
                <ChevronDownIcon className="w-4 h-4" />
              </a>
            </Link>
          </div>

          <div className="mb-2">
            <Link href="/friend">
              <a className="flex justify-between p-1 rounded hover:text-gray-100">
                <span>Friends</span>
                <ChevronDownIcon className="w-4 h-4" />
              </a>
            </Link>
          </div>

          <div className="mb-2">
            <Link href="/message">
              <a className="flex justify-between p-1 rounded hover:text-gray-100">
                <span>Messages</span>
                <ChevronDownIcon className="w-4 h-4" />
              </a>
            </Link>
          </div>
          <div className="mb-2">
            <Link href="/discussion">
              <a className="flex justify-between p-1 rounded hover:text-gray-100">
                <span>Discussion</span>
                <ChevronDownIcon className="w-4 h-4" />
              </a>
            </Link>
          </div>
        <div>
          <div className="mb-2">
            <Link href="/group">
              <a className="flex justify-between p-1 rounded hover:text-gray-100">
                <span>Groups</span>
                <ChevronDownIcon className="w-4 h-4" />
              </a>
            </Link>
          </div>
        </div>
        </div>
        <div className="mb-12">
          <div className="flex items-center">
            <div className="">
              <div className="rounded-full overflow-hidden mr-5">
                {auth.user?.avatar && (
                  <Image src={auth.user.avatar} alt="avatar" width={40} height={40} />
                )}
              </div>
            </div>
            <div className="text-xs">
              <div className="mb-1.5">profile</div>
              <button onClick={signout} className="">
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
      

      <div className="flex flex-col flex-1 max-h-screen">
        <div className=" bg-gray-200 w-full p-4 flex justify-between">
          {header && header}
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
