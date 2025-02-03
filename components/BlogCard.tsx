import React from "react";
import Image from "next/image";
import { placeHolder } from "@/utils/placeholderGenerator";

const BlogCard = (blog: { date: Date; slug: string; title: string }) => {
  return (
    <article
      key={blog.slug}
      className="overflow-hidden rounded-lg bg-teal-50 shadow-md transition hover:shadow-lg dark:bg-zinc-800 dark:text-teal-50"
    >
      <Image
        src={placeHolder({
          mode: "dark",
          dimensions: { width: 700, height: 500 },
          text: "No Image",
          font: "Montserrat",
          format: "png",
        })}
        width={700}
        height={500}
        alt="Blog Post"
        className="h-40 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="mb-2 text-lg font-bold">{blog.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {blog.date.toDateString()}
        </p>
        <a
          href={`/blogs/${blog.slug}`}
          className="mt-2 inline-block font-semibold text-blue-500 dark:text-sky-300"
        >
          Read More →
        </a>
      </div>
    </article>
  );
};
export default BlogCard;
