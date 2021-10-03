/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole, PodcastCategory } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetProfileQuery
// ====================================================

export interface GetProfileQuery_getProfile_user_subscriptions {
  __typename: "Podcast";
  id: number;
  title: string;
  category: PodcastCategory;
  coverImg: string;
}

export interface GetProfileQuery_getProfile_user_reviews_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
}

export interface GetProfileQuery_getProfile_user_reviews {
  __typename: "Review";
  createdAt: any;
  content: string;
  podcast: GetProfileQuery_getProfile_user_reviews_podcast;
}

export interface GetProfileQuery_getProfile_user {
  __typename: "User";
  id: number;
  email: string;
  role: UserRole;
  subscriptions: GetProfileQuery_getProfile_user_subscriptions[];
  reviews: GetProfileQuery_getProfile_user_reviews[];
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
