import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Main = ({ children }: Props) => {
  return (
    <main className="w-full min-h-[calc(100vh-300px)]">
      <div className='max-w-6xl m-auto my-10 px-4'>{children}</div>
    </main>
  );
};

export default Main;
