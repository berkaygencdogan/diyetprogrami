"use client";

import { useEffect, useState } from "react";
import { fetchDashboardStats } from "@/lib/adminApi";

export default function AdminHome() {
  const [stats, setStats] = useState(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) return;

    fetchDashboardStats(token).then(setStats);
  }, [token]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2 text-gray-600">Yönetim paneline hoş geldiniz.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-white p-4 shadow">
          <div className="text-sm text-gray-500">Toplam Blog</div>
          <div className="text-2xl font-bold">{stats ? stats.blogs : "—"}</div>
        </div>

        <div className="rounded-xl bg-white p-4 shadow">
          <div className="text-sm text-gray-500">Bekleyen Yorum</div>
          <div className="text-2xl font-bold text-amber-600">
            {stats ? stats.pendingComments : "—"}
          </div>
        </div>

        <div className="rounded-xl bg-white p-4 shadow">
          <div className="text-sm text-gray-500">Kullanıcı</div>
          <div className="text-2xl font-bold">{stats ? stats.users : "—"}</div>
        </div>
      </div>
    </div>
  );
}
