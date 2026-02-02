"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function PopularBlogs() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/popular`)
      .then((r) => r.json())
      .then(setPosts);
  }, []);

  if (!posts.length) return null;

  return (
    <section className="mx-auto mt-20 max-w-7xl px-4">
      <h2 className="mb-6 text-xl font-bold">🔥 En Çok Okunanlar</h2>

      <div className="grid gap-4 md:grid-cols-5">
        {posts.map((p) => (
          <Link
            key={p.id}
            href={`/blog/${p.slug}`}
            className="rounded-xl bg-white p-4 shadow hover:shadow-lg transition"
          >
            <Image
              src={p.cover_image}
              alt={p.title}
              unoptimized
              width={400}
              height={250}
              className="mb-3 h-32 w-full rounded-lg object-cover"
            />
            <h3 className="text-sm font-semibold line-clamp-2">{p.title}</h3>
            <div className="mt-2 text-xs text-gray-500">
              👁️ {p.views} okunma
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
