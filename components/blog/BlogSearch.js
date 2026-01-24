"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { searchBlogs } from "@/lib/blogApi";

function Highlighted({ text, query }) {
  if (!query) return text;

  const parts = text.split(new RegExp(`(${query})`, "gi"));

  return (
    <>
      {parts.map((p, i) =>
        p.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-emerald-100 text-emerald-700">
            {p}
          </mark>
        ) : (
          p
        ),
      )}
    </>
  );
}

export default function BlogSearch() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (q.length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const data = await searchBlogs(q);
        setResults(data);
      } finally {
        setLoading(false);
      }
    }, 400); // ⏱ debounce

    return () => clearTimeout(timer);
  }, [q]);

  return (
    <div className="relative">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Bloglarda ara..."
        className="w-full rounded-xl border px-4 py-3 text-sm"
      />

      {loading && (
        <div className="absolute right-3 top-3 text-xs text-gray-400">
          Aranıyor…
        </div>
      )}

      {!!results.length && (
        <div className="absolute z-50 mt-2 w-full rounded-xl border bg-white shadow-lg">
          {results.map((b) => (
            <Link
              key={b.id}
              href={`/blog/${b.slug}`}
              className="block px-4 py-3 text-sm hover:bg-gray-50"
            >
              <Highlighted text={b.title} query={q} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
