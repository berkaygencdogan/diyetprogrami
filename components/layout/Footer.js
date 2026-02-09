"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 min-h-[320px] border-t bg-green-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* TOP */}
        <div className="grid gap-10 md:grid-cols-4">
          {/* LOGO / ABOUT */}
          <div>
            <div className="text-xl font-bold text-emerald-400">
              DiyetProgramı
            </div>
            <p className="mt-3 text-sm text-white/80">
              Sağlıklı yaşam, dengeli beslenme ve sürdürülebilir diyet
              alışkanlıkları için hazırlanmış içerikler.
            </p>
          </div>

          {/* MENU */}
          <div>
            <h4 className="text-sm font-semibold text-white">Sayfalar</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-white/70 hover:text-emerald-400 transition"
                >
                  Anasayfa
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-white/70 hover:text-emerald-400 transition"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* BLOG */}
          <div>
            <h4 className="text-sm font-semibold text-white">İçerik</h4>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li>Diyet Listeleri</li>
              <li>Sağlıklı Tarifler</li>
              <li>Beslenme Rehberleri</li>
            </ul>
          </div>

          {/* ADMIN / LEGAL */}
          <div>
            <h4 className="text-sm font-semibold text-white">Diğer</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="text-white/70">Gizlilik Politikası</li>
              <li className="text-white/70">KVKK</li>
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-12 border-t border-white/20 pt-6 text-center text-xs text-white/60">
          © {new Date().getFullYear()} DiyetProgramı • Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
