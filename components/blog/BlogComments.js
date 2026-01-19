export default function BlogComments({ comments }) {
  if (!comments.length) {
    return (
      <p className="mt-8 text-sm text-gray-500">Henüz onaylanmış yorum yok.</p>
    );
  }

  return (
    <div className="mt-10 space-y-6">
      <h3 className="text-lg font-bold">Yorumlar ({comments.length})</h3>

      {comments.map((c) => (
        <div
          key={c.id}
          className="rounded-xl border border-gray-200 bg-gray-50 p-4"
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm">{c.name}</span>
            <span className="text-xs text-gray-400">
              {new Date(c.created_at).toLocaleDateString("tr-TR")}
            </span>
          </div>

          <p className="mt-2 text-gray-700">{c.content}</p>
        </div>
      ))}
    </div>
  );
}
