import React from "react";

export const Podcast: React.FC = () => {
  return (
    <div className="w-full h-full pb-5 px-6 space-y-5 sm:mx-auto sm:max-w-screen-xl bg-yellow-400">
      <div className="bg-green-400 p-4 flex flex-row space-x-5">
        <h1 className="">Podcast Info</h1>
      </div>
      <div className="bg-red-400 p-4">Feeds</div>
    </div>
  );
};
