"use client";

import { useEffect, useState } from "react";

export default function FontSizeControl() {
  const [size, setSize] = useState(1);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--blog-font-scale", size);
  }, [size]);

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-500">A-</span>

      <input
        type="range"
        min="0.9"
        max="2"
        step="0.05"
        value={size}
        onChange={(e) => setSize(Number(e.target.value))}
        className="w-28 accent-emerald-600 cursor-pointer"
      />

      <span className="text-xs text-gray-500">A+</span>

      <span className="ml-2 text-xs font-semibold text-gray-600">
        {Math.round(size * 100)}%
      </span>
    </div>
  );
}
