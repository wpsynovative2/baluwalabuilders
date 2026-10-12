import type { Metadata } from "next";
import Image from "next/image";
import AboutIntro from "@/components/AboutIntro";
import { PageBanner } from "@/components/PageBanner";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet Baluwala Builders – third-generation real estate entrepreneurs with over three decades of experience building quality homes and commercial spaces in Mumbai.",
  alternates: { canonical: "/about-us" },
};

export default function AboutPage() {
  return (
    <>
      <PageBanner title="About Us" />
      <AboutIntro preload />

      <section className="bg-navy/[0.04] px-6 py-14 md:py-20">
        <h2 className="text-center text-[1.75rem] font-semibold text-bronze md:text-[2rem]">
          ABOUT BALUWALA BUILDERS
        </h2>
        <div className="mx-auto mt-10 flex max-w-[1000px] flex-col items-center gap-x-16 gap-y-8 md:flex-row md:justify-center">
          <Image
            src="/images/logo-gold-blue-trimmed.png"
            alt={`${site.name} logo`}
            width={758}
            height={827}
            sizes="240px"
            className="h-[220px] w-auto shrink-0 md:h-[250px]"
          />
          <div className="max-w-[560px]">
            <h3 className="text-center text-[1.75rem] font-semibold text-navy md:text-left md:text-[2rem]">
              About the Developer
            </h3>
            <p className="mt-4 text-justify leading-relaxed">
              Baluwala Builders is led by third-generation entrepreneurs — Abbas, Michael, Ali,
              and Mustaque Baluwala — who carry forward a strong legacy of dedication and
              excellence. Under the guidance of Nuruddin and Yunus Baluwala, with over three
              decades of industry experience, the team blends deep-rooted values with a
              forward-looking vision. Focused on enhancing everyday living, they strive to
              deliver thoughtfully designed spaces with modern amenities such as swimming pools,
              gyms, banquet areas, and wellness zones — creating homes that offer both comfort
              and lasting value.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
