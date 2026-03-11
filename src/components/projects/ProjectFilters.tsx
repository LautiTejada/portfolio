"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectRole } from "@/lib/types/project";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import ProjectCard from "./ProjectCard";

interface ProjectFiltersProps {
	projects: Project[];
	locale: Locale;
	dict: Dictionary;
}

export default function ProjectFilters({
	projects,
	locale,
	dict,
}: ProjectFiltersProps) {
	const [activeRole, setActiveRole] = useState<ProjectRole | "all">("all");
	const [activeTag, setActiveTag] = useState<string | null>(null);

	const roleOptions: { value: ProjectRole | "all"; label: string }[] = [
		{ value: "all", label: dict.projects.allRoles },
		{ value: "frontend", label: dict.projects.roleLabels.frontend },
		{ value: "backend", label: dict.projects.roleLabels.backend },
		{ value: "fullstack", label: dict.projects.roleLabels.fullstack },
	];

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
				{roleOptions.map(({ value, label }) => (
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
					{dict.projects.allTags}
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
							locale={locale}
							dict={dict}
						/>
					))
				) : (
					<p className="py-12 text-center text-sm text-foreground/40">
						{dict.projects.noResults}
					</p>
				)}
			</div>
		</div>
	);
}
