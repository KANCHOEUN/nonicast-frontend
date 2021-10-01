/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PodcastCategory } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetPodcastsQuery
// ====================================================

export interface GetPodcastsQuery_getPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: PodcastCategory;
  rating: number | null;
  coverImg: string;
}

export interface GetPodcastsQuery_getPodcasts {
  __typename: "PodcastsOutput";
  ok: boolean;
  error: string | null;
  podcasts: GetPodcastsQuery_getPodcasts_podcasts[] | null;
}

export interface GetPodcastsQuery {
  getPodcasts: GetPodcastsQuery_getPodcasts;
}
