import { useState } from "react";
import DayCard from "./DayCard";

export default function MonthBlock({ monthIndex, days }) {
  const [open, setOpen] = useState(monthIndex === 0);

  return (
    <div className="rounded-2xl border bg-white shadow">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-4 text-left font-semibold"
      >
        <span>📅 {monthIndex + 1}. Ay</span>
        <span>{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="divide-y">
          {days.map((day) => (
            <DayCard key={day.day} day={day} />
          ))}
        </div>
      )}
    </div>
  );
}
