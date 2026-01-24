import HeroPremium from "@/components/hero/HeroPremium";
import HeroText from "@/components/hero/HeroText";
import DietHeroCard from "@/components/hero/DietFormCard";
import FeaturedPostsSlider from "@/components/hero/FeaturedPostsSlider";
import CategorySections from "@/components/hero/CategorySections";
import HeroSlider from "@/components/hero/HeroSlider";
import HomeComments from "@/components/hero/HomeComments";
import PopularBlogs from "@/components/blog/PopularBlog";

function VerticalAd({ position }) {
  return (
    <div
      className={`sticky top-28 h-[600px] w-[160px] rounded-xl border bg-gray-50
      flex items-center justify-center text-xs text-gray-400
      ${position === "left" ? "ml-6" : "mr-6"}`}
    >
      Dikey Reklam
      <br />
      160×600
    </div>
  );
}

function BottomBannerAd() {
  return (
    <div className="h-[90px] w-full rounded-xl border bg-gray-50 flex items-center justify-center text-sm text-gray-400">
      Banner Reklam Alanı (728×90 / 100%)
    </div>
  );
}

export default function HomePage() {
  return (
    <main>
      <HeroSlider />
      {/* 🔽 SAYFA GÖVDESİ */}
      <div className="relative mt-16">
        {/* SOL REKLAM */}
        <aside className="hidden xl:block absolute left-0 top-0 h-full">
          <VerticalAd position="left" />
        </aside>

        {/* SAĞ REKLAM */}
        <aside className="hidden xl:block absolute right-0 top-0 h-full">
          <VerticalAd position="right" />
        </aside>

        {/* ANA İÇERİK */}
        <div className="mx-auto max-w-7xl px-4">
          <FeaturedPostsSlider />
          <PopularBlogs />
          <CategorySections />
        </div>
        <HeroPremium>
          <HeroText />
          <DietHeroCard />
        </HeroPremium>
        <div className="mx-auto max-w-7xl px-4">
          <HomeComments />

          {/* ALT BANNER */}
          <div className="my-16">
            <BottomBannerAd />
          </div>
        </div>
      </div>
    </main>
  );
}
