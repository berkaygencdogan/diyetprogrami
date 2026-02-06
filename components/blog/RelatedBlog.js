"use client";

import Link from "next/link";
import { useMemo } from "react";

export default function RelatedBlogs({ blogs, benzer }) {
  const benzerMap = useMemo(() => {
    const map = {};
    (benzer || []).forEach((b) => {
      map[b.id] = {
        name: b.category_name,
        color: b.category_color,
      };
    });
    return map;
  }, [benzer]);
  if (!blogs?.length) return null;

  return (
    <div
      className="
        rounded-3xl bg-white/80 backdrop-blur-xl p-6
        border border-gray-100
        shadow-[0_20px_60px_-20px_rgba(0,0,0,0.15)]
      "
    >
      {/* HEADER */}
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
          🧩
        </span>

        <div className="w-full">
          <h3 className="text-base font-semibold text-gray-800">
            Benzer Yazılar
          </h3>
          <div className="mt-1 h-px w-full border-2 border-indigo-400" />
        </div>
      </div>

      <ul className="space-y-3">
        {blogs.map((b) => {
          const kategori = benzerMap[b.id];

          return (
            <li key={b.id}>
              <Link
                href={`/blog/${b.slug}`}
                className="
                  group block rounded-2xl border-2 border-indigo-400
                  px-4 py-3 text-sm
                  transition-all duration-200
                  hover:-translate-y-0.5
                  hover:bg-indigo-50
                  hover:shadow-md
                "
              >
                {/* TITLE */}
                <span className="block line-clamp-2 font-medium text-gray-700">
                  {b.title}
                </span>

                {/* FOOTER */}
                <div className="mt-2 flex items-center justify-between">
                  <span
                    className="
                      flex items-center gap-1 text-xs
                      text-indigo-600 opacity-0
                      transition group-hover:opacity-100
                    "
                  >
                    Yazıyı oku
                    <span className="translate-x-[-2px] transition group-hover:translate-x-0">
                      →
                    </span>
                  </span>

                  {kategori && (
                    <span
                      className="rounded-full px-3 py-0.5 text-xs font-semibold text-white"
                      style={{
                        backgroundColor: kategori.color,
                        boxShadow: `0 6px 18px ${kategori.color}66`,
                      }}
                    >
                      {kategori.name}
                    </span>
                  )}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
