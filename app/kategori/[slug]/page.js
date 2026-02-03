import { fetchBlogsByCategory } from "@/lib/blogApi";
import Image from "next/image";
import Link from "next/link";

export default async function CategoryDetailPage({ params }) {
  const { slug } = await params;

  const posts = await fetchBlogsByCategory(slug);

  if (!posts.length) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center text-gray-500">
        Bu kategoride henüz içerik yok.
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-8 text-2xl font-extrabold capitalize">
        📂 {posts[0]?.category_name}
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group rounded-2xl bg-white shadow hover:shadow-lg transition overflow-hidden"
          >
            <div className="relative h-48">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                unoptimized
                className="object-cover group-hover:scale-105 transition"
              />
            </div>

            <div className="p-4">
              <h3 className="line-clamp-2 font-semibold text-gray-900">
                {post.title}
              </h3>

              <p className="mt-2 text-xs text-gray-500">
                {new Date(post.created_at).toLocaleDateString("tr-TR")}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
