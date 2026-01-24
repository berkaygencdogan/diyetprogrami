"use client";

import { useEffect, useState } from "react";

export default function HomeComments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/home`)
      .then((r) => r.json())
      .then(setComments);
  }, []);

  if (!comments.length) return null;

  return (
    <section className="mx-auto mt-20 max-w-7xl px-4">
      {/* DIŞ KUTU */}
      <div className="rounded-[32px] bg-emerald-50/60 px-6 py-10 md:px-12">
        <h2 className="mb-10 text-center text-2xl font-bold text-gray-900">
          💬 Kullanıcı Yorumları
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {comments.map((c) => (
            <div
              key={c.id}
              className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-lg transition"
            >
              <p className="text-sm text-gray-700 leading-relaxed">
                “{c.content}”
              </p>

              <div className="mt-4 text-xs font-semibold text-emerald-600">
                {c.email}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
