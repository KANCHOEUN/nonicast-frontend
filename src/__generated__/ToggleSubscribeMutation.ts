/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SubscribeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: ToggleSubscribeMutation
// ====================================================

export interface ToggleSubscribeMutation_toggleSubscribe {
  __typename: "CoreOutput";
  ok: boolean;
  error: string | null;
}

export interface ToggleSubscribeMutation {
  toggleSubscribe: ToggleSubscribeMutation_toggleSubscribe;
}

export interface ToggleSubscribeMutationVariables {
  input: SubscribeInput;
}
