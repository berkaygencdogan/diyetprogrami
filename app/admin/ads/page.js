"use client";

import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function AdPage() {
  const [ads, setAds] = useState([]);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/admin/ads`)
      .then((r) => r.json())
      .then(setAds);
  }, []);

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reklamlar</h1>
      </div>

      <div className="space-y-4">
        {ads.map((ad) => (
          <div key={ad.id} className="rounded-xl border p-4 bg-white">
            <div className="font-semibold mb-2">{ad.slot_id}</div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <input
                defaultValue={ad.width}
                placeholder="Width"
                onBlur={(e) => (ad.width = e.target.value)}
                className="border p-2 rounded"
              />
              <input
                defaultValue={ad.height}
                placeholder="Height"
                onBlur={(e) => (ad.height = e.target.value)}
                className="border p-2 rounded"
              />
              <input
                defaultValue={ad.image_url}
                placeholder="Image URL"
                onBlur={(e) => (ad.image_url = e.target.value)}
                className="border p-2 rounded col-span-2"
              />
              <input
                defaultValue={ad.img_class}
                placeholder="Img Class"
                onBlur={(e) => (ad.img_class = e.target.value)}
                className="border p-2 rounded"
              />
              <input
                defaultValue={ad.link_url}
                placeholder="Link URL"
                onBlur={(e) => (ad.link_url = e.target.value)}
                className="border p-2 rounded"
              />
            </div>

            <div className="mt-3 flex gap-4 items-center">
              <label className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  defaultChecked={ad.published}
                  onChange={(e) => (ad.published = e.target.checked ? 1 : 0)}
                />
                Yayında
              </label>

              <button
                onClick={() => setPreview(ad.view_image)}
                className="text-blue-600 text-sm underline"
              >
                Yerini Göster
              </button>

              <button
                onClick={() => saveAd(ad)}
                className="ml-auto bg-emerald-600 text-white px-4 py-2 rounded"
              >
                Kaydet
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {preview && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6">
          <div className="relative inline-block bg-white rounded-xl shadow-xl overflow-hidden">
            {/* KAPAT */}
            <button
              onClick={() => setPreview(null)}
              className="
          absolute top-2 right-2
          flex items-center justify-center
          w-8 h-8
          rounded-full
          bg-red-600 text-white
          text-lg font-bold
          shadow-md
          hover:bg-red-700
          transition
          z-10
        "
            >
              ✕
            </button>

            {/* RESİM */}
            <img
              src={preview}
              className="
          block
          max-w-[90vw]
          max-h-[90vh]
          object-contain
        "
              alt="Reklam Konumu"
            />
          </div>
        </div>
      )}
    </div>
  );

  async function saveAd(ad) {
    await fetch(`${API}/api/admin/ads/${ad.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ad),
    });
    alert("Kaydedildi");
  }
}
