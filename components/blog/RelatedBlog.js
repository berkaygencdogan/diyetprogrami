import Link from "next/link";

export default function RelatedBlogs({ blogs }) {
  if (!blogs?.length) return null;

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
          bg-indigo-50 text-indigo-600"
        >
          🧩
        </span>
        <h3 className="text-base font-semibold text-gray-800">
          Benzer Yazılar
        </h3>
      </div>

      <ul className="space-y-3">
        {blogs.map((b) => (
          <li key={b.id}>
            <Link
              href={`/blog/${b.slug}`}
              className="group block rounded-2xl border border-gray-200
                px-4 py-3 text-sm font-medium text-gray-700
                transition-all duration-200
                hover:-translate-y-0.5
                hover:border-indigo-400
                hover:bg-indigo-50
                hover:shadow-md"
            >
              <span className="line-clamp-2">{b.title}</span>

              <span
                className="mt-2 flex items-center gap-1 text-xs
                text-indigo-600 opacity-0
                transition group-hover:opacity-100"
              >
                Yazıyı oku
                <span className="translate-x-[-2px] transition group-hover:translate-x-0">
                  →
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
