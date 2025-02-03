import Image from "next/image";
import ScrambleText from "@/components/ScrambleText";
import { getBlogsList } from "@/utils/blogsList";

export default function Home() {
  const blogs = getBlogsList(4);
  return (
    <>
      <section className="mb-12 py-5 text-center lg:py-16">
        <h1 className="font-handwriting mb-3 text-4xl leading-loose font-extrabold md:text-6xl">
          Welcome to My Blog
        </h1>
        <ScrambleText
          content={
            "Discover insightful articles, tips, and stories on various topics."
          }
          classes={["font-code", "text-lg"]}
        />
        <p className="font-code text-lg"></p>
      </section>

      {/* Blog Categories */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">Categories</h2>
        <div className="flex flex-wrap gap-3">
          {["Technology", "Lifestyle", "Health", "Travel", "Business"].map(
            (category) => (
              <button
                key={category}
                className="cursor-pointer rounded-full px-4 py-2 transition-all duration-500 hover:bg-gray-300/60"
              >
                {category}
              </button>
            )
          )}
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Latest Posts</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <article
              key={blog.slug}
              className="overflow-hidden rounded-lg bg-teal-50 shadow-md transition hover:shadow-lg dark:bg-zinc-800 dark:text-teal-50"
            >
              <Image
                src={`https://placehold.co/700x500`}
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
          ))}
        </div>
      </section>
    </>
  );
}
