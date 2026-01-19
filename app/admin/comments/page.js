"use client";

import { useEffect, useState } from "react";
import { fetchAllComments, updateComment } from "@/lib/adminApi";

export default function AdminCommentsPage() {
  const [comments, setComments] = useState([]);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (token) fetchAllComments(token).then(setComments);
  }, [token]);

  const act = async (id, status, text) => {
    await updateComment(token, id, {
      status,
      content: text,
    });

    // ✅ sadece pending olanlar kalsın
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold">Yorum Moderasyonu</h1>

      <div className="mt-6 space-y-4">
        {comments.map((c) => (
          <div key={c.id} className="rounded-2xl border bg-white p-4 shadow">
            <div className="text-sm text-gray-500">
              <b>{c.name}</b> • {c.blog_title} • {c.status}
            </div>

            <textarea
              defaultValue={c.content}
              className="mt-2 w-full rounded-xl border p-3"
              rows={3}
              onBlur={(e) => (c._edit = e.target.value)}
            />

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => act(c.id, "approved", c._edit ?? c.content)}
                className="rounded-lg bg-emerald-600 px-3 py-2 text-sm text-white"
              >
                Onayla
              </button>
              <button
                onClick={() => act(c.id, "rejected", c._edit ?? c.content)}
                className="rounded-lg bg-gray-200 px-3 py-2 text-sm"
              >
                Reddet
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
