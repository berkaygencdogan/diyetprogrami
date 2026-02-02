import Link from "next/link";

export default function CategoriesCard({ categories }) {
  return (
    <div
      className="rounded-3xl bg-white/80 backdrop-blur-xl p-6
      border border-gray-100
      shadow-[0_20px_60px_-20px_rgba(0,0,0,0.15)]"
    >
      {/* HEADER */}
      <div className="mb-5 flex items-center gap-3">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full
          bg-emerald-50 text-emerald-600"
        >
          📂
        </span>
        <h3 className="text-base font-semibold text-gray-800">Kategoriler</h3>
      </div>

      {/* LIST */}
      <ul className="space-y-2">
        {categories.map((c) => (
          <li key={c.id}>
            <Link
              href={`/kategori/${c.slug}`}
              className="group flex items-center justify-between
                rounded-2xl border border-gray-200
                px-4 py-3 text-sm font-medium text-gray-700
                transition-all duration-200
                hover:-translate-y-0.5
                hover:border-emerald-400
                hover:bg-emerald-50
                hover:shadow-md"
            >
              <span>{c.name}</span>

              <span
                className="text-emerald-600 opacity-0
                transition group-hover:opacity-100"
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
