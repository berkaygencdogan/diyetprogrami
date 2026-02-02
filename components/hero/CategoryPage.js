"use client";

import React, { useEffect, useState } from "react";
import { fetchCategories } from "@/lib/api";
import { fetchBlogsByCategory } from "@/lib/blogApi";
import Link from "next/link";
import Image from "next/image";
import HorizontalAd from "../ads/HorizontalAd";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function load() {
      const cats = await fetchCategories();

      const withPosts = await Promise.all(
        cats.map(async (cat) => {
          const posts = await fetchBlogsByCategory(cat.slug);
          return { ...cat, posts };
        }),
      );

      setCategories(withPosts);
    }

    load();
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      {categories.map((cat, index) => {
        if (!cat.posts?.length) return null;

        const layoutType = index % 3;

        if (layoutType === 0) {
          return (
            <React.Fragment key={cat.id}>
              <DietSection category={cat} />
              <HorizontalAd />
            </React.Fragment>
          );
        }

        if (layoutType === 1) {
          return (
            <React.Fragment key={cat.id}>
              <CategorySection category={cat} />
              <HorizontalAd />
            </React.Fragment>
          );
        }

        return (
          <React.Fragment key={cat.id}>
            <HealthyLifeSection category={cat} />
            <HorizontalAd />
          </React.Fragment>
        );
      })}
    </main>
  );
}

/* =======================
   🔥 DİYET – SLIDER
======================= */
function DietSection({ category }) {
  const posts = category.posts;
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
      <div className="mb-4 flex items-center justify-between">
        <h2 className="mb-4 text-lg font-bold">🔥 Diyet</h2>
        <Link
          href={`/kategori/${category.slug}`}
          className="text-sm font-semibold text-emerald-600 hover:underline"
        >
          Tümünü Gör →
        </Link>
      </div>

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
      <div className="mt-3 flex gap-2 justify-center">
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

/* =======================
   🥗 BESLENME – CLASSIC
======================= */
function CategorySection({ category }) {
  const [main, ...others] = category.posts;

  return (
    <section className="mb-16">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">{category.name}</h2>
        <Link
          href={`/kategori/${category.slug}`}
          className="text-sm font-semibold text-emerald-600 hover:underline"
        >
          Tümünü Gör →
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* BIG */}
        <Link
          href={`/blog/${main.slug}`}
          className="group relative overflow-hidden rounded-2xl shadow lg:col-span-2"
        >
          <div className="relative h-64">
            <Image
              src={main.cover_image}
              alt={main.title}
              fill
              unoptimized
              className="object-cover transition group-hover:scale-105"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="inline-block rounded bg-emerald-600 px-2 py-0.5 text-xs font-semibold">
              {category.name}
            </span>
            <h3 className="mt-1 text-lg font-bold">{main.title}</h3>
          </div>
        </Link>

        {/* SMALL */}
        <div className="grid gap-4">
          {others.slice(0, 3).map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="flex gap-3 rounded-xl bg-white p-3 shadow hover:shadow-md transition"
            >
              <div className="relative h-20 w-20 overflow-hidden rounded-lg">
                <Image
                  src={post.cover_image}
                  alt={post.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>

              <h4 className="line-clamp-2 text-sm font-semibold">
                {post.title}
              </h4>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =======================
   🌿 SAĞLIKLI YAŞAM – GRID
======================= */
function HealthyLifeSection({ category }) {
  const posts = category.posts;

  return (
    <section className="mb-20">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">🌿 {category.name}</h2>
        <Link
          href={`/kategori/${category.slug}`}
          className="text-sm font-semibold text-emerald-600 hover:underline"
        >
          Tümünü Gör →
        </Link>
      </div>

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
              <h3 className="text-lg font-bold line-clamp-2">{post.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
