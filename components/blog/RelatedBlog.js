"use client";

import Link from "next/link";
import Image from "next/image";

export default function RelatedBlogs({ post }) {
  return (
    <section className="space-y-4">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50">
          🧩
        </span>

        <div className="w-full">
          <h3 className="text-base font-semibold text-gray-800">
            🔥 En Çok Okunanlar
          </h3>
          <div className="mt-1 h-px w-full border-2 border-[#bb00ff]" />
        </div>
      </div>

      <div className="space-y-4">
        {post.map((p) => (
          <Link
            key={p.id}
            href={`/blog/${p.slug}`}
            className="
              group flex items-center gap-4
              rounded-2xl bg-gray-50
              p-3 transition
              hover:bg-gray-100
            "
          >
            {/* LEFT IMAGES */}
            <div className="flex h-20 w-28 overflow-hidden rounded-xl">
              <div className="relative h-full w-full">
                <Image
                  src={p.cover_image}
                  alt={p.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* RIGHT TEXT */}
            <div className="flex-1">
              <h3 className="line-clamp-3 text-base font-semibold text-gray-900 group-hover:underline">
                {p.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
