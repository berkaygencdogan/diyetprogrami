"use client";

import { useEffect, useState } from "react";
import { fetchBlogsAdmin } from "@/lib/adminBlogApi";
import Link from "next/link";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (token) fetchBlogsAdmin(token).then(setBlogs);
  }, [token]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Blog Yazıları</h1>
        <Link
          href="/admin/blogs/new"
          className="rounded-xl bg-emerald-600 px-4 py-2 text-white"
        >
          Yeni Yazı
        </Link>
      </div>

      <div className="space-y-3">
        {blogs.map((b) => (
          <div
            key={b.id}
            className="flex items-center justify-between rounded-xl border bg-white p-4"
          >
            <div>
              <div className="font-semibold">{b.title}</div>
              <div className="text-sm text-gray-500">{b.slug}</div>
            </div>
            <Link
              href={`/admin/blogs/edit/${b.id}`}
              className="text-sm text-emerald-600"
            >
              Düzenle
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
