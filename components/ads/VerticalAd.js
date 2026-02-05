import { getAdSlot } from "@/lib/getAdSlot";

export default async function VerticalAd({ slotId, position }) {
  const ad = await getAdSlot(slotId);
  console.log("gelen  veri", ad);
  if (!ad?.html_code || !ad.published) return null;

  return (
    <div
      className={`sticky top-28 h-f w-[${ad.width}px] h-[${ad.height}px] rounded-xl overflow-hidden
      ${position === "left" ? "ml-6" : "mr-6"}`}
      dangerouslySetInnerHTML={{ __html: ad.html_code }}
    />
  );
}
