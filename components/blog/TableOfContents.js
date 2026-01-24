export default function TableOfContents({ items }) {
  if (!items.length) return null;

  return (
    <aside className="mb-8 rounded-2xl border bg-gray-50 p-4">
      <h3 className="mb-3 text-sm font-bold text-gray-700">📑 İçindekiler</h3>

      <ul className="space-y-2 text-sm">
        {items.map((i) => (
          <li key={i.id} className={i.level === 3 ? "ml-4 text-gray-600" : ""}>
            <a href={`#${i.id}`} className="hover:text-emerald-600">
              {i.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
