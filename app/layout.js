import "./globals.css";
import Providers from "@/components/Providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AutoBreadcrumb from "@/components/AutoBreadcrumb";

export default async function RootLayout({ children }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/settings/public`,
    {
      cache: "no-store",
    },
  );
  const settings = await res.json();
  const bg = settings.site_background_color;
  return (
    <html lang="tr">
      <body
        suppressHydrationWarning
        style={{ backgroundColor: bg }}
        className="transition-colors duration-300"
      >
        <Providers>
          <Header />
          <AutoBreadcrumb />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
