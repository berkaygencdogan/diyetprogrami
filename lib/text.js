export function excerptFromHtml(html, wordLimit = 24) {
  if (!html) return "";

  // 1️⃣ HTML taglerini temizle
  const withoutTags = html.replace(/<[^>]+>/g, "");

  // 2️⃣ Entity decode (browser yöntemi)
  const textarea = document.createElement("textarea");
  textarea.innerHTML = withoutTags;
  const decoded = textarea.value;

  // 3️⃣ Kelime kırp
  const words = decoded.split(/\s+/);

  if (words.length <= wordLimit) return decoded;

  return words.slice(0, wordLimit).join(" ") + "…";
}
