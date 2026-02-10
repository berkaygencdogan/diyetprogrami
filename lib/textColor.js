export const getTextColor = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/settings/public`,
      { cache: "no-store" },
    );

    const settings = await res.json();

    return {
      title: settings?.title_text_color || "text-white",
      all: settings?.all_text_color || "text-green-500",
    };
  } catch (err) {
    return {
      title: "text-white",
      all: "text-green-500",
    };
  }
};
