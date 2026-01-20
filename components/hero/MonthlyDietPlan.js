export default function MonthlyDietPlan({ plan }) {
  return (
    <div className="mx-auto mt-12 max-w-[1200px]">
      <h3 className="mb-6 text-lg font-bold">📅 Aylık Plan</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plan.map((day) => (
          <div
            key={day.day}
            className="rounded-xl border bg-white p-4 shadow-sm"
          >
            <h4 className="mb-2 font-semibold">Gün {day.day}</h4>

            {Object.entries(day.meals).map(([meal, items]) => (
              <div key={meal} className="mb-2 text-sm">
                <strong>
                  {meal === "breakfast" && "Kahvaltı"}
                  {meal === "lunch" && "Öğle"}
                  {meal === "dinner" && "Akşam"}
                  {meal === "snack" && "Ara"}
                </strong>

                <ul className="ml-2 list-disc">
                  {items.map((i, idx) => (
                    <li key={idx}>
                      {i.name} ({i.grams} g)
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
