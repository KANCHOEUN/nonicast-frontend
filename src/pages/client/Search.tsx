import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { PodcastItem } from "../../components/PodcastItem";
import { useParamsQuery } from "../../hooks/useParamsQuery";
import {
  SearchPodcastQuery,
  SearchPodcastQueryVariables,
} from "../../__generated__/SearchPodcastQuery";

const SEARCH_PODCAST_QUERY = gql`
  query SearchPodcastQuery($input: SearchPodcastInput!) {
    searchPodcastByTitle(input: $input) {
      ok
      error
      podcasts {
        id
        title
        category
        rating
        coverImg
      }
      resultsCount
    }
  }
`;

export const Search: React.FC = () => {
  const query = useParamsQuery();
  const title = query.get("title");
  const { data, loading, error } = useQuery<
    SearchPodcastQuery,
    SearchPodcastQueryVariables
  >(SEARCH_PODCAST_QUERY, {
    variables: {
      input: {
        query: title || "",
      },
    },
  });

  if (!data || loading || error) {
    <div className="h-screen flex justify-center items-center">
      <span className="font-medium text-xl tracking-wide">Loading...</span>
    </div>;
  }

  return (
    <div className="mx-auto sm:max-w-screen-xl">
      <h1 className="p-5 text-base font-semibold">{`Total Results : ${
        data?.searchPodcastByTitle.resultsCount
          ? data?.searchPodcastByTitle.resultsCount
          : 0
      }`}</h1>
      {data &&
        data.searchPodcastByTitle.podcasts?.map(
          ({ id, title, category, coverImg, rating }, idx) => (
            <PodcastItem
              key={idx}
              id={id}
              title={title}
              category={category}
              coverImg={coverImg}
              rating={rating ? rating : 0}
            />
          )
        )}
    </div>
  );
};
