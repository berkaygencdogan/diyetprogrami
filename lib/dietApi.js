const API = process.env.NEXT_PUBLIC_API_URL;

export async function calculatePlan(payload) {
  const res = await fetch(`${API}/api/diet/plan`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function calculateFoods(foods) {
  const res = await fetch(`${API}/api/diet/foods`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ foods }),
  });
  return res.json();
}

export async function evaluateDiet(user, foods) {
  const res = await fetch(`${API}/api/diet/evaluate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user, foods }),
  });
  return res.json();
}
