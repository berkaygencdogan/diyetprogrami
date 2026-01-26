"use client";

import { useEffect, useState } from "react";
import ProgramCard from "@/components/program/ProgramCard";

export default function ProgramListPage() {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/programs/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => r.json())
      .then(setPrograms);
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">📊 Programlarım</h1>

      {!programs.length && (
        <p className="text-sm text-gray-500">
          Henüz kayıtlı bir programın yok.
        </p>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        {programs.map((p) => (
          <ProgramCard key={p.id} program={p} />
        ))}
      </div>
    </main>
  );
}
