"use client";

import { useState } from "react";

export default function FoodForm({ onChange }) {
  const [foods, setFoods] = useState([]);

  const add = (e) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.target));

    const next = [...foods, { name: f.name, grams: +f.grams }];
    setFoods(next);
    onChange(next);
    e.target.reset();
  };

  return (
    <div className="mt-6">
      <form onSubmit={add} className="flex gap-2">
        <input name="name" placeholder="Besin (ör: rice)" required />
        <input name="grams" placeholder="Gram" required />
        <button className="bg-gray-800 text-white px-3 rounded">+</button>
      </form>

      <ul className="mt-3 text-sm">
        {foods.map((f, i) => (
          <li key={i}>
            {f.name} – {f.grams}g
          </li>
        ))}
      </ul>
    </div>
  );
}
