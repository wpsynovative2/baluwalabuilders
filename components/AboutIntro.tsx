import { highlights, site } from "@/lib/site";
import Divider from "./Divider";
import FramedImage from "./FramedImage";
import { CheckCircleIcon } from "./icons";

// "Shaping Milestones Since 1991" block shared by the home and about pages.
export default function AboutIntro({ preload = false }: { preload?: boolean }) {
  return (
    <section className="mx-auto flex max-w-[1140px] flex-col items-center justify-center gap-x-[5vw] gap-y-12 px-6 pb-14 pt-20 md:flex-row md:pb-20 md:pt-24">
      <FramedImage
        src="/images/about-building.jpg"
        alt="Modern high-rise building rising into the sky"
        sizes="(min-width: 1024px) 480px, (min-width: 768px) 360px, 275px"
        preload={preload}
        className="h-[340px] w-[275px] md:h-[470px] md:w-[360px] lg:h-[600px] lg:w-[480px]"
      />

      <div className="flex max-w-[520px] flex-col items-center md:items-start">
        <h2 className="text-center font-display text-[1.6rem] font-semibold leading-tight text-navy md:text-left md:text-[2rem]">
          {site.tagline}
        </h2>
        <Divider variant="line-star" className="mt-1 max-w-[500px] text-navy" />
        <p className="mt-6 text-center leading-relaxed md:text-left">
          Baluwala Builders, a name rooted in trust and tradition, has shaped landmark spaces
          across Mumbai since 1991. With over 30 years of dedication and a passion for creating
          quality developments, our work reflects consistency, legacy, and lifestyle innovation
          led by a new-generation vision.
        </p>
        <ul className="mt-6 flex flex-col gap-3 text-[#54595f]">
          {highlights.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <CheckCircleIcon className="mt-1 shrink-0 text-navy" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
