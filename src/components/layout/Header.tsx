import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <div>
      <div className="bg-gray-800 w-full">
        <div className="max-w-6xl w-full grid grid-cols-2 py-2 px-4 m-auto">
          <div className="text-white font-light text-sm">
            {new Date().toDateString()}
          </div>
          <div className="flex justify-end gap-2">
            <span className="grid place-content-center w-6 h-6 font-bold bg-white text-black rounded-full">
              F
            </span>
            <span className="grid place-content-center w-6 h-6 font-bold bg-white text-black rounded-full">
              T
            </span>
          </div>
        </div>
      </div>
      <div className="bg-white flex w-full h-32 justify-center items-center">
        <Link href={'/'} className="text-black text-3xl">
          <span className="text-5xl font-bold">HONES</span>{' '}
          <span className="font-medium">Blogs</span>
        </Link>
      </div>
      <div className="bg-gray-300 h-[1px] w-full"></div>
    </div>
  );
};

export default Header;
