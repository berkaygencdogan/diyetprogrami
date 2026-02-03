import HeroPremium from "@/components/hero/HeroPremium";
import HeroText from "@/components/hero/HeroText";
import DietHeroCard from "@/components/hero/DietFormCard";
import FeaturedPostsSlider from "@/components/hero/FeaturedPostsSlider";
import HeroSlider from "@/components/hero/HeroSlider";
import HomeComments from "@/components/hero/HomeComments";
import PopularBlogs from "@/components/blog/PopularBlog";
import CategoryPage from "@/components/hero/CategoryPage";
import HorizontalAd from "@/components/ads/HorizontalAd";
import { VerticalAd } from "@/components/ads/VerticalAd";

export default function HomePage() {
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
        <HeroPremium>
          <HeroText />
          <DietHeroCard />
        </HeroPremium>
        <div className="mx-auto max-w-7xl px-4">
          <HomeComments />

          {/* ALT BANNER */}
          <div className="my-16">{/* <HorizontalAd /> */}</div>
        </div>
      </div>
    </main>
  );
}
