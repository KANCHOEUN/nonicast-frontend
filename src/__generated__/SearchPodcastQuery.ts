/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchPodcastInput, PodcastCategory } from "./globalTypes";

// ====================================================
// GraphQL query operation: SearchPodcastQuery
// ====================================================

export interface SearchPodcastQuery_searchPodcastByTitle_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: PodcastCategory;
  rating: number | null;
  coverImg: string;
}

export interface SearchPodcastQuery_searchPodcastByTitle {
  __typename: "SearchPodcastOutput";
  ok: boolean;
  error: string | null;
  podcasts: SearchPodcastQuery_searchPodcastByTitle_podcasts[] | null;
  resultsCount: number;
}

export interface SearchPodcastQuery {
  searchPodcastByTitle: SearchPodcastQuery_searchPodcastByTitle;
}

export interface SearchPodcastQueryVariables {
  input: SearchPodcastInput;
}
