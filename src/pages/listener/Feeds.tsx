import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
} from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { Loading } from "../../components/Loading";
import {
  GetFeedsQuery,
  GetFeedsQuery_me_subscriptions_episodes,
} from "../../__generated__/GetFeedsQuery";
import { Link } from "react-router-dom";

export const GET_FEEDS_QUERY = gql`
  query GetFeedsQuery {
    me {
      id
      email
      role
      subscriptions {
        id
        title
        category
        coverImg
        episodes {
          id
          title
          updatedAt
          fileUrl
        }
      }
    }
  }
`;

interface IFeed extends GetFeedsQuery_me_subscriptions_episodes {
  podId: number;
  podTitle: string;
  podCoverImg: string;
}

export const Feeds: React.FC = () => {
  const [feed, setFeed] = useState<IFeed[]>([]);
  const [url, setUrl] = useState("");
  const { data, loading, error } = useQuery<GetFeedsQuery>(GET_FEEDS_QUERY);

  useEffect(() => {
    let episodes: IFeed[] = [];
    if (data) {
      data.me.subscriptions.forEach((sub) =>
        sub.episodes.forEach((epi) => {
          const newFeed = Object.assign(
            {
              podId: sub.id,
              podTitle: sub.title,
              podCoverImg: sub.coverImg,
            },
            epi
          );
          episodes.push(newFeed);
        })
      );
    }
    const sortEpisodes = episodes.sort((a, b) => b.id - a.id);
    setFeed([...sortEpisodes]);
  }, [data]);

  if (!data || loading || error) return <Loading />;

  return (
    <div className="w-full h-full pb-5 px-6 space-y-5 sm:mx-auto sm:max-w-screen-xl ">
      {/* Subscriptions */}
      <div className="p-4 border-b border-gray-200">
        <span className="flex justify-between">
          <h1 className="text-lg font-semibold">Subscriptions</h1>
          {/* Pagination */}
          <div className="flex space-x-2">
            <div className="overflow-hidden w-7 h-7 rounded-full shadow hover:bg-gray-100 transition duration-500">
              <ChevronLeftIcon className="w-7 h-7 cursor-pointer text-gray-300" />
            </div>
            <div className="overflow-hidden w-7 h-7 rounded-full shadow hover:bg-gray-100 transition duration-500">
              <ChevronRightIcon className="w-7 h-7 cursor-pointer" />
            </div>
          </div>
        </span>
        {/* Subscriptions List */}
        <div className="flex flex-wrap pt-3 pb-2">
          {data.me.subscriptions.map(
            ({ id, title, category, coverImg }, idx) => (
              <Link
                to={`/podcast/${id}`}
                key={idx}
                className="flex space-x-3 px-3 py-3 rounded-lg shadow items-center flex-grow flex-shrink"
              >
                <div
                  style={{ backgroundImage: `url(${coverImg})` }}
                  className="w-10 h-10 rounded-full bg-cover"
                />
                <div className="flex flex-col min-w-max">
                  <span className="text-gray-500">[{category}]</span>
                  <span className="truncate sm:w-full">{title}</span>
                </div>
              </Link>
            )
          )}
        </div>
      </div>
      {/* Feeds */}
      <div className="px-4 pb-4">
        <h1 className="text-lg font-semibold">Feeds</h1>
        <audio src={url} controls className="w-full my-5"></audio>
        {feed.map(
          (
            {
              podId,
              podTitle,
              podCoverImg,
              id: epiId,
              title: epiTitle,
              updatedAt: epiUpdatedAt,
              fileUrl,
            },
            idx
          ) => {
            const now = new Date();
            const updated = new Date(epiUpdatedAt);
            let time, text;
            if (
              now.getFullYear() === updated.getFullYear() &&
              now.getMonth() === updated.getMonth() &&
              now.getDate() === updated.getDate()
            ) {
              if (now.getHours() - updated.getHours() > 0) {
                time = now.getHours() - updated.getHours();
                text = "hours ago";
              } else {
                time = now.getMinutes() - updated.getMinutes();
                text = "minutes ago";
              }
            } else {
              if (now.getFullYear() === updated.getFullYear()) {
                if (now.getMonth() === updated.getMonth()) {
                  time = now.getDate() - updated.getDate();
                  text = "days ago";
                } else {
                  time = now.getMonth() - updated.getMonth();
                  text = "months ago";
                }
              } else {
                time = now.getFullYear() - updated.getFullYear();
                text = "years ago";
              }
            }

            return (
              <div key={idx} className="flex py-3 border-b border-gray-200">
                <PlayIcon
                  className="w-8 h-8 text-black min-w-max px-3 self-center cursor-pointer"
                  onClick={() => setUrl(fileUrl)}
                />
                <div className="w-full flex flex-col">
                  <Link to={`/podcast/${podId}`}>
                    [&nbsp;
                    <h1 className="text-gray-500 hover:underline inline">
                      {podTitle}
                    </h1>
                    &nbsp;]
                  </Link>
                  <div className="w-full flex justify-between">
                    <span className="truncate">{epiTitle}</span>
                    <span className="text-gray-500 pr-3">
                      {time + " " + text}
                    </span>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};
