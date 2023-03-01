import React from "react";

type Props = { title: string; onCreate?: () => any; onCreateTitle?: string };
const HeadingAdminPage = ({ title, onCreate, onCreateTitle }: Props) => {
  return (
    <div className="heading mb-4">
      <div className="flex gap-4 justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        {typeof onCreate === "function" && (
          <button
            onClick={onCreate}
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {onCreateTitle || 'Add New'}
          </button>
        )}
      </div>
      <div className="h-[1px] w-full bg-stone-200"></div>
    </div>
  );
};

export default HeadingAdminPage;
