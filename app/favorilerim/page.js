import { getMyFavorites } from "@/lib/api";
import BlogGridCard from "@/components/blog/BlogGridCard";

export default async function FavoritesPage() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (!token) {
    return <div className="p-10">Giriş yapmalısın</div>;
  }

  const blogs = await getMyFavorites(token);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">❤️ Favorilerim</h1>

      {blogs.length === 0 && (
        <p className="text-sm text-gray-500">Henüz favori yazın yok.</p>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        {blogs.map((b) => (
          <BlogGridCard key={b.id} post={b} />
        ))}
      </div>
    </main>
  );
}
