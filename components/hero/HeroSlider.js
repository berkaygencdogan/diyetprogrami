"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroSlider() {
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sliders`)
      .then((r) => r.json())
      .then(setSlides);
  }, []);

  // ⏱️ 5 saniye sonra kay
  useEffect(() => {
    if (!slides.length) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides]);

  if (!slides.length) return null;

  return (
    <section className="relative mx-auto mt-10 max-w-7xl overflow-hidden rounded-3xl">
      {/* SLIDES */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((s) => (
          <Link
            key={s.id}
            href={s.link || "#"}
            className="relative h-[220px] w-full shrink-0 sm:h-[260px] md:h-[300px]"
          >
            {/* IMAGE */}
            <Image
              src={s.image}
              alt={s.title || "Slider görseli"}
              fill
              unoptimized
              className="object-cover"
              priority
            />

            {/* 🔥 OVERLAY + TEXT → SADECE BAŞLIK VARSA */}
            {s.title && (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

                <div className="absolute inset-0 flex items-center">
                  <div className="px-6 text-white">
                    <h2 className="max-w-lg text-lg font-bold leading-snug sm:text-xl md:text-2xl">
                      {s.title}
                    </h2>
                  </div>
                </div>
              </>
            )}
          </Link>
        ))}
      </div>

      {/* DOTS */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full transition ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
