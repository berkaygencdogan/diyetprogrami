"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchCategories } from "@/lib/api";
import CategoryBadge from "./CategoryBadge";
import { getTextColor } from "@/lib/textColor";

export default function PopularBlogs() {
  const [posts, setPosts] = useState([]);
  const [color, setColor] = useState("white");
  const [textColor, setTextColor] = useState({});

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/popular`)
      .then((r) => r.json())
      .then(setPosts);

    async function load() {
      const cats = await fetchCategories();
      setColor(cats[4].color);
      const renk = await getTextColor();
      setTextColor(renk);
    }

    load();
  }, []);

  if (!posts.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-4">
      <h2 className={`mb-6 flex text-xl font-bold ${textColor.title}`}>
        🔥 En Çok Okunanlar
        <div
          className="ml-2 mr-2 h-px flex-1 self-center"
          style={{ borderWidth: 2, borderColor: color }}
        />
      </h2>

      <div className="grid gap-4 md:grid-cols-5">
        {posts.map((p) => (
          <Link
            key={p.id}
            href={`/blog/${p.slug}`}
            className="
              group flex h-full flex-col
              overflow-hidden rounded-2xl
              bg-[#F2F7F4]
              border-4 border-[#7FAF9A]
              transition
              
            "
          >
            {/* IMAGE */}
            <div className="relative h-32 w-full overflow-hidden">
              <Image
                src={p.cover_image}
                alt={p.title}
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 300px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* CONTENT */}
            <div className="flex flex-1 flex-col p-4">
              <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
                {p.title}
              </h3>

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
