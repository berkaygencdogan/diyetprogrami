"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

export default function DietHeroCard() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [goal, setGoal] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const f = new FormData(e.currentTarget);
    const hedef = f.get("hedef");

    const payload = {
      height: Number(f.get("boy")),
      weight: Number(f.get("kilo")),
      age: Number(f.get("yas")),
      gender: f.get("cinsiyet") === "erkek" ? "male" : "female",
      activity: "medium",
      goal:
        hedef === "kilo-ver"
          ? "lose"
          : hedef === "kilo-al"
            ? "gain"
            : "maintain",
    };

    if (payload.goal !== "maintain") {
      payload.months = Number(f.get("ay"));
      payload.targetKg = Number(f.get("hedef_kilo"));
    }

    try {
      /* 1️⃣ HESAPLAMA */
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/diet/goal-plan`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Hesaplama hatası");

      /* 2️⃣ PROGRAMI KAYDET */
      const saveRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/programs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            goal: payload.goal,
            start_weight: payload.weight,
            target_weight:
              payload.goal === "maintain" ? payload.weight : payload.targetKg,
            target_months: payload.months || null,
            data, // summary + plan
          }),
        },
      );

      const saved = await saveRes.json();
      if (!saveRes.ok) throw new Error("Program kaydedilemedi");

      /* 3️⃣ DİREKT PROGRAM DETAY */
      router.push(`/programim/${saved.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ================= HERO CARD ================= */}
      <div className="relative mx-auto w-full max-w-[1400px] overflow-hidden rounded-[32px]">
        <Image
          src="/images/woman-bg.png"
          alt=""
          fill
          priority
          className="object-cover"
        />

        <div className="relative z-10 grid grid-cols-1 gap-8 p-4 md:grid-cols-2 md:p-8">
          {/* FORM */}
          <div className="rounded-2xl bg-white/95 p-5 shadow-lg backdrop-blur">
            <h2 className="mb-4 text-lg font-semibold">Bilgilerini Gir</h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="boy"
                type="number"
                placeholder="Boy (cm)"
                required
                className="h-11 w-full rounded-xl border px-4 text-sm"
              />

              <input
                name="kilo"
                type="number"
                placeholder="Kilo (kg)"
                required
                className="h-11 w-full rounded-xl border px-4 text-sm"
              />

              <input
                name="yas"
                type="number"
                placeholder="Yaş"
                required
                className="h-11 w-full rounded-xl border px-4 text-sm"
              />

              <select
                name="cinsiyet"
                required
                className="h-11 w-full rounded-xl border px-4 text-sm"
              >
                <option value="">Cinsiyet</option>
                <option value="kadin">Kadın</option>
                <option value="erkek">Erkek</option>
              </select>

              <select
                name="hedef"
                required
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="h-11 w-full rounded-xl border px-4 text-sm"
              >
                <option value="">Hedef</option>
                <option value="kilo-ver">Kilo Vermek</option>
                <option value="kilo-al">Kilo Almak</option>
                <option value="koru">Korumak</option>
              </select>

              {goal && goal !== "koru" && (
                <div className="grid grid-cols-2 gap-3">
                  <input
                    name="ay"
                    type="number"
                    min="1"
                    placeholder="Kaç ay?"
                    required
                    className="h-11 w-full rounded-xl border px-4 text-sm"
                  />

                  <input
                    name="hedef_kilo"
                    type="number"
                    min="1"
                    placeholder="Kaç kilo?"
                    required
                    className="h-11 w-full rounded-xl border px-4 text-sm"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 h-12 w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 transition text-sm font-semibold text-white disabled:opacity-60"
              >
                {loading ? "Hesaplanıyor..." : "Hedefine Ulaş"}
              </button>
            </form>
          </div>

          {/* IMAGE */}
          <div className="relative hidden md:flex items-end justify-center">
            <Image
              src="/images/woman.png"
              alt=""
              width={700}
              height={520}
              className="object-contain z-[-1]"
            />
          </div>
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mx-auto mt-4 max-w-[800px] rounded-xl bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}
    </>
  );
}
