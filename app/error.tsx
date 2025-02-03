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
    <div className="flex flex-col items-center justify-center py-10">
      <h2 className="font-handwriting text-9xl font-bold md:text-4xl">
        Something went wrong!
      </h2>
      <button
        className="bg-teal-50 px-3 py-2 font-medium text-teal-950 dark:bg-zinc-900 dark:text-teal-50"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
      <Link
        href="/"
        className="bg-teal-50 px-3 py-2 font-medium text-teal-950 dark:bg-zinc-900 dark:text-teal-50"
      >
        Return Home
      </Link>
    </div>
  );
}
