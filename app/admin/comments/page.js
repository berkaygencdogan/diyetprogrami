"use client";

import { useEffect, useState } from "react";
import { fetchAllComments, updateComment } from "@/lib/adminApi";

export default function AdminCommentsPage() {
  const [comments, setComments] = useState([]);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const load = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setComments(data);
  };

  useEffect(() => {
    load();
  }, []);

  const toggleHome = async (id, value) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/${id}/home`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ home: value }),
    });
    load();
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">Yorumlar</h1>

      <div className="space-y-4">
        {comments.map((c) => (
          <div
            key={c.id}
            className="rounded-xl border p-4 flex justify-between items-start"
          >
            <div>
              <div className="text-sm font-semibold">{c.email}</div>
              <div className="text-sm text-gray-600 mt-1">{c.content}</div>
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={c.home === 1}
                onChange={(e) => toggleHome(c.id, e.target.checked ? 1 : 0)}
              />
              Anasayfa
            </label>
          </div>
        ))}
      </div>
    </main>
  );
}
