"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getToken, getUser } from "@/lib/auth";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/admin-login") return;

    const token = getToken();
    const user = getUser();

    if (!token || !user) {
      window.location.replace("/admin-login");
      return;
    }

    if (!["editor", "admin"].includes(user.role)) {
      window.location.replace("/admin-login");
      return;
    }
  }, [pathname]);

  // login sayfasında sidebar yok
  if (pathname === "/admin-login") {
    return children;
  }

  return (
    <div className="flex min-h-screen bg-[#f8faf9]">
      <Sidebar />

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
