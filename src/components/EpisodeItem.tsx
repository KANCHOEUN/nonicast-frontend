import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import React from "react";
import { Link } from "react-router-dom";

interface IEpisodeItemProps {
  podcastId: number;
  episodeId: number;
  title: string;
  fileUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export const EpisodeItem: React.FC<IEpisodeItemProps> = ({
  podcastId,
  episodeId,
  title,
  fileUrl,
  createdAt,
  updatedAt,
}) => {
  const deleteHandler = () => console.log("delete");
  return (
    <div className="w-full pt-1 pb-3 cursor-pointer justify-between px-3 border-b border-gray-200 hover:bg-gray-100 hover:bg-opacity-50 transition duration-500">
      <div className="my-2">
        <span className="text-gray-500 text-opacity-70">
          {new Date(createdAt).toLocaleDateString()}
        </span>
        &nbsp;&nbsp;
        <span className="text-gray-300 font-semibold text-center">|</span>
        &nbsp;&nbsp;
        <span className="text-gray-500 text-opacity-70">
          {new Date(updatedAt).toLocaleDateString()}
        </span>
      </div>
      <div className="flex justify-between">
        <span>{title}</span>&nbsp;&nbsp;
        <div className="flex space-x-3">
          <Link to={`/podcast/${podcastId}/episode/${episodeId}/edit`}>
            <PencilAltIcon className="w-6 rounded-full hover:bg-gray-300 hover:bg-opacity-60" />
          </Link>
          <TrashIcon
            onClick={deleteHandler}
            className="w-6 rounded-full hover:bg-gray-300 hover:bg-opacity-60"
          />
        </div>
      </div>
    </div>
  );
};
