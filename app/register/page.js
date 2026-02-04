import { fetchRenderedSeo } from "@/lib/seo";
import RegisterClient from "./RegisterClient";

export async function generateMetadata() {
  return await fetchRenderedSeo({ page_key: "register" });
}
export default function RegisterPage() {
  return <RegisterClient />;
}
