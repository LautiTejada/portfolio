"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectRole } from "@/lib/types/project";
import ProjectCard from "./ProjectCard";

interface ProjectFiltersProps {
	projects: Project[];
}

const ROLE_OPTIONS: { value: ProjectRole | "all"; label: string }[] = [
	{ value: "all", label: "All" },
	{ value: "frontend", label: "Frontend" },
	{ value: "backend", label: "Backend" },
	{ value: "fullstack", label: "Fullstack" },
];

export default function ProjectFilters({ projects }: ProjectFiltersProps) {
	const [activeRole, setActiveRole] = useState<ProjectRole | "all">("all");
	const [activeTag, setActiveTag] = useState<string | null>(null);

	const allTags = useMemo(() => {
		const tags = new Set<string>();
		projects.forEach((p) => p.frontmatter.stack.forEach((t) => tags.add(t)));
		return Array.from(tags).sort();
	}, [projects]);

	const filtered = useMemo(() => {
		return projects.filter((p) => {
			if (activeRole !== "all" && p.frontmatter.role !== activeRole)
				return false;
			if (activeTag && !p.frontmatter.stack.includes(activeTag)) return false;
			return true;
		});
	}, [projects, activeRole, activeTag]);

	return (
		<div>
			{/* Role filter */}
			<div className="flex flex-wrap gap-2">
				{ROLE_OPTIONS.map(({ value, label }) => (
					<button
						key={value}
						onClick={() => setActiveRole(value)}
						className={`rounded-full px-3 py-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-foreground/30 ${
							activeRole === value
								? "bg-foreground text-background"
								: "bg-foreground/5 text-foreground/60 hover:bg-foreground/10"
						}`}>
						{label}
					</button>
				))}
			</div>

			{/* Stack tag filter */}
			<div className="mt-3 flex flex-wrap gap-1.5">
				<button
					onClick={() => setActiveTag(null)}
					className={`rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-foreground/30 ${
						activeTag === null
							? "bg-foreground text-background"
							: "bg-foreground/5 text-foreground/60 hover:bg-foreground/10"
					}`}>
					All tags
				</button>
				{allTags.map((tag) => (
					<button
						key={tag}
						onClick={() => setActiveTag(activeTag === tag ? null : tag)}
						className={`rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-foreground/30 ${
							activeTag === tag
								? "bg-foreground text-background"
								: "bg-foreground/5 text-foreground/60 hover:bg-foreground/10"
						}`}>
						{tag}
					</button>
				))}
			</div>

			{/* Project list */}
			<div className="mt-8 grid gap-4">
				{filtered.length > 0 ? (
					filtered.map((project) => (
						<ProjectCard
							key={project.frontmatter.slug}
							frontmatter={project.frontmatter}
						/>
					))
				) : (
					<p className="py-12 text-center text-sm text-foreground/40">
						No projects match the selected filters.
					</p>
				)}
			</div>
		</div>
	);
}
