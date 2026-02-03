"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CategoryBadge from "../blog/CategoryBadge";

export default function CategorySliderSection({ category }) {
  const posts = category.posts;
  const [index, setIndex] = useState(0);

  if (!posts?.length) return null;

  const main = posts[index];
  const others = posts.filter((_, i) => i !== index).slice(0, 3);

  const prev = () => setIndex((i) => (i - 1 + posts.length) % posts.length);

  const next = () => setIndex((i) => (i + 1) % posts.length);

  return (
    <section className="mb-20">
      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">{category.name}</h2>
        <Link
          href={`/kategori/${category.slug}`}
          className="text-sm font-semibold text-emerald-600 hover:underline"
        >
          Tümünü Gör →
        </Link>
      </div>

      {/* CONTENT */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* BIG */}
        <Link
          href={`/blog/${main.slug}`}
          className="group relative overflow-hidden rounded-3xl shadow lg:col-span-2"
        >
          <div className="relative h-[360px]">
            <Image
              src={main.cover_image}
              alt={main.title}
              fill
              unoptimized
              className="object-cover transition group-hover:scale-105"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <CategoryBadge name={category.name} color={category.color} />
            <h3 className="mt-2 text-xl font-bold">{main.title}</h3>
          </div>
        </Link>

        {/* RIGHT 3 */}
        <div className="grid gap-4">
          {others.map((p) => (
            <Link
              key={p.id}
              href={`/blog/${p.slug}`}
              className="flex gap-3 rounded-xl bg-white p-3 shadow hover:shadow-md transition"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={p.cover_image}
                  alt={p.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>

              <h4 className="line-clamp-2 text-sm font-semibold">{p.title}</h4>
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
            className={`text-sm font-semibold ${
              i === index ? "text-emerald-600 underline" : "text-gray-400"
            }`}
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
