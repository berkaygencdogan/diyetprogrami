import { getAdSlot } from "@/lib/getAdSlot";

export default async function HorizontalAd({ slotId }) {
  const ad = await getAdSlot(slotId);
  if (!ad?.html_code || !ad.published) return null;

  return (
    <div
      className={`mt-16 w-full h-[${ad.height}px] overflow-hidden justify-items-center rounded-2xl shadow`}
      dangerouslySetInnerHTML={{ __html: ad.html_code }}
    />
  );
}
