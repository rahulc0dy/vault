import React from "react";
import Link from "next/link";
import { getBlogsList } from "../../../utils/blogsList";
import { BookTemplateIcon } from "lucide-react";

const BlogPage = () => {
  const blogs = getBlogsList();

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <Link
            key={blog.slug}
            href={`/blogs/${blog.slug}`}
            className="flex flex-col rounded-lg border-2 border-teal-500/30 bg-teal-300/10 p-4"
          >
            <span className="font-handwriting text-lg font-bold">
              {blog.title}
            </span>
            <span className="font-code font-medium text-slate-700 dark:text-slate-300">
              {blog.date.toDateString()}
            </span>
          </Link>
        ))
      ) : (
        <BookTemplateIcon />
      )}
    </div>
  );
};
export default BlogPage;
