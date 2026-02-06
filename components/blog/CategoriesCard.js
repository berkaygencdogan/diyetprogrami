import Link from "next/link";

export default function CategoriesCard({ categories }) {
  const HIDDEN_CATEGORY_IDS = [4, 5];

  const visibleCategories = categories.filter(
    (c) => !HIDDEN_CATEGORY_IDS.includes(c.id),
  );
  return (
    <div
      className="
        rounded-3xl bg-white/80 backdrop-blur-xl p-6
        border border-gray-100
        shadow-[0_20px_60px_-20px_rgba(0,0,0,0.15)]
      "
    >
      {/* HEADER */}
      <div className="mb-5 flex items-center gap-3">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full
          bg-emerald-50 text-emerald-600"
        >
          📂
        </span>
        <h3 className="w-full text-base font-semibold text-gray-800">
          Kategoriler
          <div className="mt-1 h-px w-full border-2 border-yellow-600" />
        </h3>
      </div>

      {/* LIST */}
      <ul className="space-y-3">
        {visibleCategories.map((c) => (
          <li key={c.id}>
            <Link
              href={`/kategori/${c.slug}`}
              style={{
                backgroundColor: c.color,
                boxShadow: `0 10px 30px ${c.color}55`,
              }}
              className="
                group flex items-center justify-between
                rounded-2xl px-4 py-3
                text-sm font-semibold text-white
                transition-all duration-200
                hover:-translate-y-0.5
                hover:shadow-xl
              "
            >
              <span>{c.name}</span>

              <span className="opacity-0 transition group-hover:opacity-100">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
