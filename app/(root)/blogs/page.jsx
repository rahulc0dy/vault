import React from "react";
import { getBlogsList } from "../../../utils/blogsList";
import { BookTemplateIcon } from "lucide-react";
import BlogCard from "../../../components/BlogCard";

const BlogPage = () => {
  const blogs = getBlogsList();

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => <BlogCard {...blog} key={blog.slug} />)
      ) : (
        <BookTemplateIcon />
      )}
    </div>
  );
};
export default BlogPage;
