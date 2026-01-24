"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchLatestBlogs } from "@/lib/blogApi";

export default function FeaturedPostsSlider() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchLatestBlogs().then(setPosts).catch(console.error);
  }, []);

  if (!posts.length) return null;

  return (
    <section className="mx-auto mt-20 max-w-7xl px-4">
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">
          📰 Son Eklenen Yazılar
        </h2>

        <Link
          href="/blog"
          className="text-sm font-semibold text-emerald-600 hover:underline"
        >
          Tüm Yazılar →
        </Link>
      </div>

      {/* GRID */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group overflow-hidden rounded-2xl bg-white shadow transition hover:shadow-lg"
          >
            {/* IMAGE */}
            <div className="relative h-40 w-full">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                unoptimized
                className="object-cover transition group-hover:scale-105"
              />

              <span className="absolute left-2 top-2 rounded-full bg-black/70 px-2 py-0.5 text-xs font-semibold text-white">
                {post.parent_name || post.category_name}
              </span>
            </div>

            {/* CONTENT */}
            <div className="p-3">
              <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
                {post.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
