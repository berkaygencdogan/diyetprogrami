export function excerptFromHtml(html, wordLimit = 24) {
  if (!html) return "";

  // HTML taglerini temizle
  const text = html.replace(/<[^>]+>/g, "");

  const words = text.split(/\s+/);
  if (words.length <= wordLimit) return text;

  return words.slice(0, wordLimit).join(" ") + "…";
}
