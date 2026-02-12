import { calculateReadingTime } from "@/lib/readingTime";
import Link from "next/link";

export default function BlogContentLayout({
  title,
  cover,
  author,
  content,
  children,
  views,
  blog,
}) {
  const coverUrl = cover?.startsWith("http")
    ? cover
    : `${process.env.NEXT_PUBLIC_API_URL}${cover}`;

  const readingTime = calculateReadingTime(content);

  return (
    <main className="relative min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: title,
            author: {
              "@type": "Person",
              name: author,
            },
            datePublished: blog.created_at,
            dateModified: blog.updated_at || blog.created_at,
            wordCount: content.split(" ").length,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${coverUrl}/blog/${blog.slug}`,
            },
          }),
        }}
      />

      <div className="absolute inset-0 backdrop-blur-[2px]" />

      <div className="relative h-[150px] overflow-hidden" />

      <article className="relative mx-auto -mt-35 w-full rounded-3xl bg-white/90 px-6 py-10 shadow-2xl backdrop-blur">
        <h1 className="text-3xl font-extrabold text-gray-900">{title}</h1>

        <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
          <span>✍️ {author}</span>
          <span>⏱ {readingTime} dk okuma</span>
          <span>👁 {views} okunma</span>
        </div>

        <div className="blog-content  mt-8 max-w-none">{children}</div>
      </article>
    </main>
  );
}
