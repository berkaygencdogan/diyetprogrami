"use client";

import { useEffect, useState } from "react";
import { toggleFavorite, checkFavorite } from "@/lib/api";

export default function FavoriteButton({ blogId }) {
  const [fav, setFav] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (!t) {
      setLoading(false);
      return;
    }

    setToken(t);

    // 🔍 DB KONTROLÜ
    checkFavorite(blogId, t)
      .then((res) => setFav(res.isFavorite))
      .finally(() => setLoading(false));
  }, [blogId]);

  if (!token || loading) return null;

  const click = async () => {
    const next = !fav;
    setFav(next); // 🔥 optimistic

    try {
      await toggleFavorite(blogId, token);
    } catch {
      setFav(!next); // rollback
    }
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
