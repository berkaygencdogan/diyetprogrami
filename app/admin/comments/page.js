"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchAllComments, updateComment } from "@/lib/adminApi";

export default function AdminCommentsPage() {
  const [comments, setComments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [search, setSearch] = useState("");

  const load = async () => {
    const token = localStorage.getItem("token");
    const data = await fetchAllComments(token);
    setComments(data);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async (id, payload) => {
    const token = localStorage.getItem("token");
    await updateComment(token, id, payload);
    setEditingId(null);
    load();
  };

  /* 🔍 ARAMA */
  const filtered = useMemo(() => {
    return comments.filter((c) =>
      `${c.name} ${c.email} ${c.content}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [comments, search]);

  /* 🔢 SIRALAMA */
  const sorted = [...filtered].sort((a, b) => {
    if (a.status !== b.status) {
      if (a.status === "pending") return -1;
      if (b.status === "pending") return 1;
    }
    return new Date(b.created_at) - new Date(a.created_at);
  });

  /* 🔑 parent yorumları hızlı bulmak için */
  const commentMap = useMemo(() => {
    const map = {};
    comments.forEach((c) => {
      map[c.id] = c;
    });
    return map;
  }, [comments]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-6">
      <h1 className="text-2xl font-bold">💬 Yorum Yönetimi</h1>

      {/* 🔍 ARAMA */}
      <input
        type="text"
        placeholder="Yorum ara (isim, mail, içerik)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-xl border px-4 py-2 text-sm"
      />

      <div className="space-y-4">
        {sorted.map((c) => {
          const parent = c.parent_id ? commentMap[c.parent_id] : null;
          const isPending = c.status === "pending";
          const isApproved = c.status === "approved";
          const isRejected = c.status === "rejected";
          const isHome = c.home === 1;

          return (
            <div
              key={c.id}
              className={`
                rounded-xl border p-4 space-y-3
                ${isPending ? "border-orange-300 bg-orange-50" : ""}
                ${isRejected ? "border-gray-300 bg-gray-100 opacity-75" : ""}
                ${isHome ? "border-purple-300 bg-purple-50" : ""}
              `}
            >
              {/* META */}
              <div className="flex justify-between text-xs text-gray-500">
                <span>{c.email}</span>
                <span>{new Date(c.created_at).toLocaleString()}</span>
              </div>

              {/* 🔁 YANITLANAN YORUM */}
              {parent && (
                <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-3 text-xs text-indigo-900">
                  <div className="mb-1 font-semibold">↪️ Yanıtlanan yorum:</div>
                  <div className="italic text-gray-700 line-clamp-3">
                    “{parent.content}”
                  </div>
                </div>
              )}

              {/* İÇERİK */}
              {editingId === c.id ? (
                <textarea
                  className="w-full rounded-lg border p-2 text-sm"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
              ) : (
                <p className="text-sm text-gray-800">{c.content}</p>
              )}

              {/* AKSİYONLAR */}
              <div className="flex flex-wrap gap-2">
                {/* ✅ ONAYLA */}
                {(isPending || isRejected) && (
                  <button
                    onClick={() => save(c.id, { status: "approved" })}
                    className="rounded-lg bg-emerald-600 px-3 py-1 text-xs font-semibold text-white"
                  >
                    Onayla
                  </button>
                )}

                {/* ❌ REDDET */}
                {!isRejected && (
                  <button
                    onClick={() => save(c.id, { status: "rejected" })}
                    className="rounded-lg bg-red-600 px-3 py-1 text-xs font-semibold text-white"
                  >
                    Reddet
                  </button>
                )}

                {/* ✏️ DÜZENLE */}
                {editingId === c.id ? (
                  <button
                    onClick={() => save(c.id, { content: editContent })}
                    className="rounded-lg bg-blue-600 px-3 py-1 text-xs font-semibold text-white"
                  >
                    Kaydet
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditingId(c.id);
                      setEditContent(c.content);
                    }}
                    className="rounded-lg bg-yellow-500 px-3 py-1 text-xs font-semibold text-white"
                  >
                    Düzenle
                  </button>
                )}

                {/* 🏠 ANASAYFA */}
                {isApproved &&
                  (isHome ? (
                    <button
                      onClick={() => save(c.id, { home: 0 })}
                      className="rounded-lg bg-gray-600 px-3 py-1 text-xs font-semibold text-white"
                    >
                      Anasayfadan Kaldır
                    </button>
                  ) : (
                    <button
                      onClick={() => save(c.id, { home: 1 })}
                      className="rounded-lg bg-purple-600 px-3 py-1 text-xs font-semibold text-white"
                    >
                      Anasayfaya Al
                    </button>
                  ))}
              </div>
            </div>
          );
        })}

        {sorted.length === 0 && (
          <p className="text-sm text-gray-500">Yorum bulunamadı.</p>
        )}
      </div>
    </main>
  );
}
