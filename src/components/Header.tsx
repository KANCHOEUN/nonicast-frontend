import { useReactiveVar } from "@apollo/client";
import { FireIcon } from "@heroicons/react/solid";
import React from "react";
import { Link } from "react-router-dom";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { Button } from "./Button";

export const Header: React.FC = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  const logOut = () => {
    localStorage.setItem(LOCALSTORAGE_TOKEN, "");
    isLoggedInVar(false);
    authTokenVar("");
  };

  return (
    <header>
      <div className="w-full px-5 pt-5 pb-2 xl:px-0 max-w-screen-xl mx-auto flex justify-between">
        <span className="flex items-end pb-0.5">
          <Link to="/" className="flex hover:cursor-pointer">
            <FireIcon className="w-7 h-8 mr-2 text-yellow-400" />
            <h1 className="text-2xl font-extrabold">Nonicast</h1>
          </Link>
        </span>
        <div className="flex">
          {/* SignIn Button */}
          {!isLoggedIn && (
            <Link to="/login">
              <Button text="Sign in" />
            </Link>
          )}
          {/* TODO: Search Input */}
          {/* Logout Button */}
          {isLoggedIn && (
            <>
              <Button text="Log out" onClick={logOut} />
            </>
          )}
        </div>
      </div>
    </header>
  );
};
