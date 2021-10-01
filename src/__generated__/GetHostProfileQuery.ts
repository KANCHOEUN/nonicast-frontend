/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PodcastCategory } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetHostProfileQuery
// ====================================================

export interface GetHostProfileQuery_getProfile_user_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: PodcastCategory;
  coverImg: string;
  updatedAt: any;
}

export interface GetHostProfileQuery_getProfile_user {
  __typename: "User";
  id: number;
  podcasts: GetHostProfileQuery_getProfile_user_podcasts[];
}

export interface GetHostProfileQuery_getProfile {
  __typename: "UserOutput";
  ok: boolean;
  error: string | null;
  user: GetHostProfileQuery_getProfile_user | null;
}

export interface GetHostProfileQuery {
  getProfile: GetHostProfileQuery_getProfile;
}

export interface GetHostProfileQueryVariables {
  userId: number;
}
