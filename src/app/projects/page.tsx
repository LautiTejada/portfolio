import type { Metadata } from "next";
import { getAllProjects } from "@/lib/content/projects";
import Container from "@/components/layout/Container";
import ProjectFilters from "@/components/projects/ProjectFilters";

export const metadata: Metadata = {
	title: "Projects",
	description:
		"A curated selection of projects I've worked on — filtered by role and tech stack.",
};

export default async function ProjectsPage() {
	const projects = await getAllProjects();

	return (
		<Container className="py-16">
			<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
				Projects
			</h1>
			<p className="mt-2 max-w-lg text-foreground/60">
				A selection of projects I&apos;ve worked on — filtered by role and tech
				stack.
			</p>

			<div className="mt-10">
				<ProjectFilters projects={projects} />
			</div>
		</Container>
	);
}
