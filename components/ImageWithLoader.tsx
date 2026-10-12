"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import Spinner from "./Spinner";

type ImageWithLoaderProps = ImageProps & {
  spinnerClassName?: string;
};

// next/image with a circular spinner shown until the image has decoded.
// Must be rendered inside a positioned element.
export default function ImageWithLoader({
  className = "",
  spinnerClassName = "text-bronze",
  alt,
  onLoad,
  onError,
  ...props
}: ImageWithLoaderProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <span
          className={`pointer-events-none absolute inset-0 z-[1] flex items-center justify-center ${spinnerClassName}`}
        >
          <Spinner label="Loading image" />
        </span>
      )}
      <Image
        {...props}
        alt={alt}
        // Cached images can finish before hydration, so `onLoad` never fires.
        ref={(img) => {
          if (img?.complete) setLoaded(true);
        }}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        onError={(e) => {
          setLoaded(true);
          onError?.(e);
        }}
        className={`${className} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </>
  );
}
