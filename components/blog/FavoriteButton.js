"use client";

import { useEffect, useState } from "react";
import { toggleFavorite } from "@/lib/api";

export default function FavoriteButton({ blogId, initial }) {
  const [fav, setFav] = useState(initial);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (!token) return null;

  const click = async () => {
    setFav((p) => !p);
    await toggleFavorite(blogId, token);
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
