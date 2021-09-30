import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { GetProfileQuery } from "../../__generated__/GetProfileQuery";

const GET_PROFILE_QUERY = gql`
  query GetProfileQuery {
    getProfile {
      ok
      error
      user {
        id
        podcasts {
          id
          title
          category
          updatedAt
        }
      }
    }
  }
`;

export const Dashboard = () => {
  const { data, loading, error } = useQuery<GetProfileQuery>(GET_PROFILE_QUERY);

  if (!data || loading || error) {
    <div className="h-screen flex justify-center items-center">
      <span className="font-medium text-xl tracking-wide">Loading...</span>
    </div>;
  }

  return (
    <div className="w-full h-full bg-yellow-400 flex justify-center">
      <div className="bg-red-400 w-full max-w-screen-xl mx-auto">
        {/* TODO: Search Host's podcast Input */}
        {/* TODO: Create New Podcast Button */}
        <div className="w-full flex justify-between px-4 py-4">
          <h1 className="text-base font-medium self-center text-black tracking-tight">
            Podcasts
          </h1>
          {/* TODO: Host's Podcast List */}
          <Link to="/add-podcast">
            <Button text="Add" />
          </Link>
          {/* {data?.getProfile.user?.podcasts.map(
            ({ id, title, category, updatedAt }, idx) => {
              <div>{id}</div>;
            }
          )} */}
        </div>
      </div>
    </div>
  );
};
