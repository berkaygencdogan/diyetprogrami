"use client";

export default function CategoryFilterBar({ categories, selected, onToggle }) {
  if (!categories?.length) return null;

  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {categories.map((cat) => {
        const active = selected.includes(cat.id);
        const color = cat.color || "#10b981"; // fallback

        return (
          <button
            key={cat.id}
            onClick={() => onToggle(cat.id)}
            className="
              group flex items-center gap-2
              px-4 py-1.5 rounded-full text-sm font-semibold
              border transition-all
            "
            style={{
              backgroundColor: active ? color : "#ffffff",
              borderColor: color,
              color: active ? "#ffffff" : color,
            }}
          >
            {/* ✔ TİK */}
            {active && (
              <span className="text-xs font-bold animate-scale-in">✔</span>
            )}

            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
