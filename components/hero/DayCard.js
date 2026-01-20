import MealBlock from "./MealBlock";

export default function DayCard({ day }) {
  return (
    <div className="p-4">
      <div className="mb-3 flex justify-between text-sm font-semibold">
        <span>Gün {day.day}</span>
        <span>{day.total_calories} kcal</span>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {Object.entries(day.meals).map(([meal, foods]) => (
          <MealBlock key={meal} meal={meal} foods={foods} />
        ))}
      </div>
    </div>
  );
}
