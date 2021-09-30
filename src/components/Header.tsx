import { useReactiveVar } from "@apollo/client";
import { FireIcon, UserCircleIcon } from "@heroicons/react/solid";
import { PencilIcon, HeartIcon } from "@heroicons/react/outline";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { isLoggedInVar } from "../apollo";
import { Button } from "./Button";
import { useMe } from "../hooks/useMe";
import { UserRole } from "../__generated__/globalTypes";

export const Header: React.FC = () => {
  const { pathname } = useLocation();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useMe();

  return (
    <header className="sticky z-20 w-full shadow-sm">
      <div className="w-full px-5 pt-5 pb-4 xl:px-0 max-w-screen-xl mx-auto flex justify-between">
        <span className="flex items-center pb-0.5">
          <Link to="/" className="flex hover:cursor-pointer">
            <FireIcon className="w-7 h-8 mr-2 text-yellow-400" />
            <h1 className="text-2xl font-extrabold">Nonicast</h1>
          </Link>
        </span>
        <div className="flex">
          {/* SignIn Button */}
          {!isLoggedIn && pathname !== "/login" && pathname !== "/sign-up" && (
            <Link to="/login">
              <Button text="Sign in" />
            </Link>
          )}
          {/* TODO: Search Input */}
          {isLoggedIn && (
            <div className="flex items-end space-x-4">
              {data?.me.role === UserRole.Listener && (
                <Link to="/feeds">
                  <HeartIcon
                    className={`w-8 hover:opacity-50 transition duration-500 ${
                      pathname === "/feeds"
                        ? "text-red-400"
                        : "text-black opacity-25"
                    }`}
                  />
                </Link>
              )}
              {data?.me.role === UserRole.Host && (
                <Link to="/">
                  <PencilIcon
                    className={`w-7 h-8 hover:opacity-50 transition duration-500 ${
                      pathname === "/"
                        ? "text-green-400"
                        : "text-black opacity-25"
                    }`}
                  />
                </Link>
              )}
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
