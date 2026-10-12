import type { Metadata } from "next";
import ProjectsPage from "@/components/ProjectsPage";
import { projectsByStatus } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Upcoming Projects",
  description:
    "A glimpse into tomorrow’s finest living spaces from Baluwala Builders – upcoming residential projects in Andheri, Mumbai.",
  alternates: { canonical: "/upcoming-projects" },
};

export default function Page() {
  return <ProjectsPage title="Upcoming Projects" projects={projectsByStatus("upcoming")} />;
}
