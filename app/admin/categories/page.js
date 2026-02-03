"use client";

import { useEffect, useState } from "react";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    color: "#10b981",
  });
  const [editingId, setEditingId] = useState(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const load = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
    );
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    load();
  }, []);

  /* ======================
     CREATE / UPDATE
  ====================== */
  const submit = async (e) => {
    e.preventDefault();

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${editingId}`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/categories`;

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    resetForm();
    load();
  };

  /* ======================
     DELETE
  ====================== */
  const remove = async (id) => {
    if (!confirm("Bu kategoriyi silmek istiyor musun?")) return;

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    load();
  };

  /* ======================
     EDIT
  ====================== */
  const edit = (cat) => {
    setEditingId(cat.id);
    setForm({
      name: cat.name,
      slug: cat.slug,
      color: cat.color || "#10b981",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      name: "",
      slug: "",
      color: "#10b981",
    });
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">📂 Kategoriler</h1>

      {/* ================= FORM ================= */}
      <form
        onSubmit={submit}
        className="mb-10 grid gap-4 rounded-2xl border bg-white p-6 shadow"
      >
        <h2 className="text-lg font-semibold">
          {editingId ? "Kategori Düzenle" : "Yeni Kategori Ekle"}
        </h2>

        <input
          placeholder="Kategori adı"
          className="rounded-xl border p-3"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          placeholder="Slug (beslenme, diyet vs)"
          className="rounded-xl border p-3"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          required
        />

        {/* 🎨 COLOR */}
        <div className="flex items-center gap-4">
          <input
            type="color"
            value={form.color}
            onChange={(e) => setForm({ ...form, color: e.target.value })}
            className="h-10 w-14 cursor-pointer rounded"
          />

          <span
            className="rounded-full px-4 py-2 text-sm font-semibold text-white"
            style={{ backgroundColor: form.color }}
          >
            Önizleme
          </span>
        </div>

        <div className="flex gap-3">
          <button className="rounded-xl bg-emerald-600 px-6 py-2 text-white">
            {editingId ? "Güncelle" : "Kategori Ekle"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl border px-6 py-2"
            >
              İptal
            </button>
          )}
        </div>
      </form>

      {/* ================= LIST ================= */}
      <div className="space-y-3">
        {categories.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between rounded-xl border p-4"
          >
            <div className="flex items-center gap-4">
              <span
                className="h-6 w-6 rounded-full"
                style={{ backgroundColor: c.color }}
              />

              <div>
                <div className="font-semibold">{c.name}</div>
                <div className="text-xs text-gray-500">{c.slug}</div>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => edit(c)} className="text-sm text-blue-600">
                Düzenle
              </button>
              <button
                onClick={() => remove(c.id)}
                className="text-sm text-red-500"
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
