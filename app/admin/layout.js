import { fetchRenderedSeo } from "@/lib/seo";
import AdminClientLayout from "./AdminClientLayout";

export async function generateMetadata() {
  return await fetchRenderedSeo({ page_key: "admin_panel" });
}

export default function Layout({ children }) {
  return <AdminClientLayout>{children}</AdminClientLayout>;
}
