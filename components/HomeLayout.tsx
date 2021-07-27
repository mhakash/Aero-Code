import React from 'react';
import Image from 'next/image';
import { signout } from 'lib/utils/firebaseClient';
import Link from 'next/link';
import { useAuth } from 'lib/hooks/useAuth';
import { ChevronDownIcon, MenuIcon } from '@heroicons/react/outline';
import { classes } from 'lib/utils/classNames';
import { motion, AnimatePresence } from 'framer-motion';

const HomeLayout: React.FC<{
  header?: JSX.Element;
}> = ({ children, header }) => {
  const auth = useAuth();
  const { navOpen, setNavOpen } = auth;

  return (
    <div className="flex min-h-screen">
      <motion.div
        initial={{ width: '16rem' }}
        animate={{ width: navOpen ? '16rem' : '2.5rem' }}
        transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
        className={classes([
          'bg-gray-700 text-gray-200 flex flex-col pb-4 pt-8 flex-shrink-0 max-h-screen text-sm',
          navOpen ? 'px-8' : 'px-1',
        ])}
      >
        {!navOpen ? (
          <button className=" outline-none" onClick={() => setNavOpen((e: any) => !e)}>
            <MenuIcon className=" w-8 h-8" />
          </button>
        ) : (
          <>
            {' '}
            <div className="flex justify-between">
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
              <button
                className=" outline-none"
                onClick={() => setNavOpen((e: any) => !e)}
              >
                <MenuIcon className=" w-8 h-8" />
              </button>
            </div>
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
              <div className="mb-2">
                <Link href="/group">
                  <a className="flex justify-between p-1 rounded hover:text-gray-100">
                    <span>Groups</span>
                    <ChevronDownIcon className="w-4 h-4" />
                  </a>
                </Link>
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
            </div>{' '}
          </>
        )}
      </motion.div>

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
