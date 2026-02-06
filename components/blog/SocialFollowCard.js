"use client";

import Link from "next/link";

const socials = [
  {
    name: "Facebook",
    label: "Beğen",
    href: "https://facebook.com/",
    color: "bg-[#1877F2]",
    icon: "f",
  },
  {
    name: "X",
    label: "Takip",
    href: "https://x.com/",
    color: "bg-black",
    icon: "𝕏",
  },
  {
    name: "LinkedIn",
    label: "Takip",
    href: "https://linkedin.com/",
    color: "bg-[#0A66C2]",
    icon: "in",
  },
  {
    name: "Pinterest",
    label: "Takip",
    href: "https://pinterest.com/",
    color: "bg-[#E60023]",
    icon: "P",
  },
  {
    name: "YouTube",
    label: "Abone",
    href: "https://youtube.com/",
    color: "bg-[#FF0000]",
    icon: "▶",
  },
  {
    name: "Instagram",
    label: "Takip",
    href: "https://instagram.com/",
    color: "bg-gradient-to-r from-pink-500 to-purple-500",
    icon: "📸",
  },
  {
    name: "WhatsApp",
    label: "Mesaj",
    href: "https://wa.me/",
    color: "bg-[#25D366]",
    icon: "💬",
  },
  {
    name: "Telegram",
    label: "Katıl",
    href: "https://t.me/",
    color: "bg-[#229ED9]",
    icon: "✈️",
  },
  {
    name: "TikTok",
    label: "Takip",
    href: "https://tiktok.com/",
    color: "bg-black",
    icon: "♪",
    wide: true,
  },
];

export default function SocialFollowCard() {
  return (
    <div
      className="rounded-3xl bg-white/80 backdrop-blur-xl p-6
      border border-gray-100
      shadow-[0_20px_60px_-20px_rgba(0,0,0,0.15)]"
    >
      <div className="mb-4 flex items-center gap-3">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-full
          bg-emerald-50 text-emerald-600"
        >
          🤝
        </span>
        <h3 className="w-full text-base font-semibold text-gray-800">
          Bize Katılın
          <div className="mt-1 h-px w-full border-2 border-red-500" />
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {socials.map((s, i) => (
          <Link
            key={i}
            href={s.href}
            target="_blank"
            className={`
              ${s.color}
              ${s.wide ? "col-span-2" : ""}
              group flex items-center justify-between
              rounded-xl px-4 py-3 text-sm font-semibold
              text-white
              transition-all duration-200
              hover:scale-[1.02] hover:shadow-lg
            `}
          >
            <span className="flex items-center gap-2">
              <span className="text-base">{s.icon}</span>
              {s.label}
            </span>
            <span className="opacity-60 group-hover:opacity-100">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
