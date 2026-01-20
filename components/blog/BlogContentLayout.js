export default function BlogContentLayout({ title, cover, author, children }) {
  const coverUrl = cover?.startsWith("http")
    ? cover
    : `${process.env.NEXT_PUBLIC_API_URL}${cover}`;

  return (
    <main
      className="
        relative
        min-h-screen
        bg-[url('/images/blog-bg.png')]
        bg-cover
        bg-center
        bg-no-repeat
      "
    >
      {/* BACKGROUND OVERLAY */}
      <div className="absolute inset-0 bg-white/75 backdrop-blur-[2px]" />

      {/* COVER */}
      <div className="relative h-[150px] overflow-hidden"></div>

      {/* CONTENT CARD */}
      <article
        className="
          relative
          mx-auto
          -mt-24
          max-w-[760px]
          rounded-3xl
          bg-white/90
          px-6
          py-10
          shadow-2xl
          backdrop-blur
        "
      >
        <h1 className="text-3xl font-extrabold text-gray-900">{title}</h1>

        <p className="mt-2 text-sm text-gray-500">Yayınlayan: {author}</p>

        <div className="prose prose-lg mt-8 max-w-none">{children}</div>
      </article>
    </main>
  );
}
