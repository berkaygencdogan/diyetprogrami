import Image from "next/image";
import Link from "next/link";

export default function CategorySection({ title, slug, posts }) {
  if (!posts || posts.length === 0) return null;

  const [main, ...others] = posts;

  return (
    <section className="mb-16">
      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        <Link
          href={`/kategori/${slug}`}
          className="text-sm font-semibold text-emerald-600 hover:underline"
        >
          Tümünü Gör →
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* BIG CARD */}
        <Link
          href={`/blog/${main.slug}`}
          className="group relative overflow-hidden rounded-2xl shadow lg:col-span-2"
        >
          <div className="relative h-64 w-full">
            <Image
              src={main.cover_image}
              alt={main.title}
              fill
              unoptimized
              className="object-cover transition group-hover:scale-105"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="mb-1 inline-block rounded bg-emerald-600 px-2 py-0.5 text-xs font-semibold">
              {title}
            </span>
            <h3 className="mt-1 text-lg font-bold leading-tight">
              {main.title}
            </h3>
          </div>
        </Link>

        {/* SMALL CARDS */}
        <div className="grid gap-4">
          {others.slice(0, 3).map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="flex gap-3 rounded-xl bg-white p-3 shadow hover:shadow-md transition"
            >
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={post.cover_image}
                  alt={post.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>

              <div>
                <h4 className="line-clamp-2 text-sm font-semibold text-gray-900">
                  {post.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
