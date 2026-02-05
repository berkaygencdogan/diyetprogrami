import HeroSlider from "@/components/hero/HeroSlider";
import PopularBlogs from "@/components/blog/PopularBlog";
import CategoryPage from "@/components/hero/CategoryPage";
import FeaturedPostsSlider from "@/components/hero/FeaturedPostsSlider";
import HomeComments from "@/components/hero/HomeComments";
import HorizontalAd from "@/components/ads/HorizontalAd";
import VerticalAd from "@/components/ads/VerticalAd";

export default async function HomePage() {
  return (
    <main>
      <HeroSlider />

      <div className="relative mt-16">
        <aside className="hidden xl:block absolute left-0 top-0 h-full">
          <VerticalAd slotId="HOME_LEFT_1" position="left" />
        </aside>

        <aside className="hidden xl:block absolute right-0 top-0 h-full">
          <VerticalAd slotId="HOME_RIGHT_1" position="right" />
        </aside>

        <div className="mx-auto max-w-7xl px-4">
          <FeaturedPostsSlider />
          <HorizontalAd slotId="HOME_HORIZONTAL_1" />
          <PopularBlogs />
          <HorizontalAd slotId="HOME_HORIZONTAL_2" />
          <CategoryPage />
          <HorizontalAd slotId="HOME_HORIZONTAL_3" />
        </div>

        <div className="mx-auto max-w-7xl px-4">
          <HomeComments />
          <div className="my-16">
            <HorizontalAd slotId="HOME_HORIZONTAL_4" />
          </div>
        </div>
      </div>
    </main>
  );
}
