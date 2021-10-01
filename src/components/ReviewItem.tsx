import React from "react";

interface IReviewItemProps {
  creator: string;
  createdAt: Date;
  content: string;
}

export const ReviewItem: React.FC<IReviewItemProps> = ({
  creator,
  createdAt,
  content,
}) => {
  return (
    <div className="w-full pt-1 pb-3 justify-between px-3 border-b border-gray-200">
      <div className="my-2 text-gray-500 font-medium text-opacity-70">
        <div>{creator}</div>
      </div>
      <div className="flex flex-wrap w-full space-y-1 justify-between sm:space-y-0">
        <div className="block">{content}</div>
        <div className="text-gray-500 min-w-max text-opacity-70 flex justify-end w-full sm:max-w-max sm:inline">
          {new Date(createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};
