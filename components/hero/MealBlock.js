const LABELS = {
  breakfast: "🍳 Kahvaltı",
  lunch: "🍛 Öğle",
  dinner: "🍽️ Akşam",
  snack: "🍎 Ara Öğün",
};

export default function MealBlock({ meal, foods }) {
  return (
    <div className="rounded-xl bg-gray-50 p-3">
      <h4 className="mb-2 text-sm font-semibold">{LABELS[meal]}</h4>

      {foods.map((f, i) => (
        <div key={i} className="text-xs text-gray-700">
          {f.name} – {f.grams} g ({f.calories} kcal)
        </div>
      ))}
    </div>
  );
}
