import { gql, useMutation, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { FormError } from "../../components/FormError";
import { SubmitButton } from "../../components/SubmitButton";
import { EditPodcastMutation } from "../../__generated__/EditPodcastMutation";
import { GetPodcastQuery } from "../../__generated__/GetPodcastQuery";
import { PodcastCategory } from "../../__generated__/globalTypes";
import { GET_PODCAST_QUERY, IMyPodcastParams } from "./MyPodcast";

const EDIT_PODCAST_MUTATION = gql`
  mutation EditPodcastMutation($input: UpdatePodcastInput!) {
    updatePodcast(input: $input) {
      ok
      error
    }
  }
`;

export const EditPodcast: React.FC = () => {
  const history = useHistory();
  const params = useParams<IMyPodcastParams>();

  const { data } = useQuery<GetPodcastQuery>(GET_PODCAST_QUERY, {
    variables: {
      id: +params.id,
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: data?.getPodcast.podcast?.title,
      coverImg: data?.getPodcast.podcast?.coverImg,
      category: data?.getPodcast.podcast?.category,
      description: data?.getPodcast.podcast?.description,
    },
  });

  const onCompleted = (data: EditPodcastMutation) => {
    if (data.updatePodcast.ok) {
      history.push(`/podcast/${params.id}`);
      history.go(0);
    }
  };

  const [editPodcastMutation, { data: editPodcastResult, loading }] =
    useMutation(EDIT_PODCAST_MUTATION, { onCompleted });

  const onValid = () => {
    if (loading) return;
    const { title, coverImg, category, description } = getValues();
    editPodcastMutation({
      variables: {
        input: {
          id: +params.id,
          payload: {
            title,
            coverImg,
            category,
            description,
          },
        },
      },
    });
  };

  return (
    <div className="w-full h-full flex flex-col items-center my-7 md:mt-24">
      <Helmet>
        <title>Edit Podcast | Nonicast</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col items-center px-6 md:shadow md:px-20 md:py-16 md:rounded-xl">
        <h1 className="text-2xl font-bold mb-4 self-start">Edit Podcast</h1>
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
            defaultValue={data?.getPodcast.podcast?.title}
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
              defaultValue={data?.getPodcast.podcast?.coverImg || ""}
              className={`w-full px-4 py-1 text-base border border-gray-300 transition-all duration-700 outline-none rounded-lg z-0 ${
                errors.coverImg?.message
                  ? "focus:border-red-400"
                  : "focus:border-gray-600"
              }`}
            />
          </div>
          {errors.coverImg?.message && (
            <FormError errorMessage={errors.coverImg?.message} />
          )}

          {/* Category */}
          <span className="mt-4 text-black opacity-60 mb-2 text-sm">
            Category
          </span>
          <div className="flex flex-wrap rounded-full">
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
                  checked={data?.getPodcast.podcast?.category === category}
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
            defaultValue={data?.getPodcast.podcast?.description}
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
              text="Save"
              styles=""
            />
            {editPodcastResult?.updatePodcast.error && (
              <FormError errorMessage={editPodcastResult.updatePodcast.error} />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
