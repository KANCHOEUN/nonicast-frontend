import { useReactiveVar } from "@apollo/client";
import { FireIcon, SearchIcon, UserCircleIcon } from "@heroicons/react/solid";
import { PencilIcon, HeartIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { isLoggedInVar } from "../apollo";
import { Button } from "./Button";
import { useMe } from "../hooks/useMe";
import { UserRole } from "../__generated__/globalTypes";

export const Header: React.FC = () => {
  const [query, setQuery] = useState("");
  const { pathname } = useLocation();
  const history = useHistory();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useMe();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      history.push(`/search?title=${query}`);
    }
  };

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    history.push(`/search?title=${query}`);
  };

  return (
    <header className="sticky z-20 w-full shadow-sm">
      <div className="w-full px-5 pt-5 pb-4 xl:px-0 max-w-screen-xl mx-auto flex justify-between">
        <span className="flex items-center pb-0.5">
          <Link to="/" className="flex hover:cursor-pointer">
            <FireIcon className="w-7 h-8 mr-2 text-yellow-400" />
            <h1 className="text-2xl font-extrabold">Nonicast</h1>
          </Link>
        </span>
        <div className="flex w-7/12 sm:w-5/12 justify-end">
          {/* Search Input */}
          {(pathname === "/" || pathname.includes("/search")) && (
            <div className="relative flex group w-full mr-4 border border-gray-300 outline-none transition-all duration-700 rounded-lg group-focus:border-gray-600 overflow-hidden">
              <input
                type="text"
                onKeyDown={handleKeyDown}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-11/12 pl-3 outline-none"
              />
              <SearchIcon
                onClick={handleClick}
                className="w-5 absolute top-1.5 right-2.5 text-gray-400 group-focus:text-black cursor-pointer"
              />
            </div>
          )}

          {/* SignIn Button */}
          {!isLoggedIn && pathname !== "/login" && pathname !== "/sign-up" && (
            <Link to="/login" className="min-w-max">
              <Button text="Sign in" />
            </Link>
          )}
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
