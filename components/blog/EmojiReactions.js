"use client";

import { useEffect, useState } from "react";
import { fetchReactions, toggleReaction } from "@/lib/api";
import { getGuestId } from "@/lib/guest";

const EMOJIS = ["👍", "❤️", "😮", "😂", "😢"];

export default function EmojiReactions({ blogId, blogTitle }) {
  const [reactions, setReactions] = useState([]);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const load = async () => {
    const data = await fetchReactions(blogId);
    setReactions(data);
  };

  useEffect(() => {
    load();
  }, [blogId]);

  const onClick = async (emoji) => {
    const token = localStorage.getItem("token");
    const guestId = getGuestId();

    let url = `${process.env.NEXT_PUBLIC_API_URL}/api/reactions/${blogId}`;
    const headers = { "Content-Type": "application/json" };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    } else {
      url += `?guest_id=${guestId}`;
    }

    await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ emoji }),
    });

    load();
  };

  const getCount = (emoji) =>
    reactions.find((r) => r.emoji === emoji)?.count || 0;

  const share = async () => {
    const url = window.location.href;

    if (navigator.share) {
      await navigator.share({
        title: blogTitle,
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
      alert("🔗 Link kopyalandı");
    }
  };

  return (
    <div
      className="
        mt-10
        flex flex-wrap items-center justify-between gap-4
        rounded-2xl bg-white/80 p-4
        shadow
      "
    >
      {/* SOL: EMOJİLER */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-2 text-sm font-semibold text-gray-600">
          Tepki ver:
        </span>

        {EMOJIS.map((e) => (
          <button
            key={e}
            onClick={() => onClick(e)}
            className="
              flex items-center gap-1
              rounded-full bg-gray-100 px-3 py-1
              text-lg
              transition
              hover:bg-emerald-50
            "
          >
            <span>{e}</span>
            <span className="text-xs text-gray-600">{getCount(e)}</span>
          </button>
        ))}
        <button
          onClick={share}
          className="
            flex items-center gap-2
            rounded-xl bg-gray-100 px-4 py-2
            text-sm font-medium text-gray-700
            transition hover:bg-emerald-50
          "
        >
          🔗 Paylaş
        </button>
      </div>

      {/* SAĞ: AKSİYONLAR */}
      <div className="flex items-center gap-2"></div>
    </div>
  );
}
