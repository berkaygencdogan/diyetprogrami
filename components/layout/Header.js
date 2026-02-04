"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [programSetting, setProgramSetting] = useState(null);
  const [favoriSetting, setFavoriSetting] = useState(null);

  useEffect(() => {
    const syncUser = () => {
      const raw = localStorage.getItem("user");
      setUser(raw ? JSON.parse(raw) : null);
    };

    syncUser(); // ilk yükleme

    window.addEventListener("auth-change", syncUser);

    return () => {
      window.removeEventListener("auth-change", syncUser);
    };
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/settings/public`)
      .then((r) => r.json())
      .then((data) => {
        setProgramSetting(data.program_access ?? "public");
        setFavoriSetting(data.favori_access ?? "public");
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-change"));
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md ring-1 ring-black/5">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/diyet-logo.png"
            alt="Diyet Programı"
            width={220}
            height={40}
            priority
          />
        </Link>

        {/* DESKTOP */}
        <div className="hidden items-center gap-6 md:flex">
          <NavLink href="/">Anasayfa</NavLink>
          <NavLink href="/blog">Blog</NavLink>

          {/* 1️⃣ USER VAR */}
          {user && (
            <>
              <NavLink href="/programim">📊 Programım</NavLink>
              <NavLink href="/favorilerim">❤️ Favorilerim</NavLink>

              {user.role === "admin" && <NavLink href="/admin">Admin</NavLink>}

              <button
                onClick={logout}
                className="text-sm font-semibold text-red-500 hover:underline"
              >
                Çıkış
              </button>
            </>
          )}

          {/* 2️⃣ USER YOK + PUBLIC */}
          {!user &&
            programSetting === "public" &&
            favoriSetting === "public" && (
              <>
                <NavLink href="/programim">📊 Programım</NavLink>
                <NavLink href="/favorilerim">❤️ Favorilerim</NavLink>

                <NavLink href="/login">Giriş Yap</NavLink>
                <NavLink href="/register">Kayıt Ol</NavLink>
              </>
            )}

          {!user && programSetting === "auth" && favoriSetting === "public" && (
            <>
              <NavLink href="/favorilerim">❤️ Favorilerim</NavLink>

              <NavLink href="/login">Giriş Yap</NavLink>
              <NavLink href="/register">Kayıt Ol</NavLink>
            </>
          )}

          {!user && programSetting === "public" && favoriSetting === "auth" && (
            <>
              <NavLink href="/programim">📊 Programım</NavLink>
              <NavLink href="/login">Giriş Yap</NavLink>
              <NavLink href="/register">Kayıt Ol</NavLink>
            </>
          )}
          {/* 3️⃣ USER YOK + AUTH */}
          {!user && programSetting === "auth" && favoriSetting === "auth" && (
            <>
              <NavLink href="/login">Giriş Yap</NavLink>
              <NavLink href="/register">Kayıt Ol</NavLink>
            </>
          )}
        </div>

        {/* MOBILE */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden h-10 w-10 rounded-lg border flex items-center justify-center"
        >
          ☰
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="flex flex-col gap-1 px-4 py-3">
            <MobileLink href="/" onClick={() => setOpen(false)}>
              Anasayfa
            </MobileLink>

            <MobileLink href="/blog" onClick={() => setOpen(false)}>
              Blog
            </MobileLink>

            {user ? (
              <>
                <MobileLink href="/programim" onClick={() => setOpen(false)}>
                  Programım
                </MobileLink>

                {user.role === "admin" && (
                  <MobileLink href="/admin" onClick={() => setOpen(false)}>
                    Admin
                  </MobileLink>
                )}

                <button
                  onClick={logout}
                  className="rounded-lg px-3 py-2 text-left text-sm text-red-500"
                >
                  Çıkış
                </button>
              </>
            ) : (
              <>
                <MobileLink href="/login" onClick={() => setOpen(false)}>
                  Giriş Yap
                </MobileLink>
                <MobileLink href="/register" onClick={() => setOpen(false)}>
                  Kayıt Ol
                </MobileLink>
              </>
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
