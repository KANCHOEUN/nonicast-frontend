import React from "react";

interface ISubmitButtonProps {
  isValid: boolean;
  loading: boolean;
  text: string;
  onClick?: () => void;
}

export const SubmitButton: React.FC<ISubmitButtonProps> = ({
  isValid,
  loading,
  text,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`w-full mt-6 py-3 font-medium text-white text-base transition duration-500 outline-none rounded-full ${
      isValid && !loading ? "bg-green-400" : "bg-gray-200 pointer-events-none"
    }`}
    disabled={loading ? true : false}
  >
    {loading ? "Loading..." : text}
  </button>
);
