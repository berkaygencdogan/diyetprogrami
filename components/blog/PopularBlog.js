"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchCategories } from "@/lib/api";
import CategoryBadge from "./CategoryBadge";

export default function PopularBlogs() {
  const [posts, setPosts] = useState([]);
  const [color, setColor] = useState("white");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/popular`)
      .then((r) => r.json())
      .then(setPosts);

    async function load() {
      const cats = await fetchCategories();
      setColor(cats[4].color);
    }

    load();
  }, []);

  if (!posts.length) return null;

  return (
    <section className="mx-auto mt-20 max-w-7xl px-4">
      <h2 className="mb-6 text-xl flex font-bold text-white ">
        🔥 En Çok Okunanlar
        <div
          className="h-px flex-1 mr-2 ml-2 self-center"
          style={{ borderWidth: 2, borderColor: color }}
        />
      </h2>

      <div className="grid gap-4 md:grid-cols-5">
        {posts.map((p) => (
          <Link
            key={p.id}
            href={`/blog/${p.slug}`}
            className="
        group flex flex-col h-full
        overflow-hidden rounded-2xl
        bg-[#F2F7F4]
        border-4 border-green-400
        transition
        hover:shadow-[0_10px_28px_rgba(127,175,154,0.35)]
      "
          >
            {/* IMAGE */}
            <div className="relative h-32 w-full overflow-hidden">
              <Image
                src={p.cover_image}
                alt={p.title}
                fill
                unoptimized
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* CONTENT */}
            <div className="flex flex-col flex-1 p-4">
              {/* TITLE */}
              <h3 className="text-sm font-semibold line-clamp-2 text-gray-900">
                {p.title}
              </h3>

              {/* FOOTER – HER ZAMAN EN ALTA */}
              <div className="mt-auto flex items-center justify-between pt-3 text-xs text-gray-500">
                <span>👁️ {p.views} okunma</span>

                <CategoryBadge
                  name={p.category_name}
                  color={p.category_color}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
