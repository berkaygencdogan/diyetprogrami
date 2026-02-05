// lib/getAdSlot.js
export async function getAdSlot(slotId) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/ads/slot/${slotId}`,
    { cache: "no-store" },
  );

  if (!res.ok) return null;
  return res.json();
}
