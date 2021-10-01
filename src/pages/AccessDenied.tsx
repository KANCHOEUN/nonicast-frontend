import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { accessDeniedImg } from "../constants";

export const AccessDenied = () => (
  <div className="h-full flex flex-col items-center mt-20 sm:mt-32">
    <Helmet>
      <title>Access Denied | Nonicast</title>
    </Helmet>
    <h2 className="font-semibold text-2xl mb-3">Access Denied</h2>
    <img src={accessDeniedImg} alt="access-denied-img" className="w-96" />
    <h4 className="font-medium text-base mb-5">
      The page you're looking for is only allowed for Nonicast's user.
    </h4>
    <span>
      If you want to see,&nbsp;
      <Link to="/" className="hover:underline text-primary">
        Sign In to Nonicast &rarr;
      </Link>
    </span>
  </div>
);
