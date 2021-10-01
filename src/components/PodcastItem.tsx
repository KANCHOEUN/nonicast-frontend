import { StarIcon as BlankStarIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";
import React from "react";
import { Link } from "react-router-dom";

interface IPodcastItemProps {
  id: number;
  title: string;
  category: string;
  rating: number;
  coverImg: string;
}

export const PodcastItem: React.FC<IPodcastItemProps> = ({
  id,
  title,
  category,
  rating,
  coverImg,
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
    <div className="my-6 mx-5 bg-white rounded-xl shadow-md overflow-hidden">
      <Link to={`/${id}`}>
        <div className="sm:flex">
          {/* Img */}
          <div className="flex-shrink-0">
            <img
              src={coverImg}
              alt="podcast-item-cover-img"
              className="h-40 w-full sm:w-48"
            />
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
