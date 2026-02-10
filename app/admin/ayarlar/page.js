"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [programAccess, setProgramAccess] = useState("public");
  const [favoriAccess, setFavoriAccess] = useState("public");

  const [form, setForm] = useState({
    site_background_color: "#7FAF9A",
  });

  const [textColorSettings, setTextColorSettings] = useState({
    title: "text-white",
    all: "text-green-500",
  });

  /* ================= FETCH ================= */

  useEffect(() => {
    fetch(`${API}/api/settings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.program_access) setProgramAccess(data.program_access);
        if (data.favori_access) setFavoriAccess(data.favori_access);

        if (data.site_background_color) {
          setForm((prev) => ({
            ...prev,
            site_background_color: data.site_background_color,
          }));
        }

        if (data.title_text_color || data.all_text_color) {
          setTextColorSettings({
            title: data.title_text_color || "text-white",
            all: data.all_text_color || "text-green-500",
          });
        }
      });
  }, []);

  /* ================= SAVE ================= */

  const save = async (key, value) => {
    await fetch(`${API}/api/settings`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key, value }),
    });
  };

  /* ================= UI ================= */

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-10">
      <h1 className="text-2xl font-bold">⚙️ Ayarlar</h1>

      {/* PROGRAM */}
      <section className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="font-semibold text-lg">Program Erişimi</h2>

        <div className="flex gap-4">
          <button
            onClick={() => {
              setProgramAccess("public");
              save("program_access", "public");
            }}
            className={`px-4 py-2 rounded-xl border ${
              programAccess === "public"
                ? "bg-emerald-500 text-white"
                : "bg-gray-100"
            }`}
          >
            Herkese Açık
          </button>

          <button
            onClick={() => {
              setProgramAccess("auth");
              save("program_access", "auth");
            }}
            className={`px-4 py-2 rounded-xl border ${
              programAccess === "auth"
                ? "bg-emerald-500 text-white"
                : "bg-gray-100"
            }`}
          >
            Sadece Giriş Yapanlar
          </button>
        </div>
      </section>

      {/* FAVORİ */}
      <section className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="font-semibold text-lg">Favori Erişimi</h2>

        <div className="flex gap-4">
          <button
            onClick={() => {
              setFavoriAccess("public");
              save("favori_access", "public");
            }}
            className={`px-4 py-2 rounded-xl border ${
              favoriAccess === "public"
                ? "bg-emerald-500 text-white"
                : "bg-gray-100"
            }`}
          >
            Herkese Açık
          </button>

          <button
            onClick={() => {
              setFavoriAccess("auth");
              save("favori_access", "auth");
            }}
            className={`px-4 py-2 rounded-xl border ${
              favoriAccess === "auth"
                ? "bg-emerald-500 text-white"
                : "bg-gray-100"
            }`}
          >
            Sadece Giriş Yapanlar
          </button>
        </div>
      </section>

      {/* BACKGROUND COLOR */}
      <section className="rounded-2xl border bg-white p-6 space-y-2">
        <span className="text-sm font-medium">Site Arka Plan Rengi</span>

        <input
          type="color"
          value={form.site_background_color}
          onChange={(e) => {
            const color = e.target.value;

            setForm((prev) => ({
              ...prev,
              site_background_color: color,
            }));

            save("site_background_color", color);
          }}
          className="h-10 w-20 cursor-pointer rounded"
        />

        <p className="text-xs text-gray-500">Önerilen: #7FAF9A</p>
      </section>

      {/* TEXT COLORS */}
      <section className="rounded-2xl border bg-white p-6 space-y-6">
        <h2 className="font-semibold text-lg">Metin Renkleri</h2>

        {/* TITLE */}
        <div>
          <p className="mb-2 text-sm font-medium">Başlık Rengi</p>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setTextColorSettings((p) => ({
                  ...p,
                  title: "text-white",
                }));
                save("title_text_color", "text-white");
              }}
              className={`px-4 py-2 rounded-xl border ${
                textColorSettings.title === "text-white"
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              Beyaz
            </button>

            <button
              onClick={() => {
                setTextColorSettings((p) => ({
                  ...p,
                  title: "text-black",
                }));
                save("title_text_color", "text-black");
              }}
              className={`px-4 py-2 rounded-xl border ${
                textColorSettings.title === "text-black"
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              Siyah
            </button>
          </div>
        </div>

        {/* ALL */}
        <div>
          <p className="mb-2 text-sm font-medium">“Tümünü Gör” Rengi</p>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setTextColorSettings((p) => ({
                  ...p,
                  all: "text-white",
                }));
                save("all_text_color", "text-white");
              }}
              className={`px-4 py-2 rounded-xl border ${
                textColorSettings.all === "text-white"
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              Beyaz
            </button>

            <button
              onClick={() => {
                setTextColorSettings((p) => ({
                  ...p,
                  all: "text-green-500",
                }));
                save("all_text_color", "text-green-500");
              }}
              className={`px-4 py-2 rounded-xl border ${
                textColorSettings.all === "text-green-500"
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              Yeşil
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
