import { useQuery } from "@apollo/client";
import { CursorClickIcon } from "@heroicons/react/solid";
import gql from "graphql-tag";
import React from "react";
import { Link } from "react-router-dom";
import { PodcastItem } from "../../components/PodcastItem";
import { bannerImgs } from "../../constants";
import {
  GetPodcastsQuery,
  GetPodcastsQuery_getPodcasts_podcasts,
} from "../../__generated__/GetPodcastsQuery";

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
  const { data, loading, error } =
    useQuery<GetPodcastsQuery>(GET_PODCASTS_QUERY);
  let randomElem: GetPodcastsQuery_getPodcasts_podcasts | null;
  const bannerImg = bannerImgs[Math.floor(Math.random() * bannerImgs.length)];

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
                to={`/${randomElem?.id}`}
                className="flex font-semibold hover:text-green-400 mt-2 sm:mt-0"
              >
                " {randomElem?.title} "&nbsp;&nbsp;
                <CursorClickIcon className="w-8 h-7 text-black" />
              </Link>
            </span>
          </div>
        </div>
      </div>

      {/* TODO: Category Filter */}

      <div className="mt-7 max-w-screen-xl mx-auto">
        {data &&
          data.getPodcasts?.podcasts?.map(
            ({ id, title, category, coverImg, rating }, idx) => (
              <PodcastItem
                key={idx}
                id={id}
                title={title}
                category={category}
                coverImg={coverImg}
                rating={rating ? rating : 0}
              />
            )
          )}
      </div>
    </>
  );
};
