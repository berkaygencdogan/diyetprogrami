"use client";

import { useMemo, useState } from "react";
import CommentForm from "./CommentForm";
import CommentCard from "./CommentCard";

function groupComments(comments) {
  const map = {};
  const roots = [];

  comments.forEach((c) => {
    map[c.id] = { ...c, replies: [] };
  });

  comments.forEach((c) => {
    if (c.parent_id) {
      map[c.parent_id]?.replies.push(map[c.id]);
    } else {
      roots.push(map[c.id]);
    }
  });

  return roots;
}

/* 🔁 RECURSIVE COMMENT */
function CommentItem({ comment, blogId }) {
  const [showReplies, setShowReplies] = useState(false);
  const [replyOpen, setReplyOpen] = useState(false);

  return (
    <div className="space-y-3">
      <CommentCard comment={comment} onReply={() => setReplyOpen(true)} />

      <div className="flex gap-3 text-xs text-emerald-600">
        {comment.replies.length > 0 && (
          <button onClick={() => setShowReplies((v) => !v)}>
            {showReplies
              ? "Yanıtları gizle"
              : `Yanıtları gör (${comment.replies.length})`}
          </button>
        )}

        {/* <button onClick={() => setReplyOpen(true)}>Yanıtla</button> */}
      </div>

      {replyOpen && (
        <div className="ml-6">
          <CommentForm
            blogId={blogId}
            parentId={comment.id}
            onDone={() => setReplyOpen(false)}
            onCancel={() => setReplyOpen(false)}
          />
        </div>
      )}

      {showReplies && comment.replies.length > 0 && (
        <div className="ml-6 space-y-4 border-l pl-4">
          {comment.replies.map((r) => (
            <CommentItem key={r.id} comment={r} blogId={blogId} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function BlogComments({ comments, blogId }) {
  const grouped = useMemo(() => groupComments(comments), [comments]);

  if (!comments.length) {
    return (
      <p className="mt-8 text-sm text-gray-500">Henüz onaylanmış yorum yok.</p>
    );
  }

  return (
    <section className="mt-12 space-y-6">
      <h3 className="text-lg font-bold">Yorumlar ({comments.length})</h3>

      {grouped.map((c) => (
        <CommentItem key={c.id} comment={c} blogId={blogId} />
      ))}
    </section>
  );
}
