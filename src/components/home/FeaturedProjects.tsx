import Link from "next/link";
import type { Project } from "@/lib/types/project";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import ProjectCard from "@/components/projects/ProjectCard";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

interface FeaturedProjectsProps {
	projects: Project[];
	locale: Locale;
	dict: Dictionary;
}

export default function FeaturedProjects({
	projects,
	locale,
	dict,
}: FeaturedProjectsProps) {
	if (projects.length === 0) return null;

	return (
		<section>
			<AnimateOnScroll>
				<div className="flex items-end justify-between gap-4">
					<h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
						{dict.featuredProjects.title}
					</h2>
					<Link
						href={`/${locale}/projects`}
						className="shrink-0 text-sm font-medium text-foreground/50 transition-colors hover:text-foreground">
						{dict.featuredProjects.viewAll}
					</Link>
				</div>
			</AnimateOnScroll>

			<div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{projects.map((project, index) => (
					<AnimateOnScroll key={project.frontmatter.slug} delay={index * 0.1}>
						<ProjectCard
							frontmatter={project.frontmatter}
							locale={locale}
							dict={dict}
						/>
					</AnimateOnScroll>
				))}
			</div>
		</section>
	);
}
