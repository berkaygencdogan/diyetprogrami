import HeroSlider from "@/components/hero/HeroSlider";
import PopularBlogs from "@/components/blog/PopularBlog";
import CategoryPage from "@/components/hero/CategoryPage";
import FeaturedPostsSlider from "@/components/hero/FeaturedPostsSlider";
import HomeComments from "@/components/hero/HomeComments";
import HorizontalAd from "@/components/ads/HorizontalAd";
import VerticalAd from "@/components/ads/VerticalAd";

export default async function HomePage() {
  const slides = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sliders`, {
    cache: "no-store",
  }).then((r) => r.json());

  return (
    <main>
      {/* HERO – LCP + sabit yükseklik */}
      <section className="min-h-[420px]">
        <HeroSlider slides={slides} />
      </section>

      {/* MAIN CONTENT */}
      <section className="relative mt-16 min-h-[1400px]">
        {/* LEFT AD */}
        <aside className="hidden xl:block absolute left-0 top-0 min-h-[600px]">
          <VerticalAd slotId="HOME_LEFT_1" position="left" />
        </aside>

        {/* RIGHT AD */}
        <aside className="hidden xl:block absolute right-0 top-0 min-h-[600px]">
          <VerticalAd slotId="HOME_RIGHT_1" position="right" />
        </aside>

        <div className="mx-auto max-w-7xl px-4">
          {/* FEATURED POSTS */}
          <section className="min-h-[300px]">
            <FeaturedPostsSlider />
          </section>

          {/* AD */}
          <div className="my-12">
            <HorizontalAd slotId="HOME_HORIZONTAL_1" />
          </div>

          {/* POPULAR BLOGS */}
          <section className="min-h-[360px]">
            <PopularBlogs />
          </section>

          {/* AD */}
          <div className="my-12">
            <HorizontalAd slotId="HOME_HORIZONTAL_2" />
          </div>

          {/* CATEGORY PAGE */}
          <section className="min-h-[800px]">
            <CategoryPage />
          </section>

          {/* AD */}
          <div className="my-12">
            <HorizontalAd slotId="HOME_HORIZONTAL_3" />
          </div>
        </div>
      </section>

      {/* COMMENTS */}
      <section className="mx-auto max-w-7xl px-4 min-h-[400px]">
        <HomeComments />
      </section>

      {/* LAST AD */}
      <div className="mx-auto max-w-7xl px-4 my-16">
        <HorizontalAd slotId="HOME_HORIZONTAL_4" />
      </div>
    </main>
  );
}
