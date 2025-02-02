// pages/api/createBlog.ts

import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

/**
 * Helper function to generate a slug from a title.
 * Converts to lower case, replaces spaces with hyphens, and removes non-alphanumeric characters.
 */
function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

export async function POST(req: Request) {
  const { title, content } = await req.json();
  if (!title || !content) {
    return Response.json(
      { message: "Missing required parameters." },
      { status: 400 }
    );
  }

  const slug = slugify(title);

  const date = new Date().toISOString();

  const fileContents = matter.stringify(content, { title, date, slug });

  const blogsDir = path.join(process.cwd(), "blogs");
  const filePath = path.join(blogsDir, `${slug}.md`);

  try {
    await fs.mkdir(blogsDir, { recursive: true });

    await fs.writeFile(filePath, fileContents, "utf8");

    return Response.json(
      { message: "Blog created successfully", slug },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error writing file:", error);
    return Response.json({ message: "Error writing file." }, { status: 500 });
  }
}
