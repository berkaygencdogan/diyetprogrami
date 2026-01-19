export default function HeroText() {
  return (
    <div>
      <span className="mb-4 inline-flex rounded-full bg-emerald-100 px-4 py-1 text-xs font-semibold text-emerald-700">
        ✓ Kişiye Özel Beslenme
      </span>

      <h1 className="text-3xl font-extrabold leading-tight text-gray-900 md:text-[52px]">
        Uzman Diyetisyenlerden
        <br />
        <span className="text-emerald-600">Kişisel Diyet Programı</span>
      </h1>

      <p className="mt-5 max-w-xl text-gray-600 md:text-lg">
        Boy, kilo ve yaş bilgilerine göre hedeflerine uygun diyet planını
        saniyeler içinde öğren.
      </p>

      <ul className="mt-6 space-y-2 text-sm text-gray-700">
        <li>✔ Günlük kalori ihtiyacı</li>
        <li>✔ Kilo verme / alma önerileri</li>
        <li>✔ Sürdürülebilir plan</li>
      </ul>
    </div>
  );
}
