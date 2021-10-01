/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetEpisodeQuery
// ====================================================

export interface GetEpisodeQuery_getEpisode_episode {
  __typename: "Episode";
  title: string;
  fileUrl: string;
}

export interface GetEpisodeQuery_getEpisode {
  __typename: "EpisodeOutput";
  ok: boolean;
  error: string | null;
  episode: GetEpisodeQuery_getEpisode_episode | null;
}

export interface GetEpisodeQuery {
  getEpisode: GetEpisodeQuery_getEpisode;
}

export interface GetEpisodeQueryVariables {
  id: number;
}
