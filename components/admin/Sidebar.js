"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/auth";
import { useState } from "react";

const menu = [
  { name: "Dashboard", href: "/admin" },
  { name: "Bloglar", href: "/admin/blogs" },
  { name: "Yorumlar", href: "/admin/comments" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 🔝 MOBILE TOP BAR */}
      <div className="fixed bottom-4 right-4 z-40 md:hidden">
        <button
          onClick={() => setOpen(true)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg border"
        >
          ☰
        </button>
      </div>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed z-50 h-full w-64 bg-white border-r transition-transform
          md:static md:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* DESKTOP LOGO */}
        <div className="hidden px-6 py-5 text-xl font-bold text-emerald-600 md:block">
          DiyetProgramı
        </div>

        {/* MENU */}
        <nav className="mt-4 space-y-1 px-3 md:mt-0">
          {menu.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-4 py-2 text-sm ${
                  active
                    ? "bg-emerald-50 font-semibold text-emerald-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className="mt-auto border-t px-4 py-4">
          <button
            onClick={logout}
            className="w-full rounded-lg bg-red-50 py-2 text-sm text-red-600"
          >
            Çıkış Yap
          </button>
        </div>
      </aside>
    </>
  );
}
