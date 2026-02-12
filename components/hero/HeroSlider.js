"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSlider({ slides }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const AUTO_SLIDE_DELAY = 3000;

  useEffect(() => {
    if (!slides?.length) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, AUTO_SLIDE_DELAY);

    return () => clearInterval(interval);
  }, [slides]);

  if (!slides?.length) return null;

  const active = slides[activeIndex];

  return (
    <div className="mx-auto max-w-7xl px-4 mt-15">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 ">
        {/* ================= LCP HERO ================= */}
        <Link
          href={active.link || "#"}
          className="relative col-span-3 h-[420px] overflow-hidden rounded-xl border-2 border-[#7FAF9A]"
        >
          <Image
            src={active.image}
            alt={active.title || "Slider"}
            fill
            priority // ✅ LCP için DOĞRU
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          {active.title && (
            <h2 className="absolute bottom-14 left-6 right-6 text-3xl font-bold text-white">
              {active.title}
            </h2>
          )}
        </Link>

        {/* ================= RIGHT SLIDES ================= */}
        <div className="flex flex-col justify-between">
          {slides.slice(1, 4).map((item, i) => (
            <button
              key={item.id}
              onClick={() => setActiveIndex(i + 1)}
              className="group relative overflow-hidden rounded-lg text-left border-2 border-[#7FAF9A]"
              aria-label={`Slayt ${i + 2}`}
            >
              <Image
                src={item.image}
                alt={item.title || "Slider"}
                width={300}
                height={120}
                sizes="(max-width: 640px) 90vw, 300px"
                className="h-[120px] w-full object-cover transition group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/10" />

              {item.title && (
                <p className="absolute bottom-3 left-3 right-3 text-sm font-semibold text-white">
                  {item.title}
                </p>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
