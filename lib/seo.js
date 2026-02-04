export async function fetchRenderedSeo({ page_key, slug }) {
  const params = new URLSearchParams({ page_key });

  if (slug) params.append("slug", slug);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/seo/render?${params.toString()}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) return {};

  return res.json();
}
