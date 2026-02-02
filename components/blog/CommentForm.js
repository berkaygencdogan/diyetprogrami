"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CommentForm({ blogId, parentId = null, onDone }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    content: "",
  });
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      setSuccess(false);
    }, 3000); // 3 saniye

    return () => clearTimeout(timer);
  }, [success]);

  const submit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Ad alanı zorunludur";
    }

    if (!form.email.trim()) {
      newErrors.email = "E-posta alanı zorunludur";
    }

    if (!form.content.trim()) {
      newErrors.content = "Yorum alanı boş bırakılamaz";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    const res = await fetch(`${API_URL}/api/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        blog_id: blogId,
        parent_id: parentId,
        ...form,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setLoading(false);
      throw new Error(data.error || "Bir hata oluştu");
    }

    setSuccess(true);
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
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={`h-11 rounded-xl border px-4 text-sm outline-none
    ${
      errors.name
        ? "border-red-400 focus:ring-red-100"
        : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-100"
    }`}
          />

          {errors.name && (
            <p className="mt-1 text-xs text-red-600">{errors.name}</p>
          )}

          <input
            type="email"
            placeholder="E-posta (gizli)"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={`h-11 rounded-xl border px-4 text-sm outline-none
    ${
      errors.email
        ? "border-red-400 focus:ring-red-100"
        : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-100"
    }`}
          />

          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email}</p>
          )}
        </div>

        <textarea
          rows={4}
          placeholder="Yorumunuzu yazın…"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className={`w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none
    ${
      errors.content
        ? "border-red-400 focus:ring-red-100"
        : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-100"
    }`}
        />

        {errors.content && (
          <p className="mt-1 text-xs text-red-600">{errors.content}</p>
        )}

        <div className="flex items-center justify-between">
          {success ? (
            <p className="mb-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">
              ✅ Yorumunuz gönderildi. Onaylandıktan sonra yayınlanacaktır.
            </p>
          ) : (
            <p className="text-xs text-gray-500">
              Yorumunuz editör onayından sonra yayınlanır.
            </p>
          )}

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
