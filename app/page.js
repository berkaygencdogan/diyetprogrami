import { fetchRenderedSeo } from "@/lib/seo";
import HomePageClient from "./HomePageClient";

export async function generateMetadata() {
  return await fetchRenderedSeo({ page_key: "home" });
}

export default function HomePage() {
  return <HomePageClient />;
}
