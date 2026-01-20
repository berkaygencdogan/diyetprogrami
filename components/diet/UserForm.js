"use client";

export default function UserForm({ onSubmit }) {
  const submit = (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target));

    onSubmit({
      height: +data.height,
      weight: +data.weight,
      age: +data.age,
      gender: data.gender,
      activity: data.activity,
      goal: data.goal,
    });
  };

  return (
    <form onSubmit={submit} className="grid gap-3 max-w-md">
      <input name="height" placeholder="Boy (cm)" required />
      <input name="weight" placeholder="Kilo (kg)" required />
      <input name="age" placeholder="Yaş" required />

      <select name="gender">
        <option value="male">Erkek</option>
        <option value="female">Kadın</option>
      </select>

      <select name="activity">
        <option value="low">Düşük</option>
        <option value="medium">Orta</option>
        <option value="high">Yüksek</option>
      </select>

      <select name="goal">
        <option value="lose">Kilo Ver</option>
        <option value="gain">Kilo Al</option>
      </select>

      <button className="bg-emerald-600 text-white py-2 rounded">
        Planı Hesapla
      </button>
    </form>
  );
}
