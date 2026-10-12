import type { Metadata } from "next";
import ProjectsPage from "@/components/ProjectsPage";
import { projectsByStatus } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Ongoing Projects",
  description:
    "Aviara by Baluwala Builders – premium 1 & 2 BHK residences on Sahar Road, Andheri East. Download the brochure or enquire for pricing.",
  alternates: { canonical: "/ongoing-project" },
};

export default function Page() {
  return <ProjectsPage title="Ongoing Projects" projects={projectsByStatus("ongoing")} />;
}
