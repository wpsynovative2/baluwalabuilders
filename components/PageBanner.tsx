import type { ReactNode } from "react";
import Divider from "./Divider";

// Hero strip at the top of every inner page: city photo, navy tint and the
// page title on a frosted-glass plate.
export function PageBanner({ title }: { title: string }) {
  return (
    <section className="relative flex min-h-[260px] items-center justify-center bg-navy bg-[url(/images/backgrounds/indian-city-scene.jpg)] bg-cover bg-center px-4 py-12 md:min-h-[400px] lg:bg-fixed">
      <div className="absolute inset-0 bg-navy/[0.63]" aria-hidden="true" />
      <h1 className="relative rounded-2xl px-[7vw] py-[6vw] text-center font-display text-[clamp(2rem,10vw,5rem)] font-semibold uppercase leading-none text-white shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[11px] md:px-[4vw] md:py-[4vw]">
        {title}
      </h1>
    </section>
  );
}

// Centered section title with the triangle ornament underneath.
export function SectionTitle({ title }: { title: string }) {
  return (
    <div className="mx-auto max-w-[1140px] px-6 pb-2 pt-10 text-center text-navy md:pt-12">
      <h2 className="font-display text-[clamp(1.75rem,8vw,3.75rem)] font-medium leading-tight">
        {title}
      </h2>
      <Divider variant="triangle" className="mx-auto mt-2" />
    </div>
  );
}

// Two-line heading used on the home page: script sub-title over a bold title.
export function SectionHeading({
  subtitle,
  title,
  tone = "dark",
}: {
  subtitle: string;
  title: ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <div className={`text-center ${tone === "dark" ? "text-navy" : "text-white"}`}>
      <p className="font-display text-base md:text-xl">{subtitle}</p>
      <h2 className="mt-2 text-[clamp(1.6rem,6.5vw,4.5rem)] font-bold leading-[1.1]">{title}</h2>
    </div>
  );
}
