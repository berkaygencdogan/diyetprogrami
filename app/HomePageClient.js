"use client";

import PopularBlogs from "@/components/blog/PopularBlog";
import CategoryPage from "@/components/hero/CategoryPage";
import FeaturedPostsSlider from "@/components/hero/FeaturedPostsSlider";
import HeroSlider from "@/components/hero/HeroSlider";
import HomeComments from "@/components/hero/HomeComments";
import { getGuestId } from "@/lib/guest";
import { useEffect } from "react";

export default function HomePageClient() {
  useEffect(() => {
    getGuestId();
  }, []);
  return (
    <main>
      <HeroSlider />
      {/* <HorizontalAd /> */}
      {/* 🔽 SAYFA GÖVDESİ */}
      <div className="relative mt-16">
        {/* SOL REKLAM */}
        <aside className="hidden xl:block absolute left-0 top-0 h-full">
          {/* <VerticalAd position="left" /> */}
        </aside>

        {/* SAĞ REKLAM */}
        <aside className="hidden xl:block absolute right-0 top-0 h-full">
          {/* <VerticalAd position="right" /> */}
        </aside>

        {/* ANA İÇERİK */}
        <div className="mx-auto max-w-7xl px-4">
          <FeaturedPostsSlider />
          {/* <HorizontalAd /> */}

          <PopularBlogs />
          {/* <HorizontalAd /> */}

          <CategoryPage />
        </div>
        <div className="mx-auto max-w-7xl px-4">
          <HomeComments />

          {/* ALT BANNER */}
          <div className="my-16">{/* <HorizontalAd /> */}</div>
        </div>
      </div>
    </main>
  );
}
