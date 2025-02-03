// lib/getBlogsList.ts

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogList } from "@/lib/types";

export function getBlogsList(limit?: number): BlogList[] {
  const blogsDir = path.join(process.cwd(), "blogs");
  const files = fs.readdirSync(blogsDir);

  const blogsList: BlogList[] = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(blogsDir, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);

      const slug = file.replace(/\.md$/, "");
      return {
        slug,
        title: data.title || "Untitled",
        date: new Date(data.date) || new Date(),
        link: `/blogs/${slug}`,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  if (limit && limit > 0)
    return blogsList.slice(0, Math.max(limit, blogsList.length));

  return blogsList;
}
