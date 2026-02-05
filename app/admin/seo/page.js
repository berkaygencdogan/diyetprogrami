"use client";

import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function SeoAdminPage() {
  const [rows, setRows] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({});

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // 🔹 SEO kayıtlarını çek
  useEffect(() => {
    fetch(`${API}/api/seo`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (r) => {
        if (!r.ok) return [];
        return r.json();
      })
      .then(setRows);
  }, []);

  // 🔹 Düzenle
  const edit = (row) => {
    setEditingId(row.id);
    setForm({
      title: row.title || "",
      description: row.description || "",
      canonical: row.canonical || "",
    });
  };

  // 🔹 Kaydet
  const save = async (row) => {
    await fetch(`${API}/api/seo`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page_key: row.page_key, // ❗ sayfa adı değişmez
        ...form,
      }),
    });

    setEditingId(null);

    // listeyi güncelle
    setRows((prev) =>
      prev.map((r) => (r.id === row.id ? { ...r, ...form } : r)),
    );
  };

  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="mb-6 text-2xl font-bold">SEO Yönetimi</h1>

      <div className="overflow-x-auto rounded-xl border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Sayfa Adı</th>
              <th className="p-3">Meta Title</th>
              <th className="p-3">Slug / Canonical</th>
              <th className="p-3">Meta Description</th>
              <th className="p-3">İşlem</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => {
              const isEditing = editingId === row.id;

              return (
                <tr key={row.id} className="border-t">
                  {/* SAYFA ADI */}
                  <td className="p-3 font-semibold">{row.page_key}</td>

                  {/* META TITLE */}
                  <td className="p-3">
                    {isEditing ? (
                      <input
                        className="w-full rounded border p-2"
                        value={form.title}
                        onChange={(e) =>
                          setForm({ ...form, title: e.target.value })
                        }
                      />
                    ) : (
                      row.title
                    )}
                  </td>

                  {/* CANONICAL / SLUG */}
                  <td className="p-3">
                    {isEditing ? (
                      <input
                        className="w-full rounded border p-2"
                        value={form.canonical}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            canonical: e.target.value,
                          })
                        }
                      />
                    ) : (
                      row.canonical || "-"
                    )}
                  </td>

                  {/* META DESC */}
                  <td className="p-3">
                    {isEditing ? (
                      <textarea
                        className="w-full rounded border p-2"
                        rows={2}
                        value={form.description}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            description: e.target.value,
                          })
                        }
                      />
                    ) : (
                      row.description
                    )}
                  </td>

                  {/* AKSİYON */}
                  <td className="p-3">
                    {isEditing ? (
                      <button
                        onClick={() => save(row)}
                        className="rounded bg-emerald-600 px-4 py-2 text-white"
                      >
                        Kaydet
                      </button>
                    ) : (
                      <button
                        onClick={() => edit(row)}
                        className="rounded bg-gray-200 px-4 py-2"
                      >
                        Düzenle
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
