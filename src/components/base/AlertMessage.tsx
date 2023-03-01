import React from "react";

const AlertMessage = ({ message }: { message?: string }) => {
  return (
    message ? (
      <p className="mt-2 text-sm text-red-600 dark:text-red-500">{message}</p>
    ) : null
  );
};

export default AlertMessage;
