import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useHistory, useParams } from "react-router-dom";
import { authTokenVar, client, isLoggedInVar } from "../../apollo";
import { SubmitButton } from "../../components/SubmitButton";
import { LOCALSTORAGE_TOKEN } from "../../constants";
import {
  GetProfileQuery,
  GetProfileQueryVariables,
} from "../../__generated__/GetProfileQuery";
import { UserRole } from "../../__generated__/globalTypes";

const GET_PROFILE_QUERY = gql`
  query GetProfileQuery($userId: Float!) {
    getProfile(userId: $userId) {
      ok
      error
      user {
        id
        email
        role
        subscriptions {
          id
          title
          category
        }
        reviews {
          createdAt
          content
          podcast {
            id
            title
          }
        }
      }
    }
  }
`;

interface IMyProfileParams {
  id: string;
}

export const MyProfile = () => {
  const [tab, setTab] = useState(true);
  const params = useParams<IMyProfileParams>();
  const { data, loading, error } = useQuery<
    GetProfileQuery,
    GetProfileQueryVariables
  >(GET_PROFILE_QUERY, {
    variables: {
      userId: +params.id,
    },
  });
  const history = useHistory();

  const profileImg = "https://doodleipsum.com/200/avatar?shape=circle";

  const logOut = () => {
    localStorage.setItem(LOCALSTORAGE_TOKEN, "");
    isLoggedInVar(false);
    authTokenVar("");
    history.push("/");
    client.clearStore();
  };

  if (!data || loading || error) {
    <div className="h-screen flex justify-center items-center">
      <span className="font-medium text-xl tracking-wide">Loading...</span>
    </div>;
  }

  return (
    <div className="w-full mt-5 flex flex-col items-center justify-center max-x-screen">
      <Helmet>
        <title>Profile | Nonicast</title>
      </Helmet>
      <div className="w-full flex flex-col max-w-screen-sm sm:max-w-screen-md">
        <div className="flex flex-col space-y-3">
          {/* Profile Image */}
          <div
            className="rounded-full bg-cover w-56 h-56 shadow mx-auto"
            style={{ backgroundImage: `url(${profileImg})` }}
          />
          {/* Profile Info */}
          <div className="flex flex-col items-center space-y-1">
            <h2 className="text-xl font-medium">
              {data?.getProfile.user?.role}
            </h2>
            <h5>{data?.getProfile.user?.email}</h5>
          </div>
        </div>
        {/* Edit profile / Log out */}
        <div className="w-6/12 flex space-x-4 mx-auto">
          <Link
            to={`/user/${data?.getProfile.user?.id}/edit`}
            className="w-full"
          >
            <SubmitButton
              isValid={true}
              loading={loading}
              text="Edit Profile"
            />
          </Link>
          <SubmitButton
            isValid={true}
            loading={loading}
            onClick={logOut}
            text="Log Out"
          />
        </div>
      </div>
      {data?.getProfile.user?.role === UserRole.Listener && (
        <>
          {" "}
          {/* Tab: My Subscriptions / My Reviews */}
          <div className="flex w-full justify-start mt-10 max-w-screen-xl px-6 md:px-8 space-x-6">
            <button
              onClick={() => setTab(true)}
              className={`w-36 ${
                tab
                  ? "font-semibold"
                  : "text-gray-500 hover:text-green-600 hover:text-opacity-60"
              }`}
            >
              My Subscriptions
            </button>
            <span className="mx-4 text-green-600 text-opacity-70 font-bold">
              |
            </span>
            <button
              onClick={() => setTab(false)}
              className={`w-24 ${
                !tab
                  ? "font-semibold"
                  : "text-gray-500 hover:text-green-600 hover:text-opacity-60"
              }`}
            >
              My Reviews
            </button>
          </div>
          {tab && <div>{/* My subscriptions */}</div>}
          {!tab && <div>{/* TODO: My reviews */}</div>}
        </>
      )}
    </div>
  );
};
