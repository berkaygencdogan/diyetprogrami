const API = process.env.NEXT_PUBLIC_API_URL;

export async function fetchCategories() {
  const res = await fetch(`${API}/api/categories`, { cache: "no-store" });
  return res.json();
}

export async function fetchBlogsByCategory(slug) {
  const res = await fetch(`${API}/api/blog/category/${slug}`, {
    cache: "no-store",
  });
  return res.json();
}

export async function fetchLatestBlogs() {
  const res = await fetch(`${API}/api/blog/latest`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Bloglar alınamadı");
  return res.json();
}

export async function searchBlogs(q) {
  if (!q || q.length < 2) return [];

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blog/search?q=${encodeURIComponent(q)}`,
    { cache: "no-store" },
  );

  if (!res.ok) throw new Error("Arama hatası");
  return res.json();
}
