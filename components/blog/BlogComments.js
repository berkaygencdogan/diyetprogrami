export default function BlogComments({ comments }) {
  if (!comments.length) {
    return (
      <p className="mt-10 text-sm text-gray-500">Henüz onaylanmış yorum yok.</p>
    );
  }

  return (
    <section className="mt-14">
      <h3 className="mb-6 text-lg font-bold text-gray-900">
        Yorumlar ({comments.length})
      </h3>

      <div className="space-y-5">
        {comments.map((c) => (
          <div
            key={c.id}
            className="
              rounded-2xl
              border border-gray-200
              bg-white/90
              p-5
              shadow-sm
              backdrop-blur
            "
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-800">
                {c.name}
              </span>

              <span className="text-xs text-gray-400">
                {new Date(c.created_at).toLocaleDateString("tr-TR")}
              </span>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-gray-700">
              {c.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
