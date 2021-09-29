import { ExclamationCircleIcon } from "@heroicons/react/solid";
import React from "react";

interface IFormErrorProps {
  errorMessage: string;
}

export const FormError: React.FC<IFormErrorProps> = ({ errorMessage }) => (
  <span className="self-start mt-1 font-medium text-red-400 block">
    <ExclamationCircleIcon className="h-5 w-5 inline" viewBox="0 0 20 22" />
    {" " + errorMessage}
  </span>
);
