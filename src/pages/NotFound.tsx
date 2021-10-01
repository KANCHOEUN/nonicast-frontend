import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { notFoundImg } from "../constants";

export const NotFound = () => (
  <div className="h-full flex flex-col items-center mt-20 sm:mt-32">
    <Helmet>
      <title>Not Found | Nonicast</title>
    </Helmet>
    <h2 className="font-semibold text-2xl mb-3">404 Page Not Found</h2>
    <img src={notFoundImg} alt="not-found-img" className="w-96" />
    <h4 className="font-medium text-base mb-5">
      The page you're looking for does not exists or has moved.
    </h4>
    <Link to="/" className="hover:underline text-primary">
      Go back home &rarr;
    </Link>
  </div>
);
