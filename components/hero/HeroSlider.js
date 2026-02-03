"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSlider() {
  const [slides, setSlides] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sliders`)
      .then((r) => r.json())
      .then((data) => {
        setSlides(data || []);
        setActiveIndex(0);
      });
  }, []);

  if (!slides.length) return null;

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const active = slides[activeIndex];

  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        {/* ================= MAIN SLIDER ================= */}
        <Link
          href={active.link || "#"}
          className="relative col-span-3 overflow-hidden rounded-xl"
        >
          <Image
            src={active.image}
            alt={active.title || "Slider"}
            width={900}
            height={500}
            className="h-[420px] w-full object-cover"
            priority
            unoptimized
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

          {active.title && (
            <h2 className="absolute bottom-14 left-6 right-6 text-3xl font-bold leading-tight text-white">
              {active.title}
            </h2>
          )}

          {/* NUMBERS */}
          <div className="absolute bottom-2 left-6 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveIndex(i);
                }}
                className={`flex h-8 w-8 items-center justify-center border text-sm font-bold transition
                  ${
                    i === activeIndex
                      ? "bg-white text-black border-white"
                      : "bg-black/60 text-white border-white/40 hover:bg-white hover:text-black"
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* ARROWS */}
          <button
            onClick={(e) => {
              e.preventDefault();
              prevSlide();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2"
          >
            ‹
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              nextSlide();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2"
          >
            ›
          </button>
        </Link>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="flex flex-col gap-4">
          {slides.slice(1, 4).map((item, i) => (
            <div
              key={item.id}
              onClick={() => setActiveIndex(i + 1)}
              className="group relative cursor-pointer overflow-hidden rounded-lg"
            >
              <Image
                src={item.image}
                alt={item.title || "Slider"}
                width={300}
                height={120}
                className="h-[120px] w-full object-cover transition group-hover:scale-105"
                unoptimized
              />

              <div className="absolute inset-0 bg-black/50" />

              {item.title && (
                <p className="absolute bottom-3 left-3 right-3 text-sm font-semibold text-white">
                  {item.title}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
