"use client";

import { useEffect, useState } from "react";
import ProgramCard from "@/components/program/ProgramCard";
import { getGuestId } from "@/lib/guest";
import HeroPremium from "@/components/hero/HeroPremium";
import HeroText from "@/components/hero/HeroText";
import DietHeroCard from "@/components/hero/DietFormCard";

export default function ProgramListClient() {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const guestId = getGuestId();

    let url = `${process.env.NEXT_PUBLIC_API_URL}/api/programs`;
    const headers = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    } else {
      url += `?guest_id=${guestId}`;
    }

    fetch(url, { headers })
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
      <HeroPremium>
        <HeroText />
        <DietHeroCard />
      </HeroPremium>
    </main>
  );
}
