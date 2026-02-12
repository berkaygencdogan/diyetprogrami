import Link from "next/link";

async function fetchTags() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tags`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function TagsPage() {
  const tags = await fetchTags();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Tüm Etiketler</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {tags.map((tag) => (
          <Link
            key={tag.id}
            href={`/tags/${tag.slug}`}
            className="border rounded-xl p-4 hover:shadow-lg transition bg-white text-center"
          >
            <p className="font-semibold text-emerald-600">#{tag.name}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
