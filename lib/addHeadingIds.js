import slugify from "slugify";

export function addHeadingIds(html) {
  return html.replace(/<h([2-3])>(.*?)<\/h[2-3]>/gi, (_, level, text) => {
    const clean = text.replace(/<[^>]+>/g, "");
    const id = slugify(clean, { lower: true, strict: true });
    return `<h${level} id="${id}">${text}</h${level}>`;
  });
}
