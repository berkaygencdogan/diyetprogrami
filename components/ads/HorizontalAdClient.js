"use client";

import dynamic from "next/dynamic";

const HorizontalAd = dynamic(() => import("./HorizontalAd"), {
  ssr: true,
});

export default function HorizontalAdClient(props) {
  return <HorizontalAd {...props} />;
}
