/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: myPodcast
// ====================================================

export interface myPodcast_subscribers {
  __typename: "User";
  id: number;
  email: string;
}

export interface myPodcast {
  __typename: "Podcast";
  subscribers: myPodcast_subscribers[];
}
