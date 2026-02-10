"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CategoryBadge from "../blog/CategoryBadge";

export default function CategorySliderSection({ category, textColor }) {
  const posts = category.posts;
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % posts.length);
    }, 3000); // 5 saniye

    return () => clearInterval(interval);
  }, [posts.length]);

  if (!posts?.length) return null;

  const main = posts[index];
  const others = posts.filter((_, i) => i !== index).slice(0, 3);

  const prev = () => setIndex((i) => (i - 1 + posts.length) % posts.length);

  const next = () => setIndex((i) => (i + 1) % posts.length);

  return (
    <section className="mb-20">
      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className={`w-[90%] text-lg flex font-bold ${textColor.title}`}>
          {category.name}
          <div
            className="h-[2px] flex-1 mr-2 ml-2 self-center"
            style={{ borderColor: category.color, borderWidth: 2 }}
          />
        </h2>
        <Link
          href={`/kategori/${category.slug}`}
          className={`text-sm font-semibold ${textColor.all} hover:underline`}
        >
          Tümünü Gör →
        </Link>
      </div>

      {/* CONTENT */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* BIG */}
        <Link
          href={`/blog/${main.slug}`}
          className="
  group relative overflow-hidden rounded-3xl lg:col-span-2
  bg-[#F2F7F4]
  border-4 border-[#7FAF9A]
  transition
  hover:shadow-[0_12px_32px_rgba(34,197,94,0.45)]
"
        >
          <div className="relative h-[360px]">
            <Image
              src={main.cover_image}
              alt={main.title}
              fill
              className="object-cover transition group-hover:scale-105"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="mt-2 text-xl font-bold">{main.title}</h3>
          </div>
          <div className="absolute bottom-4  right-4 text-white">
            <CategoryBadge name={category.name} color={category.color} />
          </div>
        </Link>

        {/* RIGHT 3 */}
        <div className="grid gap-4">
          {others.map((p) => (
            <Link
              key={p.id}
              href={`/blog/${p.slug}`}
              className="
  flex gap-3 rounded-xl p-3
  bg-[#F2F7F4]
  border-4 border-[#7FAF9A]

  transition
  hover:shadow-[0_12px_32px_rgba(34,197,94,0.45)]
"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={p.cover_image}
                  alt={p.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className=" text-black h-full w-full flex flex-col justify-between">
                <h4 className="line-clamp-2 text-sm font-semibold">
                  {p.title}
                </h4>
                <div className="flex justify-between text-xs text-gray-500">
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
      </div>

      {/* CONTROLS */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={prev}
          className="rounded-full bg-gray-100 px-3 py-1 text-lg hover:bg-gray-200"
        >
          ‹
        </button>

        {posts.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`
      flex h-8 w-8 items-center justify-center
      rounded-full
      bg-gray-200
      text-sm font-semibold
      transition
      hover:bg-gray-300
      ${i === index ? textColor.all : "text-black"}
    `}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={next}
          className="rounded-full bg-gray-100 px-3 py-1 text-lg hover:bg-gray-200"
        >
          ›
        </button>
      </div>
    </section>
  );
}
