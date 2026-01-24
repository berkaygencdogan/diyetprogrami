"use client";

import Image from "next/image";
import { useState, useMemo } from "react";

export default function DietHeroCard() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [goal, setGoal] = useState("");
  const months = useMemo(() => {
    if (!result?.plan) return [];

    const chunks = [];
    for (let i = 0; i < result.plan.length; i += 30) {
      chunks.push(result.plan.slice(i, i + 30));
    }
    return chunks;
  }, [result]);

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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/diet/goal-plan`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      console.log("a", res);

      const data = await res.json();
      console.log("object", data);
      if (!res.ok) throw new Error(data.error || "Hesaplama hatası");

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ================= HERO CARD ================= */}
      <div
        className="relative mx-auto w-full max-w-[1400px] overflow-hidden rounded-[32px]"
        id="form"
      >
        <Image
          src="/images/woman-bg.png"
          alt=""
          fill
          priority
          className="object-cover z-0"
        />

        <div className="relative z-[999] grid grid-cols-1 gap-8 p-4 md:grid-cols-2 md:p-8">
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
                className="mt-2 h-12 w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 transition z-[999] text-sm font-semibold text-white disabled:opacity-60"
              >
                {loading ? "Hesaplanıyor..." : "Hedefine Ulaş"}
              </button>
            </form>
          </div>

          {/* IMAGE */}
          <div
            className="relative hidden md:flex items-end justify-center"
            id="resim"
          >
            <Image
              src="/images/woman.png"
              alt=""
              width={700}
              height={520}
              className="object-contain z-0"
            />
          </div>
        </div>
      </div>
      <div className="w-full max-w-[1400px] mx-auto px-6" id="menu">
        {result && (
          <section className="mt-12 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* GÜNLÜK HEDEF */}
              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-lg font-bold">🎯 Günlük Hedefin</h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Stat
                    label="Kalori"
                    value={`${result.summary.dailyCalories} kcal`}
                  />
                  <Stat
                    label="Protein"
                    value={`${result.summary.macros.protein} g`}
                  />
                  <Stat label="Yağ" value={`${result.summary.macros.fat} g`} />
                  <Stat
                    label="Karbonhidrat"
                    value={`${result.summary.macros.carb} g`}
                  />
                </div>

                <p className="mt-4 text-sm text-gray-600">
                  {result.summary.note}
                </p>
              </div>

              {/* BUGÜNÜN MENÜSÜ */}
              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-lg font-bold">🍽️ Bugünün Menüsü</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(result.plan[0].meals).map(([meal, items]) => (
                    <div key={meal} className="rounded-xl border p-4">
                      <h4 className="mb-2 font-semibold">
                        {meal === "breakfast" && "Kahvaltı"}
                        {meal === "lunch" && "Öğle Yemeği"}
                        {meal === "dinner" && "Akşam Yemeği"}
                        {meal === "snack" && "Ara Öğün"}
                      </h4>

                      <ul className="space-y-1 text-sm">
                        {items.map((i, idx) => (
                          <li key={idx}>
                            • {i.name} – {i.grams} g ({i.calories} kcal)
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ================= MONTHLY PLAN ================= */}
        {result?.plan && (
          <section className="mt-12 w-full">
            <h3 className="mb-6 text-xl font-bold">📅 Aylık Plan</h3>

            {months.map((monthDays, monthIndex) => (
              <details
                key={monthIndex}
                className="group mb-6 rounded-2xl border bg-white shadow-sm overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer px-6 py-4 text-lg font-semibold bg-gray-50 hover:bg-gray-100 transition">
                  <span>{monthIndex + 1}. Ay</span>
                  <span className="text-sm text-gray-400 group-open:rotate-180 transition">
                    ▼
                  </span>
                </summary>

                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {monthDays.map((day) => (
                      <div
                        key={day.day}
                        className="rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition"
                      >
                        <h4 className="mb-3 text-center font-semibold text-sm text-emerald-700">
                          Gün {day.day}
                        </h4>

                        <div className="space-y-3 text-sm">
                          {Object.entries(day.meals).map(([meal, items]) => (
                            <div key={meal}>
                              {/* Öğün Başlığı */}
                              <div className="mb-1 inline-block rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                                {meal === "breakfast" && "🍳 Kahvaltı"}
                                {meal === "lunch" && "🍛 Öğle Yemeği"}
                                {meal === "dinner" && "🍽️ Akşam Yemeği"}
                                {meal === "snack" && "🍎 Ara Öğün"}
                              </div>

                              {/* Öğün İçeriği */}
                              <ul className="mt-1 space-y-1 text-xs text-gray-700">
                                {items.map((i, idx) => (
                                  <li
                                    key={idx}
                                    className="flex justify-between gap-2 border-b last:border-b-0 pb-0.5"
                                  >
                                    <span className="truncate">• {i.name}</span>
                                    <span className="whitespace-nowrap text-gray-500">
                                      {i.grams} g · {i.calories} kcal
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </details>
            ))}
          </section>
        )}
      </div>
      {/* ================= ERROR ================= */}
      {error && (
        <div className="mx-auto mt-4 max-w-[800px] rounded-xl bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}
    </>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl bg-gray-50 p-4 text-center">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-lg font-bold">{value}</div>
    </div>
  );
}
