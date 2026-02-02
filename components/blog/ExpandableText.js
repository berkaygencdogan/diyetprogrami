"use client";

import { useState } from "react";

export default function ExpandableText({ text, limit = 120 }) {
  const [expanded, setExpanded] = useState(false);

  // kısa ise hiç toggle gösterme
  if (!text || text.length <= limit) {
    return <p className="text-sm text-gray-700 leading-relaxed">“{text}”</p>;
  }

  const shortText = text.slice(0, limit) + "…";

  return (
    <p className="text-sm text-gray-700 leading-relaxed">
      “{expanded ? text : shortText}”
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="ml-1 text-xs font-semibold text-emerald-600 hover:underline"
      >
        {expanded ? "Kısalt" : "Devamını gör"}
      </button>
    </p>
  );
}
