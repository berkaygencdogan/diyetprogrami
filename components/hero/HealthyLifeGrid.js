import Image from "next/image";
import Link from "next/link";

export default function HealthyLifeGrid({ posts }) {
  if (!posts?.length) return null;

  return (
    <section className="mb-20">
      <h2 className="mb-6 text-lg font-bold">🌿 Sağlıklı Yaşam</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className={`group relative overflow-hidden rounded-3xl ${
              i === 0 ? "md:col-span-2 md:row-span-2 h-[420px]" : "h-[200px]"
            }`}
          >
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              unoptimized
              className="object-cover transition group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h3 className="text-lg font-bold leading-tight line-clamp-2">
                {post.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
