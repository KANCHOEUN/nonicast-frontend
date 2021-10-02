import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { notFoundImg } from "../../constants";
import { useMe } from "../../hooks/useMe";
import { GetHostProfileQuery } from "../../__generated__/GetHostProfileQuery";

export const GET_HOST_PROFILE_QUERY = gql`
  query GetHostProfileQuery($userId: Float!) {
    getProfile(userId: $userId) {
      ok
      error
      user {
        id
        podcasts {
          id
          title
          category
          coverImg
          updatedAt
        }
      }
    }
  }
`;

export const Dashboard = () => {
  const { data: meQueryResult } = useMe();
  const { data, loading, error } = useQuery<GetHostProfileQuery>(
    GET_HOST_PROFILE_QUERY,
    {
      variables: { userId: meQueryResult?.me.id },
    }
  );

  if (!data || loading || error) {
    <div className="h-screen flex justify-center items-center">
      <span className="font-medium text-xl tracking-wide">Loading...</span>
    </div>;
  }

  return (
    <div className="w-full h-full flex justify-center ">
      <Helmet>
        <title>Dashboard | Nonicast</title>
      </Helmet>
      <div className="w-full max-w-screen-xl px-6 pt-3 pb-4 mx-auto">
        {/* TODO: Search Host's podcast Input */}
        {/* TODO: Create New Podcast Button */}
        <div className="w-full flex justify-between mb-3">
          <h1 className="font-normal self-center text-black">Podcasts</h1>
          <Link to="/podcast/add">
            <Button text="Add" />
          </Link>
        </div>
        {data?.getProfile.user?.podcasts.length === 0 && (
          <>
            <h5 className="mb-3 text-right text-gray-500">
              Click "Add" Button to create podcast. &uarr; &nbsp;
            </h5>
            <div className="w-full h-full flex flex-col justify-center items-center">
              <img
                src={notFoundImg}
                alt="nothing"
                className="block mb-2 w-3/4 sm:w-2/4"
              />
              <span className="font-medium">There's Nothing</span>
            </div>
          </>
        )}
        {data?.getProfile.user?.podcasts.length !== 0 && (
          <>
            {data?.getProfile.user?.podcasts.map(
              ({ id, title, category, coverImg, updatedAt }, idx) => (
                <Link key={idx} to={`/podcast/${id}`}>
                  <div className="flex px-2 py-3 justify-between border-b border-gray-200 hover:bg-gray-100 hover:bg-opacity-50 transition duration-500">
                    <div className="flex space-x-3">
                      <img
                        src={coverImg}
                        alt="coverImg"
                        className="w-8 h-8 rounded-full border-2 border-gray-200 bg-white"
                      />
                      <span className="self-center">{title}</span>
                    </div>

                    <div className="self-center font-normal text-gray-400">
                      {new Date(updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                </Link>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};
