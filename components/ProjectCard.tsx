import type { Project } from "@/lib/projects";
import Accordion from "./Accordion";
import Divider from "./Divider";
import EnquireButton from "./EnquireButton";
import FramedImage from "./FramedImage";
import { ArrowRightIcon, DownloadIcon } from "./icons";

const outlineButton =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-navy px-6 py-2.5 text-sm font-medium text-navy transition-colors duration-300 hover:bg-navy hover:text-white";

type ProjectCardProps = {
  project: Project;
  // Puts the picture on the right; alternate it down a list.
  reverse?: boolean;
  // Heading level for the project name, so pages keep a sensible outline.
  headingLevel?: "h2" | "h3";
};

export default function ProjectCard({
  project,
  reverse = false,
  headingLevel: Heading = "h2",
}: ProjectCardProps) {
  const Tagline = Heading === "h2" ? "h3" : "h4";

  return (
    <article
      id={project.slug}
      className={`mx-auto flex max-w-[1140px] scroll-mt-28 flex-col items-center justify-center gap-x-[4vw] gap-y-10 px-6 pb-10 pt-14 md:pb-14 ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <FramedImage
        src={project.image.src}
        alt={project.image.alt}
        sizes="(min-width: 1024px) 500px, (min-width: 768px) 400px, 275px"
        className="h-[308px] w-[275px] md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px]"
      />

      <div className="flex w-full max-w-[420px] flex-col md:w-auto md:flex-1 lg:max-w-[390px]">
        <Heading className="text-center font-display text-[2.25rem] font-medium leading-tight text-bronze md:text-left md:text-[2.5rem]">
          {project.name}
        </Heading>
        <Divider
          variant="rectangle"
          className="mx-auto mt-1 max-w-[65%] text-[#798184] md:mx-0"
        />
        <Tagline className="mt-5 text-center text-xl font-semibold leading-snug text-navy md:text-left md:text-[1.6rem]">
          {project.tagline}
        </Tagline>
        <p className="mt-4 text-center text-[15px] leading-relaxed md:text-left">
          {project.description}
        </p>

        <dl className="mt-5 text-sm text-navy">
          {project.facts.map((fact) => (
            <div
              key={fact.label}
              className="flex items-baseline justify-between gap-6 border-b border-dashed border-navy py-2.5"
            >
              <dt>{fact.label}</dt>
              <dd className="text-right">{fact.value}</dd>
            </div>
          ))}
          {project.priceOnRequest && (
            <div className="flex items-center justify-between gap-6 border-b border-dashed border-navy py-2.5">
              <dt>Cost Range</dt>
              <dd>
                <EnquireButton
                  interest={`${project.name} – price`}
                  className="origin-right animate-pulse-scale cursor-pointer font-medium text-bronze underline-offset-4 hover:underline"
                >
                  CHECK PRICE
                </EnquireButton>
              </dd>
            </div>
          )}
        </dl>

        {project.amenities && (
          <div className="border-b border-dashed border-navy">
            <Accordion title="Key Amenities">
              <ul className="list-disc space-y-1 pb-4 pl-5 text-[13px] text-navy">
                {project.amenities.map((amenity) => (
                  <li key={amenity}>{amenity}</li>
                ))}
              </ul>
            </Accordion>
          </div>
        )}

        <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
          {project.brochureUrl ? (
            <a
              href={project.brochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={outlineButton}
            >
              Download brochure
              <DownloadIcon className="text-base" />
            </a>
          ) : (
            <EnquireButton interest={project.name} className={outlineButton}>
              {project.status === "upcoming" ? "Register interest" : "Enquire now"}
              <ArrowRightIcon className="text-base" />
            </EnquireButton>
          )}
          {project.websiteUrl && (
            <a
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={outlineButton}
            >
              Know More
              <ArrowRightIcon className="text-base" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
