"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center space-y-5 py-10">
      <h2 className="font-handwriting text-4xl leading-loose font-bold md:text-6xl">
        Oops, Something went wrong!
      </h2>
      <div className="flex flex-wrap items-center justify-around gap-4">
        <button
          className="rounded-lg border-2 border-teal-500 bg-teal-50 px-3 py-2 font-medium text-teal-950 dark:border-teal-200 dark:bg-zinc-900 dark:text-teal-200"
          onClick={() => reset()}
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-lg border-2 border-teal-700 bg-teal-500 px-3 py-2 font-medium text-teal-50 dark:border-teal-50 dark:bg-zinc-900 dark:text-teal-50"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
