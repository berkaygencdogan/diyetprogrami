"use client";

import { useState } from "react";
import { createBlog } from "@/lib/adminBlogApi";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/admin/Editor"), {
  ssr: false,
});

export default function NewBlogPage() {
  const [form, setForm] = useState({
    title: "",
    cover_image: "",
    content: "",
  });

  const [token] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("token") : null,
  );

  const submit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Yetkisiz işlem");
      return;
    }

    await createBlog(token, form);
    alert("Yazı eklendi");
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">Yeni Blog Yazısı</h1>

      <form onSubmit={submit} className="space-y-4">
        <input
          placeholder="Başlık"
          className="w-full rounded-xl border p-3"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Kapak Görsel URL"
          className="w-full rounded-xl border p-3"
          value={form.cover_image}
          onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
        />

        <Editor
          value={form.content}
          onChange={(html) => setForm({ ...form, content: html })}
        />

        <button className="rounded-xl bg-emerald-600 px-6 py-3 text-white">
          Kaydet
        </button>
      </form>
    </main>
  );
}
