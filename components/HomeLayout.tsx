import React from 'react';
import Image from 'next/image';
import { signout } from 'lib/utils/firebaseClient';
import Link from 'next/link';
import { useAuth } from 'lib/hooks/useAuth';

const HomeLayout: React.FC<{
  header?: JSX.Element;
}> = ({ children, header }) => {
  const auth = useAuth();

  return (
    <div className="flex min-h-screen">
      <div className="bg-gray-700 text-gray-200 w-96 flex flex-col items-center flex-shrink-0 max-h-screen">
        <div className="mt-8">
          <Image
            src="/images/aero-code-full.svg"
            width={182}
            height={67}
            alt="aero-code-full"
          />
        </div>
        <div className="flex-1 overflow-y-scroll no-scrollbar flex flex-col">
          <div className="mt-4 m-2">
            <Link href="/">
              <a>Reviews</a>
            </Link>
          </div>
          <div className="m-2">
            <Link href="/friend">
              <a>Friends</a>
            </Link>
          </div>
          <div className="m-2">
            <Link href="/message/60d8d790983c82001d51fda0">
              <a>Messages</a>
            </Link>
          </div>
        </div>
        <div className="">
          <div className="mb-12 flex items-center">
            <div className="mr-8">
              <div className="rounded-full">
                {auth.user?.avatar && (
                  <Image src={auth.user.avatar} alt="avatar" width={16} height={16} />
                )}
              </div>
            </div>
            <div>
              <div className=" m-2">profile</div>
              <button onClick={signout} className="m-2 ">
                Log out
              </button>
            </div>
          </div>
          <div className="mr-8">
          <h3 >{auth.user?.name}  </h3>
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
