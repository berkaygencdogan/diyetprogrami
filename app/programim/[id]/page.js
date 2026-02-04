import { fetchRenderedSeo } from "@/lib/seo";
import ProgramDetailClient from "./ProgramDetailClient";

export async function generateMetadata({ params }) {
  const { id } = await params;

  return await fetchRenderedSeo({
    page_key: "program_detail",
    slug: id,
  });
}

export default async function ProgramDetailPage({ params }) {
  return <ProgramDetailClient params={params} />;
}
