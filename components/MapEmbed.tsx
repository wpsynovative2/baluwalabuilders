"use client";

import { useState } from "react";
import Spinner from "./Spinner";

export default function MapEmbed({ src, title }: { src: string; title: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative h-[380px] w-full bg-navy/5 md:h-[550px]">
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-navy">
          <Spinner className="h-10 w-10 border-4" label="Loading map" />
          <span className="text-sm">Loading map…</span>
        </div>
      )}
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setLoaded(true)}
        className={`relative block h-full w-full border-0 transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
