"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Giriş başarısız");
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    window.dispatchEvent(new Event("auth-change"));

    router.push("/");
  };

  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <h1 className="mb-6 text-2xl font-bold">Giriş Yap</h1>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={submit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-xl border p-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Şifre"
          className="w-full rounded-xl border p-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full rounded-xl bg-emerald-600 py-3 text-white font-semibold">
          Giriş Yap
        </button>
      </form>
    </main>
  );
}
