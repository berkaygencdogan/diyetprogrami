"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getGuestId } from "@/lib/guest";

export default function ProgramDetailClient({ params }) {
  const { id } = use(params);
  const [program, setProgram] = useState(null);
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const guestId = getGuestId();
    let url = `${API_URL}/api/programs/${id}`;
    const headers = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    } else {
      url += `?guest_id=${guestId}`;
    }

    fetch(url, { headers })
      .then((r) => r.json())
      .then(setProgram);
  }, [id]);

  const calculateMealTotal = (items) =>
    items.reduce((sum, item) => sum + (item.calories || 0), 0);

  const calculateDayTotal = (meals) =>
    Object.values(meals).reduce(
      (sum, items) => sum + calculateMealTotal(items),
      0,
    );

  const deleteProgram = async () => {
    const token = localStorage.getItem("token");
    const guestId = getGuestId();

    let url = `${API_URL}/api/programs/${id}`;
    const headers = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    } else {
      url += `?guest_id=${guestId}`;
    }

    await fetch(url, {
      method: "DELETE",
      headers,
    });

    router.push("/programim");
  };

  if (!program) return null;

  const { summary, plan } = program.data;

  const todayMeals = plan[0].meals;
  const dayTotalCalories = calculateDayTotal(todayMeals);
  const targetCalories = summary.dailyCalories;
  const diff = targetCalories - dayTotalCalories;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 space-y-10">
      {/* 🎯 GÜNLÜK HEDEF */}
      <section className="rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">🎯 Günlük Hedefin</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat label="Kalori" value={`${summary.dailyCalories} kcal`} />
          <Stat label="Protein" value={`${summary.macros.protein} g`} />
          <Stat label="Yağ" value={`${summary.macros.fat} g`} />
          <Stat label="Karbonhidrat" value={`${summary.macros.carb} g`} />
        </div>

        <p className="mt-4 text-sm text-gray-600">{summary.note}</p>
      </section>

      {/* 🍽️ BUGÜNÜN MENÜSÜ */}
      <section className="rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">🔥 Bugün Toplam</h2>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-3xl font-bold text-gray-900">
              {dayTotalCalories} kcal
            </p>
            <p className="text-sm text-gray-500">
              Hedef: {targetCalories} kcal
            </p>
          </div>

          <div
            className={`rounded-xl px-4 py-2 text-sm font-semibold
        ${
          diff >= 0
            ? "bg-emerald-50 text-emerald-700"
            : "bg-red-50 text-red-600"
        }`}
          >
            {diff >= 0
              ? `Hedefe ${diff} kcal kaldı`
              : `${Math.abs(diff)} kcal aşıldı`}
          </div>
        </div>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">🍽️ Bugünün Menüsü</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(plan[0].meals).map(([meal, items]) => {
            const mealTotal = calculateMealTotal(items);

            return (
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

                {/* 🔥 ÖĞÜN TOPLAMI */}
                <div className="mt-3 text-sm font-semibold text-emerald-700">
                  Toplam: {mealTotal} kcal
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 📅 AYLIK PLAN */}
      <section>
        <h2 className="mb-6 text-xl font-bold">📅 Aylık Plan</h2>

        {Array.from({ length: plan.length / 30 }, (_, m) => {
          const days = plan.slice(m * 30, m * 30 + 30);

          return (
            <details
              key={m}
              className="mb-6 rounded-2xl border bg-white shadow"
            >
              <summary className="cursor-pointer px-6 py-4 font-semibold bg-gray-50">
                {m + 1}. Ay
              </summary>

              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {days.map((day) => (
                  <div key={day.day} className="rounded-xl border p-4 text-sm">
                    <h4 className="mb-2 font-semibold text-emerald-700">
                      Gün {day.day}
                    </h4>

                    {Object.entries(day.meals).map(([meal, items]) => (
                      <ul key={meal} className="mb-2">
                        {items.map((i, idx) => (
                          <li key={idx}>
                            • {i.name} ({i.grams} g)
                          </li>
                        ))}
                      </ul>
                    ))}
                  </div>
                ))}
              </div>
            </details>
          );
        })}
      </section>

      {/* ❌ PROGRAM SİL */}
      <button
        onClick={deleteProgram}
        className="rounded-xl bg-red-500 px-6 py-3 text-white font-semibold"
      >
        Programı Sil
      </button>
    </main>
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
