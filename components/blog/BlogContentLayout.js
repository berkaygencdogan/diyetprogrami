export default function BlogContentLayout({ title, cover, author, children }) {
  const coverUrl = cover?.startsWith("http")
    ? cover
    : `${process.env.NEXT_PUBLIC_API_URL}${cover}`;

  return (
    <main className="bg-[#f8faf9]">
      {/* COVER */}
      <div className="relative h-[320px] overflow-hidden">
        <img
          src={coverUrl}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* CONTENT CARD */}
      <article className="relative mx-auto -mt-24 max-w-[720px] rounded-3xl bg-white px-6 py-10 shadow-xl">
        <h1 className="text-3xl font-extrabold text-gray-900">{title}</h1>

        <p className="mt-2 text-sm text-gray-500">Written by {author}</p>

        <div className="prose prose-lg mt-8 max-w-none">{children}</div>
      </article>
    </main>
  );
}
