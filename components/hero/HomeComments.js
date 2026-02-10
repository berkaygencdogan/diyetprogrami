"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ExpandableText from "../blog/ExpandableText";

export default function HomeComments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/home`)
      .then((r) => r.json())
      .then(setComments);
  }, []);

  if (!comments.length) return null;

  return (
    <section className="mx-auto mt-24 max-w-7xl px-4">
      <div
        className="
    rounded-[36px]
    bg-gradient-to-br from-[#F2F7F4] via-white to-[#E6F2EC]
    border-3 border-[#7FAF9A]
    px-6 py-14 md:px-12
  "
      >
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
          💬 Kullanıcı Deneyimleri
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {comments.map((c) => {
            const tagList = c.tags ? c.tags.split(",") : [];

            return (
              <div
                key={c.comment_id}
                className="
  group relative rounded-3xl
  bg-[#F2F7F4]
  border-2 border-[#7FAF9A]
  p-7
  shadow-[0_6px_20px_rgba(127,175,154,0.25)]
  transition-all
  hover:-translate-y-1
  hover:shadow-[0_10px_30px_rgba(127,175,154,0.4)]
"
              >
                {/* BLOG META */}
                <Link
                  href={`/blog/${c.slug}`}
                  className="mb-4 block text-sm font-semibold text-emerald-600 hover:underline"
                >
                  📄 {c.title}
                </Link>
                {/* YORUM */}
                <ExpandableText text={c.comment_content} limit={140} />
                {/* ETİKETLER */}
                {tagList.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tagList.map((tag, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-emerald-50 px-3 py-1 text-xs
                          font-medium text-emerald-700"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                {/* FOOTER */}
                <div className="mt-6 flex items-center justify-between text-xs text-gray-500">
                  <span className="font-semibold text-emerald-600">
                    {c.comment_name}
                  </span>

                  <div className="flex items-center gap-3">
                    <span>👁️ {c.views}</span>
                    <span>💬 {c.comment_count}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
