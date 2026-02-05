"use client";

import dynamic from "next/dynamic";

const VerticalAd = dynamic(
  () => import("./VerticalAd").then((m) => m.VerticalAd),
  { ssr: true },
);

export default function VerticalAdClient(props) {
  return <VerticalAd {...props} />;
}
