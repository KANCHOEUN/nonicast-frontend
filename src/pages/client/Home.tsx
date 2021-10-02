import { useQuery } from "@apollo/client";
import { CursorClickIcon } from "@heroicons/react/solid";
import { RefreshIcon } from "@heroicons/react/outline";
import gql from "graphql-tag";
import React, { MouseEvent, useState } from "react";
import { Link } from "react-router-dom";
import { PodcastItem } from "../../components/PodcastItem";
import { bannerImgs } from "../../constants";
import {
  GetPodcastsQuery,
  GetPodcastsQuery_getPodcasts_podcasts,
} from "../../__generated__/GetPodcastsQuery";
import { PodcastCategory } from "../../__generated__/globalTypes";

const GET_PODCASTS_QUERY = gql`
  query GetPodcastsQuery {
    getPodcasts {
      ok
      error
      podcasts {
        id
        title
        category
        rating
        coverImg
      }
    }
  }
`;

export const Home: React.FC = () => {
  const [select, setSelect] = useState("");
  const { data, loading, error } =
    useQuery<GetPodcastsQuery>(GET_PODCASTS_QUERY);
  let randomElem: GetPodcastsQuery_getPodcasts_podcasts | null;
  const bannerImg = bannerImgs[Math.floor(Math.random() * bannerImgs.length)];

  const handleClickCategory = (e: MouseEvent<HTMLDivElement>) => {
    setSelect((e.target as HTMLElement).innerText);
  };

  if (!data || loading || error) {
    <div className="h-screen flex justify-center items-center">
      <span className="font-medium text-xl tracking-wide">Loading...</span>
    </div>;
  }

  randomElem = data?.getPodcasts.podcasts
    ? data.getPodcasts.podcasts[
        Math.floor(Math.random() * data.getPodcasts.podcasts.length)
      ]
    : null;

  return (
    <>
      <div className="block relative w-full h-60 bg-white mb-3 max-w-screen-xl mx-auto border border-l-0 border-r-0 border-t-0 sm:h-80">
        <div className="hidden bg-white h-full relative z-0 justify-end sm:flex">
          <img src={bannerImg} className="h-full" alt="banner-right" />
        </div>
        <div className="absolute top-1/2 left-10 transform -translate-y-1/2 z-10">
          <span className="text-black text-4xl font-semibold">
            Today's Podcast
          </span>
          <div className="mt-6">
            <span className="text-black text-xl flex flex-col sm:flex-row">
              Let's go to listen&nbsp;
              <Link
                to={`/podcast/${randomElem?.id}`}
                className="flex font-semibold hover:text-green-400 mt-2 sm:mt-0"
              >
                " {randomElem?.title} "&nbsp;&nbsp;
                <CursorClickIcon className="w-8 h-7 text-black" />
              </Link>
            </span>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="px-6 w-full max-w-screen-sm sm:max-w-screen-xl sm:mx-auto flex justify-content items-center">
        <div className="flex flex-wrap rounded-full">
          {Object.values(PodcastCategory).map((category, idx) => (
            <div
              key={idx}
              data-category={category}
              className={`max-x-max rounded-full shadow cursor-pointer px-3 py-2 mr-2 mb-2 hover:bg-gray-100 transition duration-500 ${
                category === select
                  ? "text-white bg-yellow-400 hover:bg-yellow-400"
                  : ""
              }`}
              onClick={handleClickCategory}
            >
              {category}
            </div>
          ))}
          <RefreshIcon
            className="w-6 cursor-pointer text-black text-opacity-30 hover:text-opacity-50 transition duration-500"
            onClick={() => setSelect("")}
          />
        </div>
      </div>

      <div className="mt-7 max-w-screen-xl mx-auto">
        {data &&
          data.getPodcasts?.podcasts
            ?.filter((podcast) => podcast.category.includes(select))
            .map(({ id, title, category, coverImg, rating }, idx) => (
              <PodcastItem
                key={idx}
                id={id}
                title={title}
                category={category}
                coverImg={coverImg}
                rating={rating ? rating : 0}
              />
            ))}
      </div>
    </>
  );
};
