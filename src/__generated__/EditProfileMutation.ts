/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateProfileInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: EditProfileMutation
// ====================================================

export interface EditProfileMutation_updateProfile {
  __typename: "UpdateProfileOutput";
  ok: boolean;
  error: string | null;
}

export interface EditProfileMutation {
  updateProfile: EditProfileMutation_updateProfile;
}

export interface EditProfileMutationVariables {
  input: UpdateProfileInput;
}
