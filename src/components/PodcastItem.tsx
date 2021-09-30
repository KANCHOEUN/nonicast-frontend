import { StarIcon as BlankStarIcon } from "@heroicons/react/outline";
import { PhotographIcon, StarIcon } from "@heroicons/react/solid";
import React from "react";
import { Link } from "react-router-dom";

interface IPodcastItemProps {
  id: number;
  title: string;
  category: string;
  rating: number;
}

export const PodcastItem: React.FC<IPodcastItemProps> = ({
  id,
  title,
  category,
  rating,
}) => {
  const stars = [];

  for (let i = 0; i < Math.ceil(rating); i++) {
    stars.push(<StarIcon key={`y-${i}`} className="w-5 text-yellow-400" />);
  }
  for (let i = 0; i < 5 - Math.ceil(rating); i++) {
    stars.push(
      <BlankStarIcon key={`b-${i}`} className="w-5 text-yellow-400" />
    );
  }

  return (
    <div className="my-6 mx-10 bg-white rounded-xl shadow-md overflow-hidden">
      <Link to={`/${id}`}>
        <div className="sm:flex">
          {/* Img */}
          <div className="flex-shrink-0">
            <div className="flex justify-center items-center h-40 w-full sm:w-48 bg-green-400">
              <PhotographIcon className="w-10 text-white" />
              <span className="text-white text-xl font-bold">+</span>
            </div>
          </div>
          {/* Contents */}
          <div className="p-6 w-full">
            <div className="italic uppercase tracking-wide text-sm text-green-600 font-semibold">
              {category}
            </div>
            <p className="truncate w-10/12 mt-1 mb-10 text-lg overflow-ellipsis leading-tight font-medium text-black">
              {title}
            </p>
            <span className="flex">{stars}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};
