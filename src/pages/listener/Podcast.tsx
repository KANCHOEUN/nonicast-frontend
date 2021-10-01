import { useMutation, useQuery } from "@apollo/client";
import { ChevronRightIcon } from "@heroicons/react/solid";
import gql from "graphql-tag";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams, useHistory } from "react-router-dom";
import { Button } from "../../components/Button";
import { EpisodeItem } from "../../components/EpisodeItem";
import { SubmitButton } from "../../components/SubmitButton";
import { defaultCoverImg, notFoundImg } from "../../constants";
import { useMe } from "../../hooks/useMe";
import {
  CreateReviewMutation,
  CreateReviewMutationVariables,
} from "../../__generated__/CreateReviewMutation";
import { GetPodcastQuery } from "../../__generated__/GetPodcastQuery";
import { UserRole } from "../../__generated__/globalTypes";
import { GET_PODCAST_QUERY, IMyPodcastParams } from "../host/MyPodcast";

const CREATE_REVIEW_MUTATION = gql`
  mutation CreateReviewMutation($input: CreateReviewInput!) {
    createReview(input: $input) {
      ok
      error
    }
  }
`;

export const Podcast: React.FC = () => {
  const [subscribe, setSubscribe] = useState(false);
  const [text, setText] = useState("");
  const history = useHistory();
  const { data: meResult } = useMe();
  const params = useParams<IMyPodcastParams>();
  const { data, loading } = useQuery<GetPodcastQuery>(GET_PODCAST_QUERY, {
    variables: {
      id: +params.id,
    },
  });

  const onCompleted = () => {
    history.go(0);
  };

  const [createReviewMutation, { loading: reviewLoading }] = useMutation<
    CreateReviewMutation,
    CreateReviewMutationVariables
  >(CREATE_REVIEW_MUTATION, { onCompleted });

  const handleSubscribeBtn = () => console.log("subscribe");
  const handleReviewBtn = () => {
    createReviewMutation({
      variables: {
        input: {
          content: text,
          podcastId: +params.id,
        },
      },
    });
    setText("");
  };

  useEffect(() => {}, [subscribe]);

  return (
    <>
      <Helmet>
        <title>Podcast | Nonicast</title>
      </Helmet>
      <div className="w-full h-full my-5 px-6 flex sm:mx-auto sm:max-w-screen-xl">
        <Link
          to="/"
          className="font-normal text-black opacity-70 hover:opacity-90"
        >
          Home
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
                {/* Subscribe Button */}
                <span className="w-1/3">
                  <Button text="Subscribe" onClick={handleSubscribeBtn} />
                </span>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 w-full">
            {/* Reviews */}
            <span className="block text-xl font-semibold self-center">
              Reviews
            </span>
            <div className="w-full flex flex-col">
              <textarea
                name="review"
                rows={1}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full mt-4 -mb-4 px-4 py-2 text-base border border-gray-300 transition-all duration-700 outline-none rounded-lg"
              ></textarea>
              <div className="w-3/12 self-end">
                <SubmitButton
                  isValid={text.length > 0}
                  loading={reviewLoading}
                  text="Send"
                  styles=""
                  onClick={handleReviewBtn}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-5 pl-6 pr-4 py-4">
          {/* Episodes */}
          <div className="flex justify-between">
            <h1 className="text-xl font-semibold self-center">Episodes</h1>
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
          {data?.getPodcast.podcast?.episodes && (
            <div className="w-full mt-4">
              {data?.getPodcast.podcast?.episodes.map(
                ({ id, title, fileUrl, createdAt, updatedAt }, idx) => (
                  <EpisodeItem
                    role={UserRole.Listener}
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
