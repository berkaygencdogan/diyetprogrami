"use client";

import { useEffect } from "react";

export default function AdHtmlClient({ html }) {
  useEffect(() => {
    if (!html) return;

    // Adsense varsa tetikle
    if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
      try {
        window.adsbygoogle.push({});
      } catch (e) {
        // sessiz geç
      }
    }
  }, [html]);

  if (!html) return null;

  return (
    <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
