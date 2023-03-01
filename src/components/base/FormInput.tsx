import React from "react";
import AlertMessage from "./AlertMessage";
import FormGroup from "./FormGroup";
import FormLabel from "./FormLabel";

type Props = {
  error?: string;
  label?: string;
  isTextArea?: boolean;
} & (React.HTMLProps<HTMLInputElement> | React.HTMLProps<HTMLTextAreaElement>);

// eslint-disable-next-line react/display-name
const FormInput = React.forwardRef(
  ({ error, label, isTextArea, required, ...props }: Props, ref: any) => {
    return (
      <FormGroup>
        <FormLabel error={error} label={label} required={required} />
        {!isTextArea ? (
          <input
            className={`bg-gray-50 border w-full p-2.5 text-sm rounded-lg ${
              !!error
                ? "border-red-500 text-red-900 placeholder-red-700  focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                : "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            }`}
            {...(props as React.HTMLProps<HTMLInputElement>)}
            ref={ref}
          />
        ) : (
          <textarea
            rows={4}
            className={`bg-gray-50 border w-full p-2.5 text-sm rounded-lg ${
              !!error
                ? "border-red-500 text-red-900 placeholder-red-700 text-sm focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                : "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block"
            }`}
            {...(props as React.HTMLProps<HTMLTextAreaElement>)}
            ref={ref}
          ></textarea>
        )}

        <AlertMessage message={error} />
      </FormGroup>
    );
  }
);

export default FormInput;
