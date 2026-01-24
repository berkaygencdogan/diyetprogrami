"use client";

import { useEffect } from "react";

export default function BlogViewTracker({ blogId }) {
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${blogId}/view`, {
      method: "POST",
    });
  }, [blogId]);

  return null;
}
