"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return;

      const user = JSON.parse(raw);
      if (["admin", "editor"].includes(user.role)) {
        setIsAdmin(true);
      }
    } catch {}
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md ring-1 ring-black/5">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/diyet-logo.png"
            alt="Diyet Programı"
            width={250}
            height={40}
            priority
          />
        </Link>

        {/* DESKTOP */}
        <div className="hidden gap-8 md:flex items-center">
          <NavLink href="/">Anasayfa</NavLink>
          <NavLink href="/blog">Blog</NavLink>

          {isAdmin && <NavLink href="/admin">Admin</NavLink>}
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden h-10 w-10 rounded-lg border border-gray-300 flex items-center justify-center"
        >
          ☰
        </button>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="flex flex-col px-4 py-3 gap-1">
            <MobileLink href="/" onClick={() => setOpen(false)}>
              Anasayfa
            </MobileLink>
            <MobileLink href="/blog" onClick={() => setOpen(false)}>
              Blog
            </MobileLink>

            {isAdmin && (
              <MobileLink href="/admin" onClick={() => setOpen(false)}>
                Admin
              </MobileLink>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition"
    >
      {children}
    </Link>
  );
}

function MobileLink({ href, children, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
    >
      {children}
    </Link>
  );
}
