"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BlogSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams();

      if (q.trim()) {
        params.set("q", q);
      }

      router.push(`/blog?${params.toString()}`, { scroll: false });
    }, 400); // debounce

    return () => clearTimeout(timeout);
  }, [q, router]);

  return (
    <div className="mt-6 mb-10 max-w-md">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Başlığa göre ara..."
        className="h-11 w-full rounded-xl border px-4 text-sm focus:border-emerald-500 focus:outline-none"
      />
    </div>
  );
}
