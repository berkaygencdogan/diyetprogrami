"use client";

import { useEffect, useState } from "react";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

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

  const submit = async (e) => {
    e.preventDefault();

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, slug }),
    });

    setName("");
    setSlug("");
    load();
  };

  const remove = async (id) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    load();
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">Kategoriler</h1>

      {/* EKLE */}
      <form onSubmit={submit} className="mb-8 grid gap-3">
        <input
          placeholder="Kategori adı"
          className="rounded-xl border p-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          placeholder="Slug (beslenme, diyet vs)"
          className="rounded-xl border p-3"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
        />

        <button className="w-fit rounded-xl bg-emerald-600 px-6 py-2 text-white">
          Kategori Ekle
        </button>
      </form>

      {/* LİSTE */}
      <div className="space-y-3">
        {categories.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between rounded-xl border p-4"
          >
            <div>
              <div className="font-semibold">{c.name}</div>
              <div className="text-xs text-gray-500">{c.slug}</div>
            </div>

            <button
              onClick={() => remove(c.id)}
              className="text-sm text-red-500"
            >
              Sil
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
