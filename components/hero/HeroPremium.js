export default function HeroPremium({ children }) {
  return (
    <header className="relative mt-10 overflow-hidden" id="diyetprogrami">
      <div className="absolute inset-0" />

      <div className="relative mx-auto max-w-7xl px-4 pt-12 pb-20 md:pt-20 md:pb-28">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          {children}
        </div>
      </div>
    </header>
  );
}
