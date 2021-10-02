/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: myReview
// ====================================================

export interface myReview_reviews_creator {
  __typename: "User";
  email: string;
}

export interface myReview_reviews {
  __typename: "Review";
  creator: myReview_reviews_creator;
  content: string;
  createdAt: any;
}

export interface myReview {
  __typename: "Podcast";
  reviews: myReview_reviews[];
}
