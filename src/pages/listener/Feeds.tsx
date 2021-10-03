import { useQuery } from "@apollo/client";
import React from "react";
import { Loading } from "../../components/Loading";
import { GetProfileQuery } from "../../__generated__/GetProfileQuery";
import { GET_PROFILE_QUERY } from "../client/MyProfile";

export const Feeds: React.FC = () => {
  const { data, loading, error } = useQuery<GetProfileQuery>(GET_PROFILE_QUERY);

  if (!data || loading || error) return <Loading />;

  return (
    <div className="w-full h-full pb-5 px-6 space-y-5 sm:mx-auto sm:max-w-screen-xl bg-yellow-400">
      <div className="bg-green-400 p-4 flex flex-row space-x-5">
        <h1 className="">Subscriptions</h1>
      </div>
      <div className="bg-red-400 p-4">Feeds</div>
    </div>
  );
};
