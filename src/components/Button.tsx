import React from "react";

interface IButtonProps {
  text: string;
  onClick?: () => void;
}

export const Button: React.FC<IButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full px-4 py-2 rounded-full shadow text-base tracking-tight font-medium hover:bg-gray-100 transition duration-500"
    >
      {text}
    </button>
  );
};
