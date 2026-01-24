"use client";

import { use, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { fetchBlogById, updateBlog } from "@/lib/adminBlogApi";

const Editor = dynamic(() => import("@/components/admin/Editor"), {
  ssr: false,
});

export default function EditBlogPage({ params }) {
  // ✅ NEXT 15 DOĞRU KULLANIM
  const { id } = use(params);

  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    title: "",
    cover_image: "",
    content: "",
    category_id: "",
  });

  useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`)
      .then((r) => r.json())
      .then(setCategories);
  }, []);

  useEffect(() => {
    if (!token || !id) return;

    fetchBlogById(token, id).then((data) => {
      if (!data) return;

      setForm({
        title: data.title,
        cover_image: data.cover_image || "",
        content: data.content || "",
        category_id: data.category_id || "",
      });

      setLoading(false);
    });
  }, [token, id]);

  if (loading) {
    return <div className="p-6">Yükleniyor…</div>;
  }

  const submit = async (e) => {
    e.preventDefault();
    await updateBlog(token, id, form);
    alert("Yazı güncellendi");
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">Blog Yazısını Düzenle</h1>

      <form onSubmit={submit} className="space-y-4">
        <input
          className="w-full rounded-xl border p-3"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <input
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

        <Editor
          value={form.content}
          onChange={(html) => setForm({ ...form, content: html })}
        />

        <button className="rounded-xl bg-emerald-600 px-6 py-3 text-white">
          Güncelle
        </button>
      </form>
    </main>
  );
}
