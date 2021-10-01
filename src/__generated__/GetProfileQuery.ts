/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PodcastCategory } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetProfileQuery
// ====================================================

export interface GetProfileQuery_getProfile_user_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: PodcastCategory;
  coverImg: string;
  updatedAt: any;
}

export interface GetProfileQuery_getProfile_user {
  __typename: "User";
  id: number;
  podcasts: GetProfileQuery_getProfile_user_podcasts[];
}

export interface GetProfileQuery_getProfile {
  __typename: "UserOutput";
  ok: boolean;
  error: string | null;
  user: GetProfileQuery_getProfile_user | null;
}

export interface GetProfileQuery {
  getProfile: GetProfileQuery_getProfile;
}

export interface GetProfileQueryVariables {
  userId: number;
}
