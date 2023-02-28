import React from 'react';

const Footer = () => {
  return (
    <div className="bg-gray-800 w-full">
      <div className="max-w-6xl w-full grid grid-cols-2 py-20 px-4 m-auto">
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
  );
};

export default Footer;
