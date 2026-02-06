import Link from "next/link";
import { excerptFromHtml } from "@/lib/text";

export default function FeaturedPost({ post }) {
  const excerpt = excerptFromHtml(post.content, 120);

  return (
    <Link href={`/blog/${post.slug}`}>
      <article
        className="
  mt-6
  overflow-hidden
  rounded-3xl
  bg-gradient-to-br from-[#f6f3b0] to-[#efe48a]
  shadow-lg
  transition
  hover:-translate-y-1
  hover:shadow-xl
  md:flex
"
      >
        {/* IMAGE */}
        <div className="relative h-64 md:h-auto md:w-1/2">
          {post.cover_image && (
            <img
              src={post.cover_image}
              alt={post.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          )}
        </div>

        {/* CONTENT */}
        <div className="flex flex-col justify-between p-6 md:w-1/2">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{post.title}</h2>

            <p className="mt-3 text-gray-700 leading-relaxed">{excerpt}</p>
          </div>
          <div className="w-full flex justify-between">
            <span
              className="
  mt-6
  inline-flex
  items-center
  gap-1
  text-sm
  font-semibold
  text-emerald-700
"
            >
              Devamını Oku →
            </span>
            {post.category_name && (
              <span
                className="text-xs font-semibold flex justify-center items-center text-center text-white px-3 py-1 rounded-full"
                style={{
                  backgroundColor: `${post.category_color}`,
                }}
              >
                {post.category_name}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
