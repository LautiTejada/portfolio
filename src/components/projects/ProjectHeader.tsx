import type { ProjectFrontmatter } from "@/lib/types/project";

interface ProjectHeaderProps {
	frontmatter: ProjectFrontmatter;
}

const roleLabels: Record<ProjectFrontmatter["role"], string> = {
	frontend: "Frontend",
	backend: "Backend",
	fullstack: "Fullstack",
};

export default function ProjectHeader({ frontmatter }: ProjectHeaderProps) {
	const { title, year, role, confidentiality, stack, repoUrl, liveUrl } =
		frontmatter;

	return (
		<div>
			<div className="flex items-start justify-between gap-4">
				<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
					{title}
				</h1>
				<span className="shrink-0 mt-1 text-sm text-foreground/40">{year}</span>
			</div>

			<div className="mt-4 flex flex-wrap items-center gap-2">
				<span className="rounded-md bg-foreground/10 px-2.5 py-1 text-xs font-medium">
					{roleLabels[role]}
				</span>
				<span
					className={`rounded-md px-2.5 py-1 text-xs font-medium ${
						confidentiality === "public"
							? "bg-green-500/10 text-green-700 dark:text-green-400"
							: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
					}`}>
					{confidentiality === "public" ? "Public" : "Internal"}
				</span>

				{repoUrl && (
					<a
						href={repoUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="rounded-md border border-foreground/10 px-2.5 py-1 text-xs font-medium text-foreground/60 transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/30">
						Repo ↗
					</a>
				)}
				{liveUrl && (
					<a
						href={liveUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="rounded-md border border-foreground/10 px-2.5 py-1 text-xs font-medium text-foreground/60 transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/30">
						Live ↗
					</a>
				)}
			</div>

			<div className="mt-4 flex flex-wrap gap-1.5">
				{stack.map((tech) => (
					<span
						key={tech}
						className="rounded-full bg-foreground/5 px-2.5 py-0.5 text-xs font-medium text-foreground/70">
						{tech}
					</span>
				))}
			</div>
		</div>
	);
}
