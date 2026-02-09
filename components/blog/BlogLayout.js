import Image from "next/image";

export default function BlogLayout({ title, date, cover, children }) {
  return (
    <main className="bg-white">
      {/* COVER */}
      <div className="relative h-[320px] w-full">
        <img
          src={cover}
          alt={title}
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
      </div>

      {/* CONTENT */}
      <article className="mx-auto max-w-[720px] px-4 py-12">
        <time className="text-sm text-gray-500">{date}</time>

        <h1 className="mt-2 text-3xl font-extrabold text-gray-900 md:text-4xl">
          {title}
        </h1>

        <div className="prose prose-lg mt-8 max-w-none prose-h2:text-gray-900 prose-h3:text-gray-900 prose-a:text-emerald-600">
          {children}
        </div>
      </article>
    </main>
  );
}
