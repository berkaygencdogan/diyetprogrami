import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ post }) {
  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative h-52 w-full overflow-hidden">
          {post.cover_image && (
            <img
              src={post.cover_image}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        <div className="p-5">
          <time className="text-xs text-gray-500">{post.date}</time>

          <h2 className="mt-2 text-lg font-semibold text-gray-900">
            {post.title}
          </h2>

          <p className="mt-2 text-sm text-gray-600">{post.excerpt}</p>

          <span className="mt-4 inline-block text-sm font-medium text-emerald-600">
            Devamını oku →
          </span>
        </div>
      </Link>
    </article>
  );
}
