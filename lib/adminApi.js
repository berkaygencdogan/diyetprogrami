const API = process.env.NEXT_PUBLIC_API_URL;

export async function fetchAllComments(token) {
  const res = await fetch(`${API}/api/comments/admin/all`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  return res.json();
}

export async function updateComment(token, id, payload) {
  const res = await fetch(`${API}/api/comments/admin/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function fetchDashboardStats(token) {
  const res = await fetch(`${API}/api/admin/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}
