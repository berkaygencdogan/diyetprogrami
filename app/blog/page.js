import { fetchBlogs } from "@/lib/api";
import BlogGridCard from "@/components/blog/BlogGridCard";
import FeaturedPost from "@/components/blog/FeaturedPost";
import BlogSearch from "@/components/blog/BlogSearch";
import { fetchRenderedSeo } from "@/lib/seo";
import VerticalAd from "@/components/ads/VerticalAd";

export async function generateMetadata() {
  return await fetchRenderedSeo({ page_key: "blog" });
}

export default async function BlogPage({ searchParams }) {
  const { q = "" } = await searchParams;
  const query = q.toLowerCase();

  const blogs = await fetchBlogs();
  const filtered = query
    ? blogs.filter((b) => b.title.toLowerCase().includes(query))
    : blogs;

  const featured = filtered[0];
  const others = filtered.slice(1);

  return (
    <main
      className="
        relative
        min-h-screen
        bg-[url('/images/blog-bg.png')]
        bg-cover
        bg-center
        bg-no-repeat
      "
    >
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px]" />
      <aside className="hidden xl:block absolute left-0 top-0 h-full">
        <VerticalAd slotId="BLOG_LEFT_1" position="left" />
      </aside>
      <aside className="hidden xl:block absolute right-0 top-0 h-full">
        <VerticalAd slotId="BLOG_RIGHT_1" position="right" />
      </aside>
      {/* CONTENT */}
      <section className="relative mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900">Blog</h1>

        <BlogSearch />

        {featured && <FeaturedPost post={featured} />}

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {others.map((post) => (
            <BlogGridCard key={post.id} post={post} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-sm text-gray-500">
            Aramanıza uygun yazı bulunamadı.
          </p>
        )}
      </section>
    </main>
  );
}
