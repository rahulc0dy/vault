import React from "react";
import Link from "next/link";

const BlogPage = () => {
  return (
    <div className="text-2xl">
      <div className="rounded-xl border border-gray-500/50 bg-zinc-700/10 px-6 py-3 dark:bg-zinc-700/10 dark:text-white">
        <h3>Blog</h3>
        <Link href="/blogs/building-a-markdown-blog-in-nextjs">
          Click this to go
        </Link>
      </div>
    </div>
  );
};
export default BlogPage;
