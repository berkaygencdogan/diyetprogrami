export default function Result({ data }) {
  if (!data) return null;

  return (
    <div className="mt-6 rounded-xl bg-white p-4 shadow">
      <h3 className="font-bold mb-2">Günlük Hedef</h3>

      <p>Kalori: {data.plan.targetCalories}</p>
      <p>Protein: {data.plan.macros.protein} g</p>
      <p>Karbonhidrat: {data.plan.macros.carb} g</p>
      <p>Yağ: {data.plan.macros.fat} g</p>

      <h4 className="mt-4 font-semibold">Öneriler</h4>
      <ul className="list-disc ml-4">
        {data.suggestions.map((s, i) => (
          <li key={i}>{s.macro} artırılmalı</li>
        ))}
      </ul>
    </div>
  );
}
