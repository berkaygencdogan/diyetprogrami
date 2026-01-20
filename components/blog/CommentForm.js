"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CommentForm({ blogId, parentId = null, onDone }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await fetch(`${API_URL}/api/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        blog_id: blogId,
        parent_id: parentId,
        ...form,
      }),
    });

    setForm({ name: "", email: "", content: "" });
    setLoading(false);
    onDone?.();
  };

  return (
    <div
      className="
    mt-12
    rounded-3xl
    border border-gray-200
    bg-white/90
    p-6
    shadow-lg
    backdrop-blur
  "
    >
      <h3 className="mb-4 text-base font-semibold text-gray-900">
        {parentId ? "Yanıt Yaz" : "Yorum Bırak"}
      </h3>

      <form onSubmit={submit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Adınız"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="h-11 rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />

          <input
            type="email"
            placeholder="E-posta (gizli)"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="h-11 rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        <textarea
          placeholder="Yorumunuzu yazın…"
          required
          rows={4}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />

        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">
            Yorumunuz editör onayından sonra yayınlanır.
          </p>

          <button
            disabled={loading}
            className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
          >
            {loading ? "Gönderiliyor…" : "Gönder"}
          </button>
        </div>
      </form>
    </div>
  );
}
