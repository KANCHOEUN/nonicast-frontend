/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole, PodcastCategory } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetFeedsQuery
// ====================================================

export interface GetFeedsQuery_me_subscriptions_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  updatedAt: any;
  fileUrl: string;
}

export interface GetFeedsQuery_me_subscriptions {
  __typename: "Podcast";
  id: number;
  title: string;
  category: PodcastCategory;
  coverImg: string;
  episodes: GetFeedsQuery_me_subscriptions_episodes[];
}

export interface GetFeedsQuery_me {
  __typename: "User";
  id: number;
  email: string;
  role: UserRole;
  subscriptions: GetFeedsQuery_me_subscriptions[];
}

export interface GetFeedsQuery {
  me: GetFeedsQuery_me;
}
