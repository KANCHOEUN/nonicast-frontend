import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { ChevronRightIcon } from "@heroicons/react/solid";
import gql from "graphql-tag";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams, useHistory } from "react-router-dom";
import { Button } from "../../components/Button";
import { EpisodeItem } from "../../components/EpisodeItem";
import { Loading } from "../../components/Loading";
import { ReviewItem } from "../../components/ReviewItem";
import { SubmitButton } from "../../components/SubmitButton";
import { defaultCoverImg, notFoundImg } from "../../constants";
import { useMe } from "../../hooks/useMe";
import {
  CreateReviewMutation,
  CreateReviewMutationVariables,
} from "../../__generated__/CreateReviewMutation";
import { GetPodcastQuery } from "../../__generated__/GetPodcastQuery";
import { UserRole } from "../../__generated__/globalTypes";
import {
  ToggleSubscribeMutation,
  ToggleSubscribeMutationVariables,
} from "../../__generated__/ToggleSubscribeMutation";
import { GET_PODCAST_QUERY, IMyPodcastParams } from "../host/MyPodcast";

const CREATE_REVIEW_MUTATION = gql`
  mutation CreateReviewMutation($input: CreateReviewInput!) {
    createReview(input: $input) {
      ok
      error
    }
  }
`;

const TOGGLE_SUBSCRIBE_MUTATION = gql`
  mutation ToggleSubscribeMutation($input: SubscribeInput!) {
    toggleSubscribe(input: $input) {
      ok
      error
    }
  }
`;

export const Podcast: React.FC = () => {
  const [url, setUrl] = useState("");
  const [subscribe, setSubscribe] = useState(false);
  const [text, setText] = useState("");
  const history = useHistory();
  const { data: meResult } = useMe();
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

  const onReviewCompleted = (data: CreateReviewMutation) => {
    if (data.createReview.ok) {
      client.writeFragment({
        id: `Podcast:${+params.id}`,
        fragment: gql`
          fragment myReview on Podcast {
            reviews {
              creator {
                email
              }
              content
              createdAt
            }
          }
        `,
        data: {
          reviews: [
            {
              creator: {
                email: meResult?.me.email,
                __typename: "Review",
              },
              content: text,
              createdAt: new Date(),
              __typename: "Review",
            },
            ...(getPodcastResult?.getPodcast.podcast?.reviews || []),
          ],
        },
      });
    }
    setText("");
  };

  const onSubscribeCompleted = (data: ToggleSubscribeMutation) => {
    if (data.toggleSubscribe.ok) {
      const queryResult = client.readQuery<GetPodcastQuery>({
        query: GET_PODCAST_QUERY,
      });
      if (subscribe) {
        const newSubscribers =
          queryResult?.getPodcast.podcast?.subscribers.filter(
            (sub) => sub.id !== meResult?.me.id
          );
        client.writeFragment({
          id: `Podcast:${+params.id}`,
          fragment: gql`
            fragment myPodcast on Podcast {
              subscribers
            }
          `,
          data: {
            subscribers: newSubscribers,
          },
        });
      } else {
        client.writeFragment({
          id: `Podcast:${+params.id}`,
          fragment: gql`
            fragment myPodcast on Podcast {
              subscribers {
                __typename
                id
                email
              }
            }
          `,
          data: {
            subscribers: [
              {
                __typename: "User",
                id: meResult?.me.id,
                email: meResult?.me.email,
              },
              ...(getPodcastResult?.getPodcast.podcast?.subscribers || []),
            ],
          },
        });
      }
    }
    setSubscribe(!subscribe);
  };

  const [createReviewMutation, { loading: reviewLoading }] = useMutation<
    CreateReviewMutation,
    CreateReviewMutationVariables
  >(CREATE_REVIEW_MUTATION, { onCompleted: onReviewCompleted });

  const [toggleSubscribeMutation, { loading: subscribeLoading }] = useMutation<
    ToggleSubscribeMutation,
    ToggleSubscribeMutationVariables
  >(TOGGLE_SUBSCRIBE_MUTATION, {
    onCompleted: onSubscribeCompleted,
  });

  const handleSubscribeBtn = () => {
    toggleSubscribeMutation({
      variables: {
        input: {
          id: +params.id,
        },
      },
    });
  };

  const handleReviewBtn = () => {
    createReviewMutation({
      variables: {
        input: {
          content: text,
          podcastId: +params.id,
        },
      },
    });
  };

  useEffect(() => {
    if (
      getPodcastResult &&
      getPodcastResult.getPodcast.podcast?.subscribers.some(
        (sub) => sub.id === meResult?.me.id
      )
    ) {
      setSubscribe(true);
    }
  }, [getPodcastResult, meResult?.me.id]);

  if (!getPodcastResult || loading || error) {
    return <Loading />;
  }

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
        <ChevronRightIcon className="w-4 mx-2.5 font-normal self-center text-black opacity-30" />
        <span className="font-meidum">{`${getPodcastResult?.getPodcast.podcast?.title}`}</span>
      </div>
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
                category :&nbsp;
                {getPodcastResult?.getPodcast.podcast?.category}
              </h5>
              <h5 className="mb-1">
                description :&nbsp;
                {getPodcastResult?.getPodcast.podcast?.description}
              </h5>
              <div className="flex w-full justify-end min-w-max space-x-3">
                {/* Subscribe Button */}
                <span className="w-1/3 mt-2">
                  <button
                    onClick={handleSubscribeBtn}
                    className={`w-full py-3 font-medium shadow text-base tracking-tight transition-colors duration-500 outline-none rounded-full ${
                      subscribe
                        ? "bg-gray-200 hover:bg-gray-300 hover:bg-opcaity-50"
                        : "bg-white hover:bg-gray-100 hover:bg-opacity-50"
                    }`}
                  >
                    {subscribe ? "Unsubscribe" : "Subscribe"}
                  </button>
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
            {getPodcastResult?.getPodcast.podcast?.reviews &&
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
        <div className="w-full mt-5 pl-6 pr-4 py-4">
          {/* Episodes */}
          <div className="flex justify-between">
            <h1 className="text-xl font-semibold self-center">Episodes</h1>
          </div>
          {/* No Episode */}
          {getPodcastResult?.getPodcast.podcast?.episodes.length === 0 && (
            <>
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
                    role={UserRole.Listener}
                    key={idx}
                    podcastId={+params.id}
                    episodeId={id}
                    title={title}
                    fileUrl={fileUrl}
                    createdAt={createdAt}
                    updatedAt={updatedAt}
                    onClick={setUrl}
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
