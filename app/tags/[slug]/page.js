import BlogGridCard from "@/components/blog/BlogGridCard";

async function fetchBlogs(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/tags/${slug}/blogs`,
    { cache: "no-store" },
  );

  return res.json();
}

async function fetchTag(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/tags/${slug}`,
    { cache: "no-store" },
  );

  return res.json();
}

export default async function TagDetailPage({ params }) {
  const { slug } = await params;

  const [blogs, tag] = await Promise.all([fetchBlogs(slug), fetchTag(slug)]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">#{tag.name} Etiketli Yazılar</h1>

      {blogs.length === 0 ? (
        <p className="text-gray-500">Bu etikete ait yazı bulunamadı.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogGridCard key={blog.id} post={blog} />
          ))}
        </div>
      )}
    </main>
  );
}
