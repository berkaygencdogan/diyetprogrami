const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchBlogs() {
  const res = await fetch(`${API_URL}/api/blog`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  const contentType = res.headers.get("content-type");

  if (!contentType || !contentType.includes("application/json")) {
    const text = await res.text();
    console.error("API RESPONSE NOT JSON:", text);
    return [];
  }

  return res.json();
}

export async function fetchCategories() {
  const res = await fetch(`${API_URL}/api/categories`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}

export async function fetchBlogTags(blogId) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blog/${blogId}/tags`,
    { cache: "no-store" },
  );

  if (!res.ok) return [];
  return res.json();
}

export async function fetchBlogBySlug(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blog/${slug}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    return null;
  }

  const text = await res.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    console.error("INVALID JSON:", text);
    return null;
  }
}

export async function fetchComments(blogId) {
  const res = await fetch(`${API_URL}/api/comments/${blogId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  const contentType = res.headers.get("content-type");

  if (!contentType || !contentType.includes("application/json")) {
    return [];
  }

  return res.json();
}

export async function postComment(data) {
  const res = await fetch(`${API_URL}/api/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const contentType = res.headers.get("content-type");

  if (!res.ok || !contentType?.includes("application/json")) {
    const text = await res.text();
    throw new Error(text || "Yorum gönderilemedi");
  }

  return res.json();
}

// lib/api.js

export async function getMyFavorites(token) {
  const res = await fetch(`${API_URL}/api/favorites/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  return res.json();
}

export async function toggleFavorite(blogId, token) {
  const res = await fetch(`${API_URL}/api/favorites/${blogId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function getRelatedBlogsByTags(blogId) {
  const res = await fetch(`${API_URL}/api/blog/related/${blogId}`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  return res.json();
}

export const checkFavorite = async (blogId, token) => {
  const res = await fetch(`${API_URL}/api/favorites/check/${blogId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Favorite check failed");
  }

  return res.json(); // { isFavorite: true | false }
};

export async function fetchReactions(blogId) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/reactions/${blogId}`,
    { cache: "no-store" },
  );
  return res.json();
}

export async function toggleReaction(blogId, emoji, token) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/reactions/${blogId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ emoji }),
    },
  );
  return res.json();
}
