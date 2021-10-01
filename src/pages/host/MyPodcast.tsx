import { useQuery } from "@apollo/client";
import { ChevronRightIcon } from "@heroicons/react/outline";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { defaultCoverImg, notFoundImg } from "../../constants";
import { GetPodcastQuery } from "../../__generated__/GetPodcastQuery";

export const GET_PODCAST_QUERY = gql`
  query GetPodcastQuery($id: Float!) {
    getPodcast(id: $id) {
      ok
      error
      podcast {
        id
        createdAt
        updatedAt
        title
        coverImg
        category
        description
        rating
        owner {
          id
        }
        episodes {
          id
          createdAt
          updatedAt
          title
          fileUrl
        }
      }
    }
  }
`;

export interface IMyPodcastParams {
  id: string;
}

export const MyPodcast: React.FC = () => {
  const [tab, setTab] = useState(true);
  const params = useParams<IMyPodcastParams>();
  const { data, loading, error } = useQuery<GetPodcastQuery>(
    GET_PODCAST_QUERY,
    {
      variables: {
        id: +params.id,
      },
    }
  );

  const handleDeleteBtn = () => {
    console.log("delete");
  };

  if (!data || loading || error) {
    <div className="h-screen flex justify-center items-center">
      <span className="font-medium text-xl tracking-wide">Loading...</span>
    </div>;
  }

  return (
    <>
      <Helmet>
        <title>My Podcast | Nonicast</title>
      </Helmet>
      <div className="w-full h-full my-5 px-6 flex sm:mx-auto sm:max-w-screen-xl">
        <Link
          to="/"
          className="font-normal text-black opacity-70 hover:opacity-90"
        >
          Podcasts
        </Link>
        <ChevronRightIcon className="w-4 mx-2.5 font-normal self-center text-blakc opacity-30" />
        <span className="font-meidum">{`${data?.getPodcast.podcast?.title}`}</span>
      </div>
      <div className="w-full px-5 pb-5  sm:mx-auto sm:space-x-6 flex flex-wrap justify-between sm:flex-nowrap sm:max-w-screen-xl">
        <div className="w-full mt-5">
          <div className="relative bg-white mb-5 rounded-lg shadow">
            <div className="bg-gray-100 opacity-50 h-10 rounded-t-lg border-b border-gray-200" />
            <img
              src={
                data?.getPodcast.podcast?.coverImg ||
                defaultCoverImg[
                  Math.ceil(Math.random() * defaultCoverImg.length)
                ]
              }
              alt="cover-img"
              className="w-14 h-14 rounded-full border-2 border-gray-200 mb-2 absolute top-3 left-6 z-10 bg-white"
            />
            <div className="p-6 mt-3">
              {/* Podcast Info */}
              <h1 className="text-lg font-semibold mb-2">
                {data?.getPodcast.podcast?.title}
              </h1>
              <h5 className="mb-1">
                created :&nbsp;
                {new Date(
                  data?.getPodcast.podcast?.createdAt
                ).toLocaleDateString()}
                &nbsp;&nbsp;
                <span className="text-gray-400 text-opacity-80">|</span>
                &nbsp;&nbsp;updated :&nbsp;
                {new Date(
                  data?.getPodcast.podcast?.updatedAt
                ).toLocaleDateString()}
              </h5>
              <h5 className="mb-1">
                category :&nbsp;{data?.getPodcast.podcast?.category}
              </h5>
              <h5 className="mb-1">
                description :&nbsp;{data?.getPodcast.podcast?.description}
              </h5>
              <div className="flex w-full justify-end min-w-max space-x-3">
                {/* Edit Button */}
                <Link
                  to={`/podcast/${data?.getPodcast.podcast?.id}/edit`}
                  className="w-1/5"
                >
                  <Button text="Edit" />
                </Link>
                {/* Delete Button */}
                <span className="w-1/4">
                  <Button text="Delete" onClick={handleDeleteBtn} />
                </span>
              </div>
            </div>
          </div>
          <div className="px-4 py-3">
            {/* Tab: Subscribers / Reviews */}
            <div className="flex w-full justify-start max-w-screen-xl space-x-6">
              <button
                onClick={() => setTab(true)}
                className={`w-28 ${
                  tab
                    ? "font-semibold"
                    : "text-gray-500 hover:text-green-600 hover:text-opacity-60"
                }`}
              >
                Subscribers
              </button>
              <span className="mx-4 text-green-600 text-opacity-70 font-bold">
                |
              </span>
              <button
                onClick={() => setTab(false)}
                className={`w-20 ${
                  !tab
                    ? "font-semibold"
                    : "text-gray-500 hover:text-green-600 hover:text-opacity-60"
                }`}
              >
                Reviews
              </button>
            </div>
          </div>
        </div>
        <div className="w-full mt-5 px-6 py-4">
          {/* Episodes */}
          <div className="flex justify-between">
            <h1 className="text-xl font-semibold self-center">Episodes</h1>
            <Link to="/add-episode">
              <Button text="Add" />
            </Link>
          </div>
          {/* No Episode */}
          {data?.getPodcast.podcast?.episodes.length === 0 && (
            <>
              <h5 className="my-3 text-right text-gray-500">
                Click "Add" Button to create episode. &uarr; &nbsp;
              </h5>
              <div className="w-full h-full flex flex-col justify-center items-center">
                <img
                  src={notFoundImg}
                  alt="nothing"
                  className="block mb-2 w-3/4"
                />
                <span className="font-medium">There's Nothing</span>
              </div>
            </>
          )}
          {/* Episode List */}
        </div>
      </div>
    </>
  );
};
