import Link from "next/link";

export default function ProgramCard({ program }) {
  return (
    <Link href={`/programim/${program.id}`}>
      <div className="rounded-2xl bg-white p-6 shadow hover:shadow-lg transition cursor-pointer">
        <h3 className="font-semibold text-lg">
          🎯 {program.goal === "lose" && "Kilo Vermek"}
          {program.goal === "gain" && "Kilo Almak"}
          {program.goal === "maintain" && "Kilo Korumak"}
        </h3>

        <p className="mt-2 text-sm text-gray-600">
          {program.start_weight} kg → {program.target_weight} kg
        </p>

        {program.target_months && (
          <p className="text-xs text-gray-500">{program.target_months} ay</p>
        )}
      </div>
    </Link>
  );
}
