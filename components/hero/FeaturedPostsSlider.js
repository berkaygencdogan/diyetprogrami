"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchLatestBlogs } from "@/lib/blogApi";
import CategoryBadge from "../blog/CategoryBadge";
import { fetchCategories } from "@/lib/api";

export default function FeaturedPostsSlider() {
  const [posts, setPosts] = useState([]);
  const [color, setColor] = useState("white");
  useEffect(() => {
    fetchLatestBlogs().then(setPosts).catch(console.error);
    async function load() {
      const cats = await fetchCategories();
      setColor(cats[3].color);
    }

    load();
  }, []);

  if (!posts.length) return null;

  return (
    <section className="mx-auto mt-20 max-w-7xl px-4">
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">📰 Son Eklenen Yazılar</h2>
        <div
          className="h-px flex-1 mr-2 ml-2"
          style={{ borderWidth: 2, borderColor: color }}
        />
        <Link
          href="/blog"
          className="text-sm font-semibold text-white hover:underline"
        >
          Tüm Yazılar →
        </Link>
      </div>

      {/* GRID */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 h-60">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="
      group flex flex-col h-full
      overflow-hidden rounded-2xl
      bg-[#F2F7F4]
      border-4 border-green-400
      shadow-green-400
      transition
      hover:shadow-[0_10px_28px_rgba(127,175,154,0.35)]
    "
          >
            {/* IMAGE */}
            <div className="relative h-70 w-full">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                unoptimized
                className="object-cover transition group-hover:scale-105"
              />
            </div>

            {/* CONTENT */}
            <div className="flex flex-col h-full p-3">
              {/* TITLE */}
              <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
                {post.title}
              </h3>

              {/* FOOTER – HER ZAMAN ALTA SABİT */}
              <div className="mt-auto flex items-center justify-between pt-3 text-xs text-gray-500">
                <span>👁️ {post.views} okunma</span>

                <CategoryBadge
                  name={post.category_name}
                  color={post.category_color}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
