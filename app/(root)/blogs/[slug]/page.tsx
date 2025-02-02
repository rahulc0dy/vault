import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import React from "react";
import MarkdownRenderer from "@/components/helpers/MarkDownRenderer";

const BlogPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const blogFilePath = path.join(process.cwd(), "blogs", `${slug}.md`);

  const fileContents = await fs.readFile(blogFilePath, "utf8");

  const { content, data } = matter(fileContents);

  return (
    <>
      {data.title && (
        <>
          <h1 className="mb-4 text-center text-4xl font-bold">{data.title}</h1>
          <hr />
        </>
      )}
      <div className="py-4">
        <MarkdownRenderer content={content} />
      </div>
    </>
  );
};

export default BlogPage;
