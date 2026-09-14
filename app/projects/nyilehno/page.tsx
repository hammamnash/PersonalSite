import type { Metadata } from "next";
import ProjectPlaceholder from "../_components/project-placeholder";
import { personalProjects } from "../_data";

const project = personalProjects.nyilehno;

export const metadata: Metadata = {
  title: `${project.title} | Hammam Nashiruddin`,
  description: `Details coming soon: ${project.title}.`,
  robots: { index: false, follow: false },
};

export default function NyilehnoPage() {
  return <ProjectPlaceholder title={project.title} />;
}
