"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const ref = useRef(null);

  const [programSetting, setProgramSetting] = useState(null);
  const [favoriSetting, setFavoriSetting] = useState(null);

  useEffect(() => {
    const syncUser = () => {
      const raw = localStorage.getItem("user");
      setUser(raw ? JSON.parse(raw) : null);
    };

    syncUser();
    window.addEventListener("auth-change", syncUser);
    return () => window.removeEventListener("auth-change", syncUser);
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

  // dış click close
  useEffect(() => {
    const handler = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <nav className="mx-auto flex h-16 max-w-7xl items-center px-6">
        {/* LOGO */}
        <Link href="/" className="font-bold text-lg mr-auto">
          ❤️ DiyetProgramı
        </Link>

        {/* CENTER MENU */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-8">
          <NavLink href="/">Anasayfa</NavLink>
          <NavLink href="/blog">Blog</NavLink>

          {user && (
            <>
              <NavLink href="/favorilerim">❤️ Favorilerim</NavLink>

              {user.role === "admin" && (
                <>
                  <NavLink href="/programim">📊 Programım</NavLink>
                  <NavLink href="/admin">Admin</NavLink>
                </>
              )}
            </>
          )}

          {!user &&
            programSetting === "public" &&
            favoriSetting === "public" && (
              <NavLink href="/favorilerim">❤️ Favorilerim</NavLink>
            )}

          {!user && programSetting === "auth" && favoriSetting === "public" && (
            <NavLink href="/favorilerim">❤️ Favorilerim</NavLink>
          )}
        </div>

        {/* RIGHT ACCOUNT AREA */}
        <div ref={ref} className="ml-auto flex items-center gap-3 relative">
          {/* SLIDE PANEL */}
          <div
            className={`
              flex items-center gap-3 overflow-hidden
              transition-all duration-300 ease-in-out
              ${open ? "w-[260px] opacity-100" : "w-0 opacity-0"}
            `}
          >
            {/* USER VAR */}
            {user ? (
              <button
                onClick={logout}
                className="whitespace-nowrap text-sm text-red-500 font-semibold"
              >
                Çıkış
              </button>
            ) : (
              <>
                {/* USER YOK LOGIC AYNI */}
                {!user &&
                  programSetting === "public" &&
                  favoriSetting === "public" && (
                    <>
                      <NavBtn href="/login">Giriş Yap</NavBtn>
                      <PrimaryBtn href="/register">Kayıt Ol</PrimaryBtn>
                    </>
                  )}

                {!user &&
                  programSetting === "auth" &&
                  favoriSetting === "public" && (
                    <>
                      <NavBtn href="/login">Giriş Yap</NavBtn>
                      <PrimaryBtn href="/register">Kayıt Ol</PrimaryBtn>
                    </>
                  )}

                {!user &&
                  programSetting === "public" &&
                  favoriSetting === "auth" && (
                    <>
                      <NavBtn href="/login">Giriş Yap</NavBtn>
                      <PrimaryBtn href="/register">Kayıt Ol</PrimaryBtn>
                    </>
                  )}

                {!user &&
                  programSetting === "auth" &&
                  favoriSetting === "auth" && (
                    <>
                      <NavBtn href="/login">Giriş Yap</NavBtn>
                      <PrimaryBtn href="/register">Kayıt Ol</PrimaryBtn>
                    </>
                  )}
              </>
            )}
          </div>

          {/* HESAP BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="px-4 h-10 rounded-full bg-gray-900 text-white text-sm font-medium transition"
          >
            {open ? "✕" : "Hesap"}
          </button>
        </div>

        {/* MOBILE */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden h-10 w-10 rounded-lg border ml-3"
        >
          ☰
        </button>
      </nav>
    </header>
  );
}

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-gray-700 hover:text-emerald-600"
    >
      {children}
    </Link>
  );
}

function NavBtn({ href, children }) {
  return (
    <Link
      href={href}
      className="px-3 py-2 rounded-lg text-sm hover:bg-gray-100 whitespace-nowrap"
    >
      {children}
    </Link>
  );
}

function PrimaryBtn({ href, children }) {
  return (
    <Link
      href={href}
      className="px-4 py-2 rounded-lg text-sm bg-emerald-500 text-white hover:bg-emerald-600 whitespace-nowrap"
    >
      {children}
    </Link>
  );
}
