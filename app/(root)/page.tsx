import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="mb-12 py-5 text-center lg:py-16">
        <h1 className="font-handwriting mb-3 text-4xl leading-loose font-extrabold md:text-6xl">
          Welcome to My Blog
        </h1>
        <p className="font-code text-lg">
          Discover insightful articles, tips, and stories on various topics.
        </p>
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
          {[1, 2, 3, 4, 5, 6].map((post) => (
            <article
              key={post}
              className="overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-lg"
            >
              <Image
                src={`https://placehold.co/700x500`}
                width={700}
                height={500}
                alt="Blog Post"
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="mb-2 text-lg font-bold">
                  Blog Post Title {post}
                </h3>
                <p className="text-sm text-gray-600">
                  This is a short description of the blog post content. Click to
                  read more...
                </p>
                <a
                  href="#"
                  className="mt-2 inline-block font-semibold text-blue-500"
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
