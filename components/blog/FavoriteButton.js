"use client";

import { useEffect, useState } from "react";
import { getGuestId } from "@/lib/guest";

export default function FavoriteButton({ blogId }) {
  const [fav, setFav] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const guestId = getGuestId();

    let url = `${process.env.NEXT_PUBLIC_API_URL}/api/favorites/check/${blogId}`;
    const headers = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    } else {
      url += `?guest_id=${guestId}`;
    }

    fetch(url, { headers })
      .then((r) => r.json())
      .then((res) => setFav(res.isFavorite))
      .finally(() => setLoading(false));
  }, [blogId]);

  if (loading) return null;

  const click = async () => {
    if (saving) return;
    setSaving(true);

    const token = localStorage.getItem("token");
    const guestId = getGuestId();

    let url = `${process.env.NEXT_PUBLIC_API_URL}/api/favorites/${blogId}`;
    const headers = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    } else {
      url += `?guest_id=${guestId}`;
    }

    setFav((prev) => !prev);

    const res = await fetch(url, { method: "POST", headers });
    if (!res.ok) {
      setFav((prev) => !prev);
    }

    setSaving(false);
  };

  return (
    <button
      onClick={click}
      className={`mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition
        ${
          fav
            ? "bg-emerald-600 text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }
      `}
    >
      {fav ? "❤️ Favorilerde" : "🤍 Favoriye Ekle"}
    </button>
  );
}
