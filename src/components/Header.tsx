import { useReactiveVar } from "@apollo/client";
import { FireIcon, UserCircleIcon } from "@heroicons/react/solid";
import { HeartIcon } from "@heroicons/react/outline";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { isLoggedInVar } from "../apollo";
import { Button } from "./Button";
import { useMe } from "../hooks/useMe";

export const Header: React.FC = () => {
  const { pathname } = useLocation();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useMe();

  return (
    <header className="sticky z-20 w-full">
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
          {isLoggedIn && (
            <div className="flex items-end space-x-3">
              <Link to="/feeds">
                <HeartIcon
                  className={`w-8 hover:opacity-50 transition duration-500 ${
                    pathname === "/feeds"
                      ? "text-red-400"
                      : "text-black opacity-25"
                  }`}
                />
              </Link>
              <Link to={`/user/${data?.me.id}`}>
                <UserCircleIcon
                  className={`w-8 text-black hover:opacity-50 transition duration-500 ${
                    pathname.includes("/user/") ? "opacity-70" : "opacity-25"
                  }`}
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
