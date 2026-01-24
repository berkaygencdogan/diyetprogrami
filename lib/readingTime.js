export function calculateReadingTime(html) {
  if (!html) return 0;

  const text = html.replace(/<[^>]+>/g, "");
  const words = text.trim().split(/\s+/).length;

  // Ortalama 200 kelime / dk
  return Math.max(1, Math.ceil(words / 200));
}
