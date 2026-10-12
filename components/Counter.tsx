"use client";

import { useEffect, useRef, useState } from "react";

type CounterProps = {
  // Final value; also what is shown before JavaScript runs.
  value: number;
  // When set, the final value becomes the years elapsed since this year, so
  // the figure never goes stale.
  sinceYear?: number;
  suffix?: string;
  durationMs?: number;
  className?: string;
};

// Counts up from 1 the first time it scrolls into view.
export default function Counter({
  value,
  sinceYear,
  suffix = "",
  durationMs = 2000,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const end = sinceYear ? new Date().getFullYear() - sinceYear : value;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (reducedMotion) {
          setDisplay(end);
          return;
        }
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / durationMs, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.max(1, Math.round(eased * end)));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, sinceYear, durationMs]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
