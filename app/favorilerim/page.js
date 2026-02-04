import { fetchRenderedSeo } from "@/lib/seo";
import FavoritesClient from "./FavoritesClient";

export async function generateMetadata() {
  return await fetchRenderedSeo({ page_key: "favorites" });
}

export default function FavoritesPage() {
  return <FavoritesClient />;
}
