"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [programAccess, setProgramAccess] = useState("public");
  const [favoriAccess, setFavoriAccess] = useState("public");

  useEffect(() => {
    fetch(`${API}/api/settings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.program_access) {
          setProgramAccess(data.program_access);
        }
        if (data.favori_access) {
          setFavoriAccess(data.favori_access);
        }
      });
  }, []);

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
            className={`px-4 py-2 rounded-xl border
              ${
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
            className={`px-4 py-2 rounded-xl border
              ${
                programAccess === "auth"
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-100"
              }`}
          >
            Sadece Giriş Yapanlar
          </button>
        </div>

        <p className="text-sm text-gray-500">
          Program oluşturma ve görüntüleme erişimini belirler.
        </p>
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
            className={`px-4 py-2 rounded-xl border
              ${
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
            className={`px-4 py-2 rounded-xl border
              ${
                favoriAccess === "auth"
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-100"
              }`}
          >
            Sadece Giriş Yapanlar
          </button>
        </div>

        <p className="text-sm text-gray-500">
          Favorilere ekleme ve görüntüleme erişimini belirler.
        </p>
      </section>
    </main>
  );
}
