import { fetchRenderedSeo } from "@/lib/seo";
import LoginClient from "./LoginClient";

export async function generateMetadata() {
  return await fetchRenderedSeo({ page_key: "login" });
}

export default function LoginPage() {
  return <LoginClient />;
}
