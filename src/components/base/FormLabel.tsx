import React from "react";

type Props = {
  error?: string;
  label?: string;
  required?: boolean;
};

const FormLabel = ({ error, label, required }: Props) => {
  return (
    <label
      className={`block mb-2 text-sm font-medium ${
        !!error ? "text-red-700 dark:text-red-500" : "text-gray-900"
      }`}
    >
      {label}
      {required && <span className="text-red-600">{"(*)"}</span>}
    </label>
  );
};

export default FormLabel;
