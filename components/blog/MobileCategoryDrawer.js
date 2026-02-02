"use client";

import Link from "next/link";
import { useState } from "react";

export default function MobileCategoryDrawer({ categories }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* TOGGLE */}
      <button
        onClick={() => setOpen(true)}
        className="fixed right-3 top-1/2 z-50 -translate-y-1/2 rounded-full bg-emerald-600 p-2 text-white shadow-lg xl:hidden"
      >
        ‹
      </button>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 xl:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* DRAWER */}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-[260px] bg-white p-5 shadow-xl transition-transform xl:hidden
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <h3 className="mb-4 text-sm font-bold">📂 Kategoriler</h3>

        <ul className="space-y-2 text-sm">
          {categories.map((c) => (
            <li key={c.id}>
              <Link
                href={`/kategori/${c.slug}`}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 hover:bg-emerald-50"
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
