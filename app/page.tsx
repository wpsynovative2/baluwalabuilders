import Link from "next/link";
import AboutIntro from "@/components/AboutIntro";
import Counter from "@/components/Counter";
import HeroSlider, { type Slide } from "@/components/HeroSlider";
import { ArrowRightIcon } from "@/components/icons";
import { SectionHeading } from "@/components/PageBanner";
import ProjectCard from "@/components/ProjectCard";
import { projectsByStatus } from "@/lib/projects";
import { site } from "@/lib/site";

const AVIARA_URL = "https://aviaraandheri.com/home/";

const slides: Slide[] = [
  {
    src: "/images/slider/slide-1.png",
    alt: "Aviara – Codeword Live High: your lifetime boarding pass",
    href: AVIARA_URL,
  },
  {
    src: "/images/slider/slide-2.png",
    alt: "Aviara – premium 1 & 2 bed deck residences on Sahar Road, Andheri East",
    href: AVIARA_URL,
  },
  {
    src: "/images/slider/slide-3.png",
    alt: "Aviara – boarding for international living starts soon",
    href: AVIARA_URL,
  },
];

const viewAllLink =
  "inline-flex items-center gap-2 border-b-2 border-bronze pb-1 text-sm font-semibold uppercase tracking-wide text-navy transition-colors hover:text-bronze";

export default function Home() {
  const ongoing = projectsByStatus("ongoing");
  const upcoming = projectsByStatus("upcoming");
  const completed = projectsByStatus("completed");

  return (
    <>
      <h1 className="sr-only">
        {site.name} – real estate developers in Mumbai since {site.foundedYear}
      </h1>

      <HeroSlider slides={slides} />

      <section className="bg-[#02072b] bg-[url(/images/backgrounds/blurry-wallpaper.jpg)] bg-cover bg-center px-6 pb-12 pt-10 text-white lg:bg-fixed">
        <h2 className="text-center font-display text-[1.4rem] font-semibold md:text-[2.5rem]">
          COMPANY PROFILE
        </h2>
        <div className="mx-auto mt-10 flex max-w-[1140px] items-center justify-center">
          <div className="flex-1 border-r-2 border-white py-3 pr-5 text-right md:pr-8">
            <Counter
              value={2026 - site.foundedYear}
              sinceYear={site.foundedYear}
              suffix="+"
              className="block text-5xl font-bold leading-none text-gold md:text-7xl"
            />
            <p className="mt-2 text-sm font-medium md:text-xl">Years of Legacy</p>
          </div>
          <div className="flex-1 py-3 pl-5 text-left md:pl-8">
            <Counter
              value={completed.length}
              suffix="+"
              className="block text-5xl font-bold leading-none md:text-7xl"
            />
            <p className="mt-2 text-sm font-medium text-gold md:text-xl">Completed Projects</p>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-3xl text-center text-[15px] md:text-xl">
          A journey marked by consistency, quality, and a commitment to delivering enduring
          spaces
        </p>
      </section>

      <AboutIntro />

      <section className="relative bg-navy bg-[url(/images/backgrounds/tall-city-building.jpg)] bg-cover bg-center px-6 py-16 md:py-20 lg:bg-fixed">
        <div className="absolute inset-0 bg-black/[0.78]" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-[1140px] flex-col items-center">
          <SectionHeading
            tone="light"
            subtitle="Projects That Define Our Journey"
            title={
              <>
                From Vision to Reality <br className="hidden md:block" />
                Our Signature Developments
              </>
            }
          />
          <Link
            href="/contact-us"
            className="mt-10 rounded-[5px] bg-bronze px-8 py-3.5 font-medium text-white shadow-[0_0_22px_0_#fffdfd] transition duration-300 hover:scale-105 hover:bg-navy"
          >
            Contact Us Today
          </Link>
        </div>
      </section>

      {ongoing.length > 0 && (
        <section className="pt-16 md:pt-20">
          <div className="px-6">
            <SectionHeading subtitle="Now booking in the heart of Andheri" title="ONGOING PROJECT" />
          </div>
          {ongoing.map((project, i) => (
            <ProjectCard key={project.slug} project={project} reverse={i % 2 === 1} headingLevel="h3" />
          ))}
        </section>
      )}

      <section className="pt-10 md:pt-14">
        <div className="px-6">
          <SectionHeading
            subtitle="A glimpse into tomorrow’s finest living spaces"
            title="UPCOMING PROJECTS"
          />
        </div>
        {upcoming.map((project, i) => (
          <ProjectCard key={project.slug} project={project} reverse={i % 2 === 1} headingLevel="h3" />
        ))}
      </section>

      <section className="pb-16 pt-10 md:pt-14">
        <div className="px-6">
          <SectionHeading
            subtitle="Now helping you find home sweet home"
            title="COMPLETED PROJECTS"
          />
        </div>
        {completed.slice(0, 2).map((project, i) => (
          <ProjectCard key={project.slug} project={project} reverse={i % 2 === 1} headingLevel="h3" />
        ))}
        <p className="mt-4 text-center">
          <Link href="/completed-projects" className={viewAllLink}>
            View all completed projects
            <ArrowRightIcon />
          </Link>
        </p>
      </section>
    </>
  );
}
