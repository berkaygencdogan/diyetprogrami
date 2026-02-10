export default function CommentCard({ comment, onReply }) {
  return (
    <div className="rounded-2xl border bg-white/90 p-4 shadow-sm">
      <div className="flex justify-between text-xs text-gray-500">
        <span className="font-semibold text-gray-800">{comment.name}</span>
        <span>{new Date(comment.created_at).toLocaleDateString("tr-TR")}</span>
      </div>

      <p className="mt-2 text-sm text-gray-700">{comment.content}</p>

      <button
        onClick={onReply}
        className="mt-2 text-xs font-semibold text-emerald-600 hover:underline cursor-pointer"
      >
        Yanıtla
      </button>
    </div>
  );
}
