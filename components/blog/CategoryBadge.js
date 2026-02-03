export default function CategoryBadge({ name, color }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white"
      style={{ backgroundColor: color || "#10b981" }}
    >
      {name}
    </span>
  );
}
