import { PageBanner, SectionTitle } from "./PageBanner";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/lib/projects";

// Shared layout of the upcoming / ongoing / completed project pages.
export default function ProjectsPage({ title, projects }: { title: string; projects: Project[] }) {
  return (
    <>
      <PageBanner title={title} />
      <SectionTitle title={title.toUpperCase()} />
      <div className="pb-12">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} reverse={i % 2 === 1} />
        ))}
      </div>
    </>
  );
}
