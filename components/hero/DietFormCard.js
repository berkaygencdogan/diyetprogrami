"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { setUserData } from "@/store/dietSlice";

export default function DietHeroCard() {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);

    dispatch(
      setUserData({
        boy: Number(f.get("boy")),
        kilo: Number(f.get("kilo")),
        yas: Number(f.get("yas")),
        cinsiyet: f.get("cinsiyet"),
        hedef: f.get("hedef"),
      }),
    );
  };

  return (
    <div className="relative mx-auto w-full md:w-[800px] overflow-hidden rounded-[32px] shadow-[0_30px_80px_rgba(0,0,0,0.12)]">
      {/* CARD BACKGROUND (woman-bg) */}
      <Image
        src="/images/woman-bg.png"
        alt=""
        fill
        priority
        aria-hidden
        className="object-cover"
      />

      {/* CONTENT */}
      <div className="relative z-10 grid grid-cols-1 items-center gap-8 p-4 md:grid-cols-2 md:p-8">
        {/* FORM */}
        <div className="rounded-2xl bg-white/95 p-5 shadow-lg backdrop-blur md:p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Bilgilerini Gir
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              name="boy"
              type="number"
              placeholder="Boy (cm)"
              required
              className="h-11 w-full rounded-xl border px-4 text-sm"
            />

            <input
              name="kilo"
              type="number"
              placeholder="Kilo (kg)"
              required
              className="h-11 w-full rounded-xl border px-4 text-sm"
            />

            <input
              name="yas"
              type="number"
              placeholder="Yaş"
              required
              className="h-11 w-full rounded-xl border px-4 text-sm"
            />

            <select
              name="cinsiyet"
              required
              className="h-11 w-full rounded-xl border px-4 text-sm"
            >
              <option value="">Cinsiyet</option>
              <option value="kadin">Kadın</option>
              <option value="erkek">Erkek</option>
            </select>

            <select
              name="hedef"
              required
              className="h-11 w-full rounded-xl border px-4 text-sm"
            >
              <option value="">Hedef</option>
              <option value="kilo-ver">Kilo Vermek</option>
              <option value="kilo-al">Kilo Almak</option>
              <option value="koru">Korumak</option>
            </select>

            <button
              type="submit"
              className="mt-2 h-12 w-full rounded-xl bg-emerald-600 text-sm font-semibold text-white transition hover:bg-emerald-700 active:scale-[0.98]"
            >
              Hedefine Ulaş
            </button>
          </form>
        </div>

        {/* WOMAN */}
        <div className="relative flex justify-center items-end">
          <Image
            src="/images/woman.png"
            alt="Uzman diyetisyen ile kişisel diyet programı"
            width={700}
            height={520}
            priority
            className="max-w-none object-contain"
          />
        </div>
      </div>
    </div>
  );
}
