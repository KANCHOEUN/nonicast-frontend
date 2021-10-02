/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EpisodeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteEpisodeMutation
// ====================================================

export interface DeleteEpisodeMutation_deleteEpisode {
  __typename: "CoreOutput";
  ok: boolean;
  error: string | null;
}

export interface DeleteEpisodeMutation {
  deleteEpisode: DeleteEpisodeMutation_deleteEpisode;
}

export interface DeleteEpisodeMutationVariables {
  input: EpisodeInput;
}
