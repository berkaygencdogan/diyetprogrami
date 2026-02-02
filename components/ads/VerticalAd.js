export function VerticalAd({ position }) {
  return (
    <div
      className={`sticky top-28 h-[600px] w-[160px] rounded-xl border overflow-hidden
      ${position === "left" ? "ml-6" : "mr-6"}`}
    >
      <p className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500 text-lg md:text-xl font-semibold">
        Buraya Reklam Gelecek
      </p>
    </div>
  );
}
