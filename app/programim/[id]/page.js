export default async function ProgramDetailPage({ params }) {
  const { id } = params;

  // MOCK
  const program = {
    id,
    goal: "Kilo Vermek",
    start_weight: 82,
    target_weight: 72,
    target_months: 3,
    daily_calories: 2200,
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold">🎯 {program.goal}</h1>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <Stat label="Başlangıç Kilo" value={`${program.start_weight} kg`} />
        <Stat label="Hedef Kilo" value={`${program.target_weight} kg`} />
        <Stat label="Günlük Kalori" value={`${program.daily_calories} kcal`} />
      </div>

      <div className="mt-10 rounded-2xl bg-white p-6 shadow">
        <h2 className="mb-4 text-lg font-semibold">📅 Program Özeti</h2>

        <p className="text-sm text-gray-600">
          Bu program {program.target_months} ay sürecek ve hedefin olan{" "}
          {program.target_weight} kg’ye ulaşmanı amaçlar.
        </p>
      </div>
    </main>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl bg-gray-50 p-4 text-center">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-lg font-bold">{value}</div>
    </div>
  );
}
