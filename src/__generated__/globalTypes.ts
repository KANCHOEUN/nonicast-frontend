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

export interface CreatePodcastInput {
  title: string;
  coverImg: string;
  category: PodcastCategory;
  description: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface UpdatePodcastInput {
  id: number;
  payload: UpdatePodcastPayload;
}

export interface UpdatePodcastPayload {
  title?: string | null;
  coverImg?: string | null;
  category?: PodcastCategory | null;
  description?: string | null;
  rating?: number | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
