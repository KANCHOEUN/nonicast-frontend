/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PodcastCategory } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetPodcastQuery
// ====================================================

export interface GetPodcastQuery_getPodcast_podcast_owner {
  __typename: "User";
  id: number;
}

export interface GetPodcastQuery_getPodcast_podcast_episodes {
  __typename: "Episode";
  id: number;
  createdAt: any;
  updatedAt: any;
  title: string;
  fileUrl: string;
}

export interface GetPodcastQuery_getPodcast_podcast {
  __typename: "Podcast";
  id: number;
  createdAt: any;
  updatedAt: any;
  title: string;
  coverImg: string;
  category: PodcastCategory;
  description: string;
  rating: number | null;
  owner: GetPodcastQuery_getPodcast_podcast_owner;
  episodes: GetPodcastQuery_getPodcast_podcast_episodes[];
}

export interface GetPodcastQuery_getPodcast {
  __typename: "PodcastOutput";
  ok: boolean;
  error: string | null;
  podcast: GetPodcastQuery_getPodcast_podcast | null;
}

export interface GetPodcastQuery {
  getPodcast: GetPodcastQuery_getPodcast;
}

export interface GetPodcastQueryVariables {
  id: number;
}
