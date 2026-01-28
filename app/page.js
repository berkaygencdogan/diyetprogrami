import HeroPremium from "@/components/hero/HeroPremium";
import HeroText from "@/components/hero/HeroText";
import DietHeroCard from "@/components/hero/DietFormCard";
import FeaturedPostsSlider from "@/components/hero/FeaturedPostsSlider";
import CategorySections from "@/components/hero/CategorySections";
import HeroSlider from "@/components/hero/HeroSlider";
import HomeComments from "@/components/hero/HomeComments";
import PopularBlogs from "@/components/blog/PopularBlog";
import Image from 'next/image';

function VerticalAd({ position }) {
  return (
    <div
      className={`sticky top-28 h-[600px] w-[160px] rounded-xl border overflow-hidden
      ${position === "left" ? "ml-6" : "mr-6"}`}
    >
 <Image
  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80"
  alt="Sağlıklı beslenme ve kilo kontrolü - taze sebzeler ve meyveler"
  fill
  className="object-cover"
/>
    </div>
  );
}
function BottomBannerAd() {
  return (
    <div className="my-16">
      <div className="relative w-full h-[90px] rounded-xl border overflow-hidden">
<Image
  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80"
  alt="Dengeli beslenme ile formda kalın - meyve sebze tabağı"
  fill
  className="object-cover"
/>    {/* İstersen üstüne yarı saydam CTA katmanı ekle */}
        {/* <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <span className="text-white text-xl font-bold">Şimdi Başla → Ücretsiz Diyet Planı</span>
        </div> */}
      </div>
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
