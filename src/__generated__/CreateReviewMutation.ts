/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateReviewInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateReviewMutation
// ====================================================

export interface CreateReviewMutation_createReview {
  __typename: "CreateReviewOutput";
  ok: boolean;
  error: string | null;
}

export interface CreateReviewMutation {
  createReview: CreateReviewMutation_createReview;
}

export interface CreateReviewMutationVariables {
  input: CreateReviewInput;
}
