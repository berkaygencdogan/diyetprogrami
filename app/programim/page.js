import { fetchRenderedSeo } from "@/lib/seo";
import ProgramListClient from "./ProgramListClient";

export async function generateMetadata() {
  return await fetchRenderedSeo({ page_key: "programs" });
}

export default function ProgramListPage() {
  return <ProgramListClient />;
}
