"use client";

import { useEffect, useState } from "react";

export default function AdminSliders() {
  const [sliders, setSliders] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [uploading, setUploading] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const load = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sliders`);
    const data = await res.json();
    setSliders(data);
  };

  useEffect(() => {
    load();
  }, []);

  // 📤 IMAGE UPLOAD
  const uploadImage = async (file) => {
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/upload/image`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );

    const json = await res.json();
    setImage(`${process.env.NEXT_PUBLIC_API_URL}${json.location}`);
    setUploading(false);
  };

  // ➕ / ✏️ SUBMIT
  const submit = async (e) => {
    e.preventDefault();

    const payload = { title, image, link };

    if (editingId) {
      // ✏️ UPDATE
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/sliders/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );
    } else {
      // ➕ CREATE
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sliders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
    }

    resetForm();
    load();
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setImage("");
    setLink("");
  };

  const edit = (slider) => {
    setEditingId(slider.id);
    setTitle(slider.title || "");
    setImage(slider.image || "");
    setLink(slider.link || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async (id) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sliders/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    load();
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">Slider Yönetimi</h1>

      {/* FORM */}
      <form onSubmit={submit} className="mb-10 grid gap-4">
        <input
          placeholder="Başlık (opsiyonel)"
          className="rounded-xl border p-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => uploadImage(e.target.files[0])}
        />

        {uploading && (
          <div className="text-sm text-gray-500">Görsel yükleniyor…</div>
        )}

        {image && (
          <div className="h-40 w-full rounded-xl border bg-gray-50 flex items-center justify-center overflow-hidden">
            <img
              src={image}
              alt="preview"
              className="max-h-full max-w-full object-contain"
            />
          </div>
        )}

        <input
          placeholder="Link (opsiyonel)"
          className="rounded-xl border p-3"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        <div className="flex gap-3">
          <button
            disabled={!image}
            className="rounded-xl bg-emerald-600 px-6 py-2 text-white disabled:opacity-50"
          >
            {editingId ? "Güncelle" : "Slider’a Ekle"}
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

      {/* LIST */}
      <div className="grid gap-4 md:grid-cols-2">
        {sliders.map((s) => (
          <div
            key={s.id}
            className="rounded-xl border p-4 flex items-center justify-between"
          >
            <div className="pr-4">
              <div className="font-semibold">
                {s.title || "Başlıksız Slider"}
              </div>
              <div className="text-xs text-gray-500 break-all">{s.image}</div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => edit(s)} className="text-sm text-blue-600">
                Düzenle
              </button>
              <button
                onClick={() => remove(s.id)}
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
