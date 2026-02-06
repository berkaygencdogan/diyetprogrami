import Link from "next/link";
import { excerptFromHtml } from "@/lib/text";
import { calculateReadingTime } from "@/lib/readingTime";

export default function BlogGridCard({ post }) {
  const excerpt = excerptFromHtml(post.content, 28);
  const readingTime = calculateReadingTime(post.content);

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
        {/* COVER */}
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

          {/* META */}
          <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
            <span>⏱ {readingTime} dk okuma</span>
            <span>👁️ {post.views} okunma</span>
            {post.created_at && (
              <>
                <span>•</span>
                <span>
                  {new Date(post.created_at).toLocaleDateString("tr-TR")}
                </span>
              </>
            )}
          </div>

          {/* ÖZET */}
          <p className="mt-3 text-sm text-gray-600 leading-relaxed">
            {excerpt}
          </p>

          <div className="w-full flex justify-between self-end">
            <span className="mt-3 inline-block text-sm font-medium text-emerald-600 group-hover:underline">
              Devamını oku →
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
