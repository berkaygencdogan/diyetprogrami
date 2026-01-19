const API = process.env.NEXT_PUBLIC_API_URL;

export async function fetchBlogsAdmin(token) {
  const res = await fetch(`${API}/api/blog/admin/all`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  return res.json();
}

export async function createBlog(token, data) {
  const res = await fetch(`${API}/api/blog/admin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateBlog(token, id, data) {
  const res = await fetch(`${API}/api/admin/blog/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const text = await res.text();
  console.log("UPDATE BLOG RESPONSE:", text);

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export async function fetchBlogById(token, id) {
  const res = await fetch(`${API}/api/admin/blog/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("STATUS:", res.status);

  const text = await res.text();
  console.log("RAW RESPONSE:", text);

  if (!res.ok) return null;

  return JSON.parse(text);
}
