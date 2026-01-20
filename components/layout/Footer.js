"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t bg-green-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* TOP */}
        <div className="grid gap-10 md:grid-cols-4">
          {/* LOGO / ABOUT */}
          <div>
            <div className="text-xl font-bold text-emerald-600">
              DiyetProgramı
            </div>
            <p className="mt-3 text-sm text-white">
              Sağlıklı yaşam, dengeli beslenme ve sürdürülebilir diyet
              alışkanlıkları için hazırlanmış içerikler.
            </p>
          </div>

          {/* MENU */}
          <div>
            <h4 className="text-sm font-semibold text-white-900">Sayfalar</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-white-600 hover:text-emerald-600"
                >
                  Anasayfa
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-white-600 hover:text-emerald-600"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* BLOG */}
          <div>
            <h4 className="text-sm font-semibold text-white-900">İçerik</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="text-white-600">Diyet Listeleri</li>
              <li className="text-white-600">Sağlıklı Tarifler</li>
              <li className="text-white-600">Beslenme Rehberleri</li>
            </ul>
          </div>

          {/* ADMIN / LEGAL */}
          <div>
            <h4 className="text-sm font-semibold text-white-900">Diğer</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/admin-login"
                  className="text-white-600 hover:text-emerald-600"
                >
                  Admin Girişi
                </Link>
              </li>
              <li className="text-white-600">Gizlilik Politikası</li>
              <li className="text-white-600">KVKK</li>
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-12 border-t pt-6 text-center text-xs text-white-500">
          © {new Date().getFullYear()} DiyetProgramı • Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
