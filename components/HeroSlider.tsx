"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";
import Spinner from "./Spinner";

export type Slide = {
  src: string;
  alt: string;
  href: string;
};

const AUTOPLAY_MS = 5000;
const SPEED_MS = 900;
const SWIPE_THRESHOLD_PX = 50;

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const count = slides.length;
  // The track is [last, ...slides, first] so it can loop in either direction;
  // `position` indexes into that padded list.
  const [position, setPosition] = useState(1);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [firstLoaded, setFirstLoaded] = useState(false);
  const moving = useRef(false);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback((delta: number) => {
    if (moving.current) return;
    moving.current = true;
    setAnimate(true);
    setPosition((p) => p + delta);
  }, []);

  const goTo = (index: number) => {
    if (moving.current || index + 1 === position) return;
    moving.current = true;
    setAnimate(true);
    setPosition(index + 1);
  };

  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => go(1), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [paused, count, go]);

  // Once a move has finished: if we landed on a cloned slide, jump to the real
  // one without animating. A timer is used instead of `transitionend`, which
  // browsers skip in background tabs.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      moving.current = false;
      if (position === 0) {
        setAnimate(false);
        setPosition(count);
      } else if (position === count + 1) {
        setAnimate(false);
        setPosition(1);
      }
    }, SPEED_MS + 50);
    return () => window.clearTimeout(timer);
  }, [position, count]);

  const active = (position - 1 + count) % count;
  const padded = [slides[count - 1], ...slides, slides[0]];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured projects"
      className="group relative aspect-[1600/998] max-h-[750px] w-full overflow-hidden bg-navy"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(dx) > SWIPE_THRESHOLD_PX) go(dx < 0 ? 1 : -1);
      }}
    >
      {!firstLoaded && (
        <div className="absolute inset-0 z-[1] flex items-center justify-center text-gold">
          <Spinner className="h-12 w-12 border-4" label="Loading slides" />
        </div>
      )}

      <div
        className="flex h-full"
        style={{
          transform: `translateX(-${position * 100}%)`,
          transition: animate ? `transform ${SPEED_MS}ms ease` : "none",
        }}
      >
        {padded.map((slide, i) => {
          const isClone = i === 0 || i === count + 1;
          const isCurrent = i === position;
          return (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${((i - 1 + count) % count) + 1} of ${count}`}
              aria-hidden={!isCurrent}
              className="relative h-full w-full shrink-0 overflow-hidden"
            >
              <Image
                src={slide.src}
                alt={isClone ? "" : slide.alt}
                fill
                sizes="100vw"
                preload={i === 1}
                loading={i === 1 ? "eager" : "lazy"}
                ref={(img) => {
                  if (i === 1 && img?.complete) setFirstLoaded(true);
                }}
                onLoad={i === 1 ? () => setFirstLoaded(true) : undefined}
                onError={i === 1 ? () => setFirstLoaded(true) : undefined}
                // The artwork has a white margin baked in; scale it out of view.
                className="scale-[1.06] object-cover"
              />
              <div className="absolute inset-x-0 bottom-[7%] mx-auto flex max-w-[1200px] justify-center px-6 sm:justify-start sm:px-16">
                <a
                  href={slide.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={isCurrent ? 0 : -1}
                  className="rounded-lg border-2 border-white bg-[#064361] px-4 py-2 font-display text-xs text-white transition-colors duration-300 hover:bg-white hover:text-[#064361] sm:text-base"
                >
                  Read More
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => go(-1)}
            className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/25 text-2xl text-white transition hover:bg-black/50 sm:left-[35px] sm:h-12 sm:w-12 sm:text-4xl"
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => go(1)}
            className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/25 text-2xl text-white transition hover:bg-black/50 sm:right-[35px] sm:h-12 sm:w-12 sm:text-4xl"
          >
            <ChevronRightIcon />
          </button>
          <div className="absolute inset-x-0 bottom-2 flex justify-center gap-2 sm:bottom-4">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === active}
                onClick={() => goTo(i)}
                className={`h-2.5 cursor-pointer rounded-full border border-white/80 transition-all duration-300 ${
                  i === active ? "w-7 bg-gold" : "w-2.5 bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
