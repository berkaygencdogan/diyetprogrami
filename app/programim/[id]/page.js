"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProgramDetailPage({ params }) {
  const { id } = params;
  const [program, setProgram] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/programs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => r.json())
      .then(setProgram);
  }, [id]);

  const deleteProgram = async () => {
    const token = localStorage.getItem("token");

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/programs/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    router.push("/programim");
  };

  if (!program) return null;

  const { summary, plan } = program.data;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      {/* 🔥 BURASI DietHeroCard ALT TASARIMI */}
      {/* summary + today menu + monthly plan */}

      {/* ❌ SİLME BUTONU (SADECE BURADA) */}
      <button
        onClick={deleteProgram}
        className="mt-10 rounded-xl bg-red-500 px-6 py-3 text-white font-semibold"
      >
        Programı Sil
      </button>
    </main>
  );
}
