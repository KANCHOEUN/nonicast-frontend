/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum PodcastCategory {
  Arts = "Arts",
  Business = "Business",
  Culture = "Culture",
  Education = "Education",
  Entertainment = "Entertainment",
  Fiction = "Fiction",
  Health = "Health",
  History = "History",
  Music = "Music",
  Science = "Science",
  Sports = "Sports",
  Technology = "Technology",
}

export enum UserRole {
  Host = "Host",
  Listener = "Listener",
}

export interface CreateAccountInput {
  email: string;
  password: string;
  role: UserRole;
}

export interface LoginInput {
  email: string;
  password: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
