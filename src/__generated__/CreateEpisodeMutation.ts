/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateEpisodeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateEpisodeMutation
// ====================================================

export interface CreateEpisodeMutation_createEpisode {
  __typename: "CreateEpisodeOutput";
  ok: boolean;
  error: string | null;
  id: number | null;
}

export interface CreateEpisodeMutation {
  createEpisode: CreateEpisodeMutation_createEpisode;
}

export interface CreateEpisodeMutationVariables {
  input: CreateEpisodeInput;
}
