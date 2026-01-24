import slugify from "slugify";

export function generateTOC(html) {
  if (!html) return [];

  const regex = /<h([2-3])>(.*?)<\/h[2-3]>/gi;
  const toc = [];
  let match;

  while ((match = regex.exec(html)) !== null) {
    const level = Number(match[1]);
    const text = match[2].replace(/<[^>]+>/g, "");
    const id = slugify(text, { lower: true, strict: true });

    toc.push({ id, text, level });
  }

  return toc;
}
