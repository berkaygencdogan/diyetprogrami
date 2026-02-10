"use client";

import React, { useEffect, useState } from "react";
import { fetchCategories } from "@/lib/api";
import { fetchBlogsByCategory } from "@/lib/blogApi";
import Link from "next/link";
import Image from "next/image";
import CategoryBadge from "../blog/CategoryBadge";
import CategorySliderSection from "./CategorySliderSection";
import { getTextColor } from "@/lib/textColor";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [textColor, setTextColor] = useState({});

  useEffect(() => {
    async function load() {
      const cats = await fetchCategories();
      const renk = await getTextColor();
      setTextColor(renk);
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
              <DietSection category={cat} textColor={textColor} />
              {/* <HorizontalAd /> */}
            </React.Fragment>
          );
        }

        if (layoutType === 1) {
          return (
            <React.Fragment key={cat.id}>
              <CategorySliderSection category={cat} textColor={textColor} />

              {/* <HorizontalAd /> */}
            </React.Fragment>
          );
        }

        return (
          <React.Fragment key={cat.id}>
            <CategorySliderSection category={cat} textColor={textColor} />

            {/* <HorizontalAd /> */}
          </React.Fragment>
        );
      })}
    </main>
  );
}

/* =======================
   🔥 DİYET – SLIDER
======================= */
function DietSection({ category, textColor }) {
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

  const prev = () => setIndex((i) => (i - 1 + posts.length) % posts.length);

  const next = () => setIndex((i) => (i + 1) % posts.length);

  return (
    <section className="mb-20">
      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between">
        <h2
          className={`w-[90%] text-lg flex text-xl font-bold ${textColor.title}`}
        >
          🔥 Diyet
          <div
            className="h-px flex-1 mr-2 ml-2 self-center"
            style={{ borderColor: category.color, borderWidth: 2 }}
          />
        </h2>
        <Link
          href={`/kategori/${category.slug}`}
          className={`text-sm font-semiboldhover:underline ${textColor.all}`}
        >
          Tümünü Gör →
        </Link>
      </div>

      {/* SLIDER */}
      <Link
        href={`/blog/${post.slug}`}
        className="
  group relative block h-[320px] overflow-hidden rounded-3xl shadow-lg
  bg-[#F2F7F4]
  border-4 border-[#7FAF9A]
  shadow-[0_8px_22px_rgba(34,197,94,0.35)]
  transition
  hover:shadow-[0_12px_32px_rgba(34,197,94,0.45)]
"
      >
        <Image
          src={post.cover_image}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 600px"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        {/* SOL OK */}
        <button
          onClick={(e) => {
            e.preventDefault();
            prev();
          }}
          className="absolute left-4 top-1/2 z-10
                     h-10 w-10 -translate-y-1/2
                     rounded-full bg-white text-black
                     hover:bg-green-500 transition"
        >
          ‹
        </button>

        {/* SAĞ OK */}
        <button
          onClick={(e) => {
            e.preventDefault();
            next();
          }}
          className="absolute right-4 top-1/2 z-10
                     h-10 w-10 -translate-y-1/2
                     rounded-full bg-white text-black
                     hover:bg-green-500 transition"
        >
          ›
        </button>

        {/* TEXT */}
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <h3 className="mt-2 text-2xl font-extrabold leading-tight">
            {post.title}
          </h3>
        </div>
        <div className="absolute bottom-6  right-6 text-white">
          <CategoryBadge
            name={post.category_name}
            color={post.category_color}
          />
        </div>
      </Link>

      {/* DOTS */}
      <div className="mt-4 flex justify-center gap-2">
        {posts.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Slayt ${i + 1}`}
            title={`Slayt ${i + 1}`}
            className={`h-2 w-2 rounded-full transition ${
              i === index ? "bg-green-500" : "bg-black"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
