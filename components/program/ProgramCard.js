import Link from "next/link";

export default function ProgramCard({ program }) {
  return (
    <Link href={`/programim/${program.id}`}>
      <article
        className="
          group
          rounded-2xl
          bg-white
          p-6
          shadow-md
          transition
          hover:-translate-y-1
          hover:shadow-xl
        "
      >
        <h3 className="text-lg font-bold text-gray-900">🎯 {program.goal}</h3>

        <p className="mt-2 text-sm text-gray-600">
          Başlangıç: {program.start_weight} kg → Hedef: {program.target_weight}{" "}
          kg
        </p>

        <p className="mt-1 text-xs text-gray-500">
          Süre: {program.target_months} ay
        </p>

        <div className="mt-4 text-sm font-semibold text-emerald-600">
          Programa Git →
        </div>
      </article>
    </Link>
  );
}
