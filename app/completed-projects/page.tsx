import type { Metadata } from "next";
import ProjectsPage from "@/components/ProjectsPage";
import { projectsByStatus } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Completed Projects",
  description:
    "Landmark residential and commercial developments delivered by Baluwala Builders across Mumbai and Karjat since 1991.",
  alternates: { canonical: "/completed-projects" },
};

export default function Page() {
  return <ProjectsPage title="Completed Projects" projects={projectsByStatus("completed")} />;
}
