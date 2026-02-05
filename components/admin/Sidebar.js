"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const menu = [
  { name: "Dashboard", href: "/admin" },
  { name: "Slider", href: "/admin/sliders" },
  { name: "Bloglar", href: "/admin/blogs" },
  { name: "Kategoriler", href: "/admin/categories" },
  { name: "Yorumlar", href: "/admin/comments" },
  { name: "Kullanıcılar", href: "/admin/users" },
  { name: "Ayarlar", href: "/admin/ayarlar" },
  { name: "SEO", href: "/admin/seo" },
  { name: "Reklamlar", href: "/admin/ads" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw) setUser(JSON.parse(raw));
  }, []);

  // 🔐 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-change"));
    router.push("/login");
  };

  // ❌ Admin değilse erişim yok
  if (!user || user.role !== "admin") return null;

  return (
    <>
      {/* 🔝 MOBILE FAB */}
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
          fixed z-50 flex h-full w-64 flex-col bg-white border-r transition-transform
          md:static md:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* LOGO */}
        <div className="px-6 py-5 text-xl font-bold text-emerald-600">
          DiyetProgramı
        </div>

        {/* MENU */}
        <nav className="flex-1 space-y-1 px-3">
          {menu.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-4 py-2 text-sm transition ${
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
        <div className="border-t px-4 py-4">
          <button
            onClick={logout}
            className="w-full rounded-lg bg-red-50 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
          >
            Çıkış Yap
          </button>
        </div>
      </aside>
    </>
  );
}
