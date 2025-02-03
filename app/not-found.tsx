import React from "react";

const NotFound = () => {
  return (
    <div className="wrapper flex h-auto w-full flex-col items-center justify-center py-10">
      <h1 className="font-handwriting text-4xl font-black md:text-9xl">404</h1>
      <h3 className="font-code text-xl font-semibold md:text-3xl">
        Page Not Found
      </h3>

      <p className="text-lg">Oops, the Requested Page was not found.</p>
    </div>
  );
};
export default NotFound;
