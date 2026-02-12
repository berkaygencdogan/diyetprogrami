import he from "he";

export function excerptFromHtml(html, wordLimit = 24) {
  if (!html) return "";

  // HTML taglerini sil
  const withoutTags = html.replace(/<[^>]+>/g, "");

  // Entity decode (SERVER SAFE)
  const decoded = he.decode(withoutTags);

  const words = decoded.split(/\s+/);

  if (words.length <= wordLimit) return decoded;

  return words.slice(0, wordLimit).join(" ") + "…";
}
