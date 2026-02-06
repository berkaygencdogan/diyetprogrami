"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CommentForm({
  blogId,
  parentId = null,
  onDone,
  onCancel, // 🆕
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    content: "",
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      setSuccess(false);
      onDone?.(); // ✅ 3 sn sonra kapat
    }, 3000);

    return () => clearTimeout(timer);
  }, [success, onDone]);

  const submit = async (e) => {
    e.preventDefault();

    const errs = {};
    if (!form.name.trim()) errs.name = "Ad zorunlu";
    if (!form.email.trim()) errs.email = "E-posta zorunlu";
    if (!form.content.trim()) errs.content = "Mesaj boş olamaz";

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setErrors({});

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
    setSuccess(true);
    setLoading(false);
  };

  return (
    <div className="rounded-2xl border bg-white p-4 shadow">
      <h4 className="mb-2 font-semibold">
        {parentId ? "Yanıt Yaz" : "Yorum Bırak"}
      </h4>

      {success ? (
        <div className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">
          ✅ {parentId ? "Yanıtınız" : "Yorumunuz"} gönderildi.
          <br />
          Onaylandıktan sonra yayınlanacaktır.
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-3">
          <input
            placeholder="Ad"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded border px-3 py-2 text-sm"
          />

          <input
            placeholder="E-posta"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded border px-3 py-2 text-sm"
          />

          <textarea
            rows={3}
            placeholder="Mesaj"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full rounded border px-3 py-2 text-sm"
          />

          <div className="flex gap-2">
            <button
              disabled={loading}
              className="rounded bg-emerald-600 px-4 py-2 text-sm text-white"
            >
              {loading ? "Gönderiliyor…" : "Gönder"}
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="rounded bg-gray-200 px-4 py-2 text-sm"
            >
              Vazgeç
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
