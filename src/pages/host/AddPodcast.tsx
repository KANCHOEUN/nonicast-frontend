import { gql, useMutation } from "@apollo/client";
import { PencilAltIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { FormError } from "../../components/FormError";
import { SubmitButton } from "../../components/SubmitButton";
import { defaultCoverImg } from "../../constants";
import {
  CreatePodcastMutation,
  CreatePodcastMutationVariables,
} from "../../__generated__/CreatePodcastMutation";
import { PodcastCategory } from "../../__generated__/globalTypes";

const CREATE_PODCAST_MUTATION = gql`
  mutation CreatePodcastMutation($createPodcastInput: CreatePodcastInput!) {
    createPodcast(input: $createPodcastInput) {
      ok
      error
      id
    }
  }
`;

export const AddPodcast: React.FC = () => {
  const [readonly, setReadonly] = useState(true);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const onCompleted = (data: CreatePodcastMutation) => {
    const { ok, id } = data.createPodcast;
    if (ok) {
      history.push(`/podcast/${id}`);
    }
  };

  const [createPodcastMutation, { data: createPodcastResult, loading }] =
    useMutation<CreatePodcastMutation, CreatePodcastMutationVariables>(
      CREATE_PODCAST_MUTATION,
      { onCompleted }
    );

  const onValid = () => {
    if (loading) return;
    const { title, coverImg, category, description } = getValues();
    createPodcastMutation({
      variables: {
        createPodcastInput: {
          title,
          coverImg,
          category,
          description,
        },
      },
    });
  };

  return (
    <div className="w-full h-full flex flex-col items-center mt-7 md:mt-24">
      <Helmet>
        <title>Add Podcast | Nonicast</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col items-center px-6 md:shadow md:px-20 md:py-16 md:rounded-xl">
        <h1 className="text-2xl font-bold mb-4 self-start">
          Create New Podcast
        </h1>
        <form
          className="flex flex-col w-full mt-4"
          onSubmit={handleSubmit(onValid)}
        >
          {/* Title */}
          <span className="text-black opacity-60 mb-2 text-sm">Title</span>
          <input
            {...register("title", {
              required: "Title is required",
            })}
            type="text"
            className={`px-4 py-1 text-base border border-gray-300 transition-all duration-700 outline-none rounded-lg ${
              errors.title?.message
                ? "focus:border-red-400"
                : "focus:border-gray-600"
            }`}
          />
          {errors.title?.message && (
            <FormError errorMessage={errors.title?.message} />
          )}

          {/* CoverImg */}
          <span className="mt-4 text-black opacity-60 mb-2 text-sm">
            Cover Image URL
          </span>
          <div className="relative flex flex-row">
            <input
              {...register("coverImg", {
                required: "Cover Image Url is required",
              })}
              id="coverImg"
              type="url"
              value={
                defaultCoverImg[
                  Math.ceil(Math.random() * defaultCoverImg.length)
                ]
              }
              readOnly={readonly}
              className={`w-full pl-4 pr-10 py-1 text-base border border-gray-300 transition-all duration-700 outline-none rounded-lg z-0 ${
                errors.coverImg?.message
                  ? "focus:border-red-400"
                  : "focus:border-gray-600"
              } ${readonly ? "bg-gray-100" : ""}`}
            />
            <PencilAltIcon
              onClick={() => setReadonly(false)}
              className="w-5 text-gray-600 opacity-70 absolute z-10 cursor-pointer right-3 bottom-2"
            />
          </div>
          {errors.coverImg?.message && (
            <FormError errorMessage={errors.coverImg?.message} />
          )}

          {/* Category */}
          <span className="mt-4 text-black opacity-60 mb-2 text-sm">
            Category
          </span>
          <div className="flex flex-wrap">
            {Object.values(PodcastCategory).map((category, idx) => (
              <React.Fragment key={idx}>
                {" "}
                <input
                  {...register("category", { required: true })}
                  type="radio"
                  id={category}
                  className="hidden"
                  required
                  value={PodcastCategory[category]}
                />
                <label
                  htmlFor={category}
                  className={`max-w-max rounded-full shadow cursor-pointer px-3 py-2 mr-2 mb-2 hover:bg-gray-100 transition duration-500 ${
                    watch("category") === PodcastCategory[category]
                      ? "text-white bg-yellow-400 hover:bg-yellow-400"
                      : ""
                  }`}
                >
                  {category}
                </label>
              </React.Fragment>
            ))}
          </div>
          {errors.category?.message && (
            <FormError errorMessage={errors.category?.message} />
          )}

          {/* Description */}
          <span className="mt-3 text-black opacity-60 mb-2 text-sm">
            Description
          </span>
          <textarea
            {...register("description", { required: true })}
            rows={5}
            className={`px-4 py-2 text-base border border-gray-300 transition-all duration-700 outline-none rounded-lg ${
              errors.description?.message
                ? "focus:border-red-400"
                : "focus:border-gray-600"
            }`}
          ></textarea>
          {errors.description?.message && (
            <FormError errorMessage={errors.description?.message} />
          )}
          <div className="w-2/5 self-end">
            <SubmitButton
              isValid={isValid}
              loading={loading}
              text="Create"
              styles=""
            />
            {createPodcastResult?.createPodcast.error && (
              <FormError
                errorMessage={createPodcastResult.createPodcast.error}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
