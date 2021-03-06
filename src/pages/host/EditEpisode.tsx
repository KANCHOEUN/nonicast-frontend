import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { FormError } from "../../components/FormError";
import { SubmitButton } from "../../components/SubmitButton";
import {
  EditEpisodeMutation,
  EditEpisodeMutationVariables,
} from "../../__generated__/EditEpisodeMutation";
import {
  GetEpisodeQuery,
  GetEpisodeQueryVariables,
} from "../../__generated__/GetEpisodeQuery";

const EDIT_EPISODE_MUTATION = gql`
  mutation EditEpisodeMutation($input: UpdateEpisodeInput!) {
    updateEpisode(input: $input) {
      ok
      error
    }
  }
`;

const GET_EPISODE_QUERY = gql`
  query GetEpisodeQuery($id: Float!) {
    getEpisode(id: $id) {
      ok
      error
      episode {
        title
        fileUrl
      }
    }
  }
`;

interface IEditEpisodeParams {
  podcastId: string;
  episodeId: string;
}

interface IFormProps {
  title: string;
  file: FileList;
}

export const EditEpisode: React.FC = () => {
  const params = useParams<IEditEpisodeParams>();
  const [uploading, setUploading] = useState(false);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<IFormProps>({ mode: "onChange" });

  const { data: getEpisodeResult, loading: getEpisodeLoading } = useQuery<
    GetEpisodeQuery,
    GetEpisodeQueryVariables
  >(GET_EPISODE_QUERY, {
    variables: {
      id: +params.episodeId,
    },
  });

  const onCompleted = () => {
    setUploading(true);
    // TODO: My Podcast query
    history.push(`/podcast/${params.podcastId}`);
  };

  const [editEpisodeMutation, { data: editEpisodeResult, loading }] =
    useMutation<EditEpisodeMutation, EditEpisodeMutationVariables>(
      EDIT_EPISODE_MUTATION,
      {
        onCompleted,
        update(cache) {
          cache.writeFragment({
            id: `Episode:${+params.episodeId}`,
            fragment: gql`
              fragment updatedEpisode on Episode {
                updatedAt
                title
                fileUrl
                __typename
              }
            `,
            data: {
              updatedAt: new Date(),
              title: getValues().title,
              fileUrl: getValues().file,
              __typename: "Episode",
            },
          });
        },
      }
    );

  const onValid = async () => {
    if (loading) return;
    try {
      setUploading(true);
      const { title, file } = getValues();
      const actualFile = file[0];
      const formBody = new FormData();
      formBody.append("file", actualFile);
      const { url } = await (
        await fetch("https://nonicast-app.herokuapp.com/uploads", {
          method: "POST",
          body: formBody,
        })
      ).json();
      editEpisodeMutation({
        variables: {
          input: {
            podcastId: +params.podcastId,
            episodeId: +params.episodeId,
            payload: {
              title,
              fileUrl: url,
            },
          },
        },
      });
    } catch (error) {}
  };

  return (
    <div className="w-full h-full flex flex-col items-center my-7 md:mt-24">
      <Helmet>
        <title>Edit Episode | Nonicast</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col items-center px-6 md:shadow md:px-20 md:py-16 md:rounded-xl">
        <h1 className="text-2xl font-bold mb-4 self-start">Edit Episode</h1>
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
            defaultValue={getEpisodeResult?.getEpisode.episode?.title}
            className={`px-4 py-1 text-base border border-gray-300 transition-all duration-700 outline-none rounded-lg ${
              errors.title?.message
                ? "focus:border-red-400"
                : "focus:border-gray-600"
            }`}
          />
          {errors.title?.message && (
            <FormError errorMessage={errors.title?.message} />
          )}

          {/* Upload Audio File */}
          <input
            {...register("file", { required: true })}
            type="file"
            accept="audio/*"
            className="mt-4"
          />
          {errors.file?.message && (
            <FormError errorMessage={errors.file.message} />
          )}

          <div className="w-2/5 self-end">
            <SubmitButton
              isValid={isValid}
              loading={uploading}
              text="Save"
              styles=""
            />
            {editEpisodeResult?.updateEpisode.error && (
              <FormError errorMessage={editEpisodeResult.updateEpisode.error} />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
