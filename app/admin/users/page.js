"use client";

import { useEffect, useState } from "react";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  const load = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    setUsers(await res.json());
  };

  useEffect(() => {
    load();
  }, []);

  const updateRole = async (id, role) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role }),
    });
    load();
  };

  const remove = async (id) => {
    if (!confirm("Silmek istiyor musun?")) return;

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    load();
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">Kullanıcılar</h1>

      <table className="w-full rounded-xl overflow-hidden border">
        <thead className="bg-gray-100 text-sm">
          <tr>
            <th className="p-3 text-left">Email</th>
            <th>Rol</th>
            <th className="w-40">İşlem</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t text-sm">
              <td className="p-3">{u.email}</td>

              <td>
                <select
                  value={u.role}
                  onChange={(e) => updateRole(u.id, e.target.value)}
                  className="rounded border px-2 py-1"
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </td>

              <td className="text-center">
                <button
                  onClick={() => remove(u.id)}
                  className="text-red-600 text-sm"
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
