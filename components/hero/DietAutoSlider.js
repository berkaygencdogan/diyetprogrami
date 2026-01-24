"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DietAutoSlider({ posts }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!posts?.length) return;

    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % posts.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [posts]);

  if (!posts?.length) return null;

  const post = posts[index];

  return (
    <section className="mb-20">
      <h2 className="mb-4 text-lg font-bold">🔥 Diyet</h2>

      <Link
        href={`/blog/${post.slug}`}
        className="group relative block h-[320px] overflow-hidden rounded-3xl shadow-lg"
      >
        <Image
          src={post.cover_image}
          alt={post.title}
          fill
          className="object-cover"
          unoptimized
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute bottom-6 left-6 right-6 text-white">
          <span className="mb-2 inline-block rounded bg-emerald-600 px-3 py-1 text-xs font-semibold">
            Diyet
          </span>
          <h3 className="text-2xl font-extrabold leading-tight">
            {post.title}
          </h3>
        </div>
      </Link>

      {/* DOTS */}
      <div className="mt-3 flex gap-2">
        {posts.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full ${
              i === index ? "bg-emerald-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
