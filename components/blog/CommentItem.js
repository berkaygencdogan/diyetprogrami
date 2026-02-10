export default function CommentItem({ comment, onReply }) {
  return (
    <div className="mt-4">
      <div className="rounded-xl bg-gray-50 p-4">
        <p className="text-sm font-semibold">{comment.name}</p>
        <p className="mt-1 text-sm text-gray-700">{comment.content}</p>

        <button
          onClick={() => onReply(comment.id)}
          className="mt-2 text-xs text-emerald-600 cursor-pointer hover:underline"
        >
          Yanıtla
        </button>
      </div>

      {comment.replies?.length > 0 && (
        <div className="ml-6 border-l pl-4">
          {comment.replies.map((r) => (
            <CommentItem key={r.id} comment={r} onReply={onReply} />
          ))}
        </div>
      )}
    </div>
  );
}
