/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeletePodcastMutation
// ====================================================

export interface DeletePodcastMutation_deletePodcast {
  __typename: "CoreOutput";
  ok: boolean;
  error: string | null;
}

export interface DeletePodcastMutation {
  deletePodcast: DeletePodcastMutation_deletePodcast;
}

export interface DeletePodcastMutationVariables {
  id: number;
}
