import ProgramCard from "@/components/program/ProgramCard";

export default async function ProgramListPage() {
  // ŞİMDİLİK MOCK (backend bağlayınca burası değişecek)
  const programs = [
    {
      id: 1,
      goal: "Kilo Vermek",
      start_weight: 82,
      target_weight: 72,
      target_months: 3,
    },
    {
      id: 2,
      goal: "Kilo Korumak",
      start_weight: 70,
      target_weight: 70,
      target_months: 2,
    },
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">📊 Programlarım</h1>

      {programs.length === 0 && (
        <p className="text-sm text-gray-500">
          Henüz kayıtlı bir programın yok.
        </p>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        {programs.map((p) => (
          <ProgramCard key={p.id} program={p} />
        ))}
      </div>
    </main>
  );
}
