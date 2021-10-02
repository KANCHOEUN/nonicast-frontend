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

export interface CreateEpisodeInput {
  title: string;
  fileUrl: string;
  podcastId: number;
}

export interface CreatePodcastInput {
  title: string;
  coverImg: string;
  category: PodcastCategory;
  description: string;
}

export interface CreateReviewInput {
  content: string;
  podcastId: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface SearchPodcastInput {
  query: string;
}

export interface SubscribeInput {
  id: number;
}

export interface UpdateEpisodeInput {
  podcastId: number;
  episodeId: number;
  payload: UpdateEpisodePayload;
}

export interface UpdateEpisodePayload {
  title?: string | null;
  fileUrl?: string | null;
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

export interface UpdateProfileInput {
  email?: string | null;
  password?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
