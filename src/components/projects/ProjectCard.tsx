import Link from "next/link";
import type { ProjectFrontmatter } from "@/lib/types/project";

interface ProjectCardProps {
	frontmatter: ProjectFrontmatter;
}

const roleLabels: Record<ProjectFrontmatter["role"], string> = {
	frontend: "Frontend",
	backend: "Backend",
	fullstack: "Fullstack",
};

export default function ProjectCard({ frontmatter }: ProjectCardProps) {
	const {
		title,
		slug,
		summary,
		year,
		role,
		stack,
		confidentiality,
		repoUrl,
		liveUrl,
	} = frontmatter;

	return (
		<article className="group rounded-xl border border-foreground/10 p-5 transition-colors hover:border-foreground/20 focus-within:ring-2 focus-within:ring-foreground/30">
			<div className="flex items-start justify-between gap-3">
				<Link
					href={`/projects/${slug}`}
					className="text-lg font-semibold tracking-tight transition-colors group-hover:text-foreground/80 focus:outline-none">
					{title}
				</Link>
				<span className="shrink-0 text-sm text-foreground/40">{year}</span>
			</div>

			<p className="mt-2 text-sm leading-relaxed text-foreground/60">
				{summary}
			</p>

			<div className="mt-3 flex flex-wrap gap-1.5">
				{stack.map((tech) => (
					<span
						key={tech}
						className="rounded-full bg-foreground/5 px-2.5 py-0.5 text-xs font-medium text-foreground/70">
						{tech}
					</span>
				))}
			</div>

			<div className="mt-4 flex flex-wrap items-center gap-2">
				<span className="rounded-md bg-foreground/10 px-2 py-0.5 text-xs font-medium">
					{roleLabels[role]}
				</span>
				<span
					className={`rounded-md px-2 py-0.5 text-xs font-medium ${
						confidentiality === "public"
							? "bg-green-500/10 text-green-700 dark:text-green-400"
							: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
					}`}>
					{confidentiality === "public" ? "Public" : "Internal"}
				</span>

				<div className="ml-auto flex items-center gap-2">
					{repoUrl && (
						<a
							href={repoUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="rounded-md px-2 py-0.5 text-xs font-medium text-foreground/50 transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/30">
							Repo
						</a>
					)}
					{liveUrl && (
						<a
							href={liveUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="rounded-md px-2 py-0.5 text-xs font-medium text-foreground/50 transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/30">
							Live
						</a>
					)}
				</div>
			</div>
		</article>
	);
}
