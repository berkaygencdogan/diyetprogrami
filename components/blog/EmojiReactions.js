"use client";

import { useEffect, useState } from "react";
import { fetchReactions } from "@/lib/api";
import { getGuestId } from "@/lib/guest";

// ❗ DOĞRU ICON IMPORTLARI
import { FaFacebookF, FaLinkedinIn, FaPinterestP, FaVk } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const EMOJIS = ["👍", "❤️", "😮", "😂", "😢"];

export default function EmojiReactions({ blogId, blogTitle }) {
  const [reactions, setReactions] = useState([]);
  const [shareLinks, setShareLinks] = useState({});

  const loadReactions = async () => {
    const data = await fetchReactions(blogId);
    setReactions(data);
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/settings/public`)
      .then((r) => r.json())
      .then((data) => {
        setShareLinks({
          facebook: data.share_facebook,
          twitter: data.share_twitter,
          linkedin: data.share_linkedin,
          pinterest: data.share_pinterest,
          vk: data.share_vk,
        });
      });

    loadReactions();
  }, [blogId]);

  /* ================= REACTION ================= */

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

    loadReactions();
  };

  const getCount = (emoji) =>
    reactions.find((r) => r.emoji === emoji)?.count || 0;

  return (
    <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white/80 p-4 shadow">
      {/* SOL */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-2 text-sm font-semibold text-gray-600">
          Tepki ver:
        </span>

        {EMOJIS.map((e) => (
          <button
            key={e}
            onClick={() => onClick(e)}
            className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-lg transition hover:bg-emerald-50"
          >
            <span>{e}</span>
            <span className="text-xs text-gray-600">{getCount(e)}</span>
          </button>
        ))}

        {/* PAYLAŞ */}
        <div className="ml-4 flex items-center gap-3">
          <span className="text-sm font-medium text-gray-500">Paylaşın: </span>

          {shareLinks.facebook && (
            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition hover:text-[#1877F2]"
              aria-label="Facebook"
            >
              <FaFacebookF size={18} />
            </a>
          )}

          {shareLinks.twitter && (
            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition hover:text-black"
              aria-label="X"
            >
              <FaXTwitter size={18} />
            </a>
          )}

          {shareLinks.linkedin && (
            <a
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition hover:text-[#0A66C2]"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn size={18} />
            </a>
          )}

          {shareLinks.pinterest && (
            <a
              href={shareLinks.pinterest}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition hover:text-[#E60023]"
              aria-label="Pinterest"
            >
              <FaPinterestP size={18} />
            </a>
          )}

          {shareLinks.vk && (
            <a
              href={shareLinks.vk}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition hover:text-[#4C75A3]"
              aria-label="VK"
            >
              <FaVk size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
