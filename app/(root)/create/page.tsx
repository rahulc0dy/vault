"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import MarkdownEditor from "@uiw/react-markdown-editor";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Send the blog data to the API route
    const res = await fetch("/api/create-blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage(`Blog created successfully! Slug: ${data.slug}`);
      setTitle("");
      setContent("");
      console.log(message);
      // Redirect to the newly created blog page
      router.push(`/blogs/${data.slug}`);
    } else {
      setMessage(`Error: ${data.error}`);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-7xl flex-col gap-5"
    >
      <label htmlFor="title">
        <span className="text-lg font-bold">Title</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full rounded-lg border-2 border-teal-100 p-2 dark:border-teal-950"
        />
      </label>
      <label htmlFor="content" className="text-lg font-bold">
        Content
      </label>
      <MarkdownEditor
        width="auto"
        height="800px"
        value={content}
        onChange={setContent}
        enablePreview={true}
      />

      <input
        type="submit"
        value="Create"
        className="w-full cursor-pointer rounded-lg bg-teal-700 px-3 py-2 text-teal-50 dark:bg-teal-50 dark:text-teal-950"
      />
    </form>
  );
}
