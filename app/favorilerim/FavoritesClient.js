"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getGuestId } from "@/lib/guest";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function FavoritesClient() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const guestId = getGuestId();

    let url = `${API}/api/favorites/me`;
    const headers = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    } else {
      url += `?guest_id=${guestId}`;
    }

    fetch(url, { headers })
      .then((r) => r.json())
      .then(setBlogs)
      .catch(() => setError("Favoriler yüklenemedi"));
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-8 text-2xl font-bold flex items-center gap-2">
        ❤️ Favorilerim
      </h1>

      {error && (
        <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {!blogs.length && !error && (
        <div className="rounded-2xl bg-gray-50 p-10 text-center text-gray-500">
          Henüz favorilere eklenmiş bir yazın yok.
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {blogs.map((b) => (
          <Link
            key={b.id}
            href={`/blog/${b.slug}`}
            className="group overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative h-44 w-full overflow-hidden">
              {b.cover_image ? (
                <img
                  src={b.cover_image}
                  alt={b.title}
                  className="h-full w-full object-cover transition group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gray-100 text-gray-400 text-sm">
                  Görsel yok
                </div>
              )}
            </div>

            <div className="p-5">
              <h3 className="line-clamp-2 text-base font-semibold text-gray-900">
                {b.title}
              </h3>

              <span className="mt-3 inline-block text-sm font-medium text-emerald-600 group-hover:underline">
                Yazıya git →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
