export default function HeroPremium({ children }) {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-emerald-100" />

      <div className="relative mx-auto max-w-7xl px-4 pt-12 pb-20 md:pt-20 md:pb-28">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          {children}
        </div>
      </div>
    </header>
  );
}
