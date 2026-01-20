import Link from "next/link";
import { excerptFromHtml } from "@/lib/text";

export default function BlogGridCard({ post }) {
  console.log("sad", post);
  const excerpt = excerptFromHtml(post.content, 28);

  return (
    <Link href={`/blog/${post.slug}`}>
      <article
        className="
  group
  overflow-hidden
  rounded-2xl
  bg-white/95
  backdrop-blur
  shadow-md
  transition
  hover:-translate-y-1
  hover:shadow-xl
"
      >
        <div className="relative h-52">
          {post.cover_image && (
            <img
              src={post.cover_image}
              alt={post.title}
              className="h-full w-full object-cover transition group-hover:scale-105"
              loading="lazy"
            />
          )}
        </div>

        <div className="p-5">
          {/* BAŞLIK */}
          <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>

          {/* ÖZET */}
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            {excerpt}
          </p>

          {/* READ MORE */}
          <span className="mt-3 inline-block text-sm font-medium text-emerald-600 group-hover:underline">
            Devamını oku →
          </span>
        </div>
      </article>
    </Link>
  );
}
