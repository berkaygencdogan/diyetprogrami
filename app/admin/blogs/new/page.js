"use client";

import { useEffect, useState } from "react";
import { createBlog } from "@/lib/adminBlogApi";
import dynamic from "next/dynamic";
import TagSelector from "@/components/admin/TagSelector";

const Editor = dynamic(() => import("@/components/admin/Editor"), {
  ssr: false,
});

export default function NewBlogPage() {
  const [form, setForm] = useState({
    title: "",
    cover_image: "",
    content: "",
    category_id: "",
  });
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tags`)
      .then((r) => r.json())
      .then(setTags);
  }, []);

  useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`)
      .then((r) => r.json())
      .then(setCategories);
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Yetkisiz işlem");
      return;
    }

    await createBlog(token, {
      ...form,
      tags: selectedTags,
    });
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
          required
        />

        <input
          placeholder="Kapak Görsel URL"
          className="w-full rounded-xl border p-3"
          value={form.cover_image}
          onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
        />

        {/* ✅ KATEGORİ – DB */}
        <select
          className="w-full rounded-xl border p-3"
          value={form.category_id}
          onChange={(e) => setForm({ ...form, category_id: e.target.value })}
          required
        >
          <option value="">Kategori Seç</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <TagSelector
          allTags={tags}
          value={selectedTags}
          onChange={setSelectedTags}
          onCreate={async (name) => {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/tags`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name }),
              },
            );
            const tag = await res.json();
            setTags((prev) => [...prev, tag]);
            return tag;
          }}
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
