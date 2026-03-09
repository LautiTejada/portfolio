import Link from "next/link";
import type { Project } from "@/lib/types/project";
import ProjectCard from "@/components/projects/ProjectCard";

interface FeaturedProjectsProps {
	projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
	if (projects.length === 0) return null;

	return (
		<section>
			<div className="flex items-end justify-between gap-4">
				<h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
					Featured Projects
				</h2>
				<Link
					href="/projects"
					className="shrink-0 text-sm font-medium text-foreground/50 transition-colors hover:text-foreground">
					View all →
				</Link>
			</div>

			<div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{projects.map((project) => (
					<ProjectCard
						key={project.frontmatter.slug}
						frontmatter={project.frontmatter}
					/>
				))}
			</div>
		</section>
	);
}
