"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AutoBreadcrumb() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  const parts = pathname.split("/").filter(Boolean);

  return (
    <div className="w-fulls bg-gray-100 py-4">
      <div className="mx-55 max-w-7xl text-sm text-gray-600">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-emerald-600">
              Ana Sayfa
            </Link>
          </li>

          {parts.map((part, i) => {
            const href = "/" + parts.slice(0, i + 1).join("/");
            const isLast = i === parts.length - 1;

            const label = decodeURIComponent(part)
              .replace(/-/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase());

            return (
              <li key={i} className="flex items-center gap-2">
                <span className="text-gray-400">›</span>

                {isLast ? (
                  <span className="font-semibold text-gray-900">{label}</span>
                ) : (
                  <Link href={href} className="hover:text-emerald-600">
                    {label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
