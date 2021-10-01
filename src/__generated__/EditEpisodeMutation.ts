/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateEpisodeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: EditEpisodeMutation
// ====================================================

export interface EditEpisodeMutation_updateEpisode {
  __typename: "UpdateEpisodeOutput";
  ok: boolean;
  error: string | null;
}

export interface EditEpisodeMutation {
  updateEpisode: EditEpisodeMutation_updateEpisode;
}

export interface EditEpisodeMutationVariables {
  input: UpdateEpisodeInput;
}
