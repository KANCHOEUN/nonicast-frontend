import React, { useEffect } from "react";

interface IConfirmModalProps {
  onChange: () => void;
}

export const Modal: React.FC<IConfirmModalProps> = ({ onChange, children }) => {
  const handleClickOutside = (e: MouseEvent) => {
    if (!document.querySelector("#confirm-modal")?.contains(e.target as Node)) {
      onChange();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  return (
    <div className="fixed inset-0 ml-0 z-20 bg-black bg-opacity-50 flex justify-center items-center">
      <div
        id="confirm-modal"
        className="bg-white p-6 rounded-lg shadow-md w-1/2 min-w-max md:w-3/12"
      >
        {children}
      </div>
    </div>
  );
};
