"use client";

import { useState } from "react";

export default function TagSelector({ allTags, value, onChange, onCreate }) {
  const [newTag, setNewTag] = useState("");

  const toggle = (id) => {
    onChange(
      value.includes(id) ? value.filter((v) => v !== id) : [...value, id],
    );
  };

  const addNew = async () => {
    if (!newTag.trim()) return;
    const tag = await onCreate(newTag);
    onChange([...value, tag.id]);
    setNewTag("");
  };

  return (
    <div className="space-y-3">
      <label className="font-semibold text-sm">Etiketler</label>

      <div className="flex flex-wrap gap-2">
        {allTags.map((t) => (
          <button
            type="button"
            key={t.id}
            onClick={() => toggle(t.id)}
            className={`rounded-full px-3 py-1 text-xs font-semibold border
              ${
                value.includes(t.id)
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-gray-100 text-gray-700"
              }
            `}
          >
            #{t.name}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Yeni etiket"
          className="flex-1 rounded-lg border px-3 py-2 text-sm"
        />
        <button
          type="button"
          onClick={addNew}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm text-white"
        >
          Ekle
        </button>
      </div>
    </div>
  );
}
