import React from "react";
type Props = {
  title: string;
  selected?: boolean;
  className?: string;
  onClick?: () => any;
};
const Badge = ({ title, selected, className, onClick }: Props) => {
  return (
    <span
      onClick={onClick}
      className={`${
        className ? className : ""
      } text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ${
        selected
          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
          : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
      } `}
    >
      {title}
    </span>
  );
};

export default Badge;
