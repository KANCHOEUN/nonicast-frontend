import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { ChevronRightIcon } from "@heroicons/react/outline";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { EpisodeItem } from "../../components/EpisodeItem";
import { ReviewItem } from "../../components/ReviewItem";
import { defaultCoverImg, notFoundImg } from "../../constants";
import {
  DeletePodcastMutation,
  DeletePodcastMutationVariables,
} from "../../__generated__/DeletePodcastMutation";
import { GetPodcastQuery } from "../../__generated__/GetPodcastQuery";
import { UserRole } from "../../__generated__/globalTypes";
import { TrashIcon } from "@heroicons/react/solid";
import { GET_HOST_PROFILE_QUERY } from "./Dashboard";
import { GetHostProfileQuery } from "../../__generated__/GetHostProfileQuery";
import { Loading } from "../../components/Loading";

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
          role
        }
        episodes {
          id
          createdAt
          updatedAt
          title
          fileUrl
        }
        reviews {
          creator {
            email
          }
          content
          createdAt
        }
        subscribers {
          id
          email
        }
      }
    }
  }
`;

const DELETE_PODCAST_MUTATION = gql`
  mutation DeletePodcastMutation($id: Float!) {
    deletePodcast(id: $id) {
      ok
      error
    }
  }
`;

export interface IMyPodcastParams {
  id: string;
}

export const MyPodcast: React.FC = () => {
  const [tab, setTab] = useState(true);
  const [url, setUrl] = useState("");
  const [podOpen, setPodOpen] = useState(false);
  const [epiOpen, setEpiOpen] = useState(false);
  const history = useHistory();
  const params = useParams<IMyPodcastParams>();
  const client = useApolloClient();

  const {
    data: getPodcastResult,
    loading,
    error,
  } = useQuery<GetPodcastQuery>(GET_PODCAST_QUERY, {
    variables: {
      id: +params.id,
    },
  });

  const onCompleted = (data: DeletePodcastMutation) => {
    if (data.deletePodcast.ok) {
      // const queryResult = client.readQuery<GetHostProfileQuery>({
      //   query: GET_HOST_PROFILE_QUERY,
      // });
      // const newPodcasts = queryResult?.getProfile.user?.podcasts.filter(
      //   (pod) => pod.id !== +params.id
      // );
      // client.writeFragment({
      //   id: `User:${getPodcastResult?.getPodcast.podcast?.owner.id}`,
      //   fragment: gql`
      //     fragment updateProfile on User {
      //       podcasts {
      //       }
      //     }
      //   `,
      //   data: {
      //     podcasts: newPodcasts,
      //   },
      // });
    }
    history.push("/");
    history.go(0);
  };

  const [deletePodcastMutation] = useMutation<
    DeletePodcastMutation,
    DeletePodcastMutationVariables
  >(DELETE_PODCAST_MUTATION, {
    onCompleted,
  });

  const handleDeleteBtn = () => {
    deletePodcastMutation({
      variables: {
        id: +params.id,
      },
    });
  };

  if (!getPodcastResult || loading || error) return <Loading />;

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
        <ChevronRightIcon className="w-4 mx-2.5 font-normal self-center text-black opacity-30" />
        <span className="font-meidum">{`${getPodcastResult?.getPodcast.podcast?.title}`}</span>
      </div>
      {podOpen && (
        <Modal onChange={() => setPodOpen(false)}>
          <div className="flex flex-col items-center mb-5">
            <TrashIcon className="w-10 text-red-500 mb-1" />
            <h1 className="text-lg font-medium">Are you absolutely sure?</h1>
            <h5 className="text-sm">{`Do you really want to delete ${getPodcastResult?.getPodcast.podcast?.title}?`}</h5>
          </div>
          <div className="w-full px-6 space-x-4 flex justify-end">
            <Button text="Cancel" onClick={() => setPodOpen(false)} />
            <Button text="Delete" onClick={handleDeleteBtn} />
          </div>
        </Modal>
      )}
      <div className="w-full px-5 pb-5  sm:mx-auto sm:space-x-6 flex flex-wrap justify-between sm:flex-nowrap sm:max-w-screen-xl">
        <div className="w-full mt-5">
          <div className="relative bg-white mb-5 rounded-lg shadow">
            <div className="bg-gray-100 opacity-50 h-10 rounded-t-lg border-b border-gray-200" />
            <img
              src={
                getPodcastResult?.getPodcast.podcast?.coverImg ||
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
                {getPodcastResult?.getPodcast.podcast?.title}
              </h1>
              <h5 className="mb-1">
                created :&nbsp;
                {new Date(
                  getPodcastResult?.getPodcast.podcast?.createdAt
                ).toLocaleDateString()}
                &nbsp;&nbsp;
                <span className="text-gray-400 text-opacity-80">|</span>
                &nbsp;&nbsp;updated :&nbsp;
                {new Date(
                  getPodcastResult?.getPodcast.podcast?.updatedAt
                ).toLocaleDateString()}
              </h5>
              <h5 className="mb-1">
                category :&nbsp;{getPodcastResult?.getPodcast.podcast?.category}
              </h5>
              <h5 className="mb-1">
                description :&nbsp;
                {getPodcastResult?.getPodcast.podcast?.description}
              </h5>
              <div className="flex w-full justify-end min-w-max space-x-3">
                {/* Edit Button */}
                <Link
                  to={`/podcast/${getPodcastResult?.getPodcast.podcast?.id}/edit`}
                  className="w-1/5"
                >
                  <Button text="Edit" />
                </Link>
                {/* Delete Button */}
                <span className="w-1/4">
                  <Button text="Delete" onClick={() => setPodOpen(true)} />
                </span>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 w-full">
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
            <div className="mt-2">
              {/* TODO: Subscribers */}
              {/* Reviews */}
              {!tab &&
                getPodcastResult?.getPodcast.podcast?.reviews &&
                getPodcastResult.getPodcast.podcast.reviews.map(
                  ({ creator: { email }, createdAt, content }, idx) => (
                    <ReviewItem
                      key={idx}
                      creator={email}
                      createdAt={createdAt}
                      content={content}
                      clickable={false}
                    />
                  )
                )}
            </div>
          </div>
        </div>
        <div className="w-full mt-5 pl-6 pr-4 py-4">
          {/* Episodes */}
          <div className="flex justify-between">
            <h1 className="text-xl font-semibold self-center">Episodes</h1>
            <Link
              to={`${getPodcastResult?.getPodcast.podcast?.id}/episode/add`}
            >
              <Button text="Add" />
            </Link>
          </div>
          {/* No Episode */}
          {getPodcastResult?.getPodcast.podcast?.episodes.length === 0 && (
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
          {/* Audio Player */}
          <audio
            controls={url === "" ? false : true}
            src={url}
            className="mt-6 w-full"
          ></audio>
          {/* Episode List */}
          {getPodcastResult?.getPodcast.podcast?.episodes && (
            <div className="w-full mt-4">
              {getPodcastResult?.getPodcast.podcast?.episodes.map(
                ({ id, title, fileUrl, createdAt, updatedAt }, idx) => (
                  <EpisodeItem
                    onClick={setUrl}
                    role={
                      getPodcastResult.getPodcast.podcast?.owner.role ||
                      UserRole.Host
                    }
                    key={idx}
                    podcastId={+params.id}
                    episodeId={id}
                    title={title}
                    fileUrl={fileUrl}
                    createdAt={createdAt}
                    updatedAt={updatedAt}
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
