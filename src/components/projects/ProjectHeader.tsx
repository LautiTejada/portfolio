import Link from "next/link";
import type { ProjectFrontmatter } from "@/lib/types/project";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import ImageShowcase from "./ImageShowcase";

interface ProjectHeaderProps {
	frontmatter: ProjectFrontmatter;
	dict: Dictionary;
	locale: Locale;
}

export default function ProjectHeader({
	frontmatter,
	dict,
	locale,
}: ProjectHeaderProps) {
	const {
		title,
		summary,
		year,
		role,
		confidentiality,
		stack,
		repoUrl,
		liveUrl,
		images,
	} = frontmatter;

	return (
		<header>
			{/* Back link */}
			<Link
				href={`/${locale}/projects`}
				className="inline-flex items-center gap-1.5 text-sm text-foreground/40 transition-colors hover:text-foreground">
				<svg
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round">
					<path d="m15 18-6-6 6-6" />
				</svg>
				{dict.nav.projects}
			</Link>

			{/* Title */}
			<h1 className="mt-8 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
				{title}
			</h1>

			{/* Summary */}
			<p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/55 sm:text-lg">
				{summary}
			</p>

			{/* Info bar */}
			<div className="mt-6 flex flex-wrap items-center gap-2.5">
				<span className="rounded-full bg-foreground/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-foreground/70">
					{dict.projects.roleLabels[role]}
				</span>
				<span
					className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${
						confidentiality === "public"
							? "bg-green-500/10 text-green-600 dark:text-green-400"
							: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
					}`}>
					{dict.projects.confidentialityLabels[confidentiality]}
				</span>
				<span className="text-xs tabular-nums text-foreground/30">{year}</span>

				<div className="hidden sm:block sm:flex-1" />

				{repoUrl && (
					<a
						href={repoUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 px-3 py-1 text-xs text-foreground/45 transition-colors hover:border-foreground/25 hover:text-foreground">
						<svg
							width="13"
							height="13"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round">
							<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
						</svg>
						{dict.projects.repo}
					</a>
				)}
				{liveUrl && (
					<a
						href={liveUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 px-3 py-1 text-xs text-foreground/45 transition-colors hover:border-foreground/25 hover:text-foreground">
						<svg
							width="13"
							height="13"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round">
							<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
							<polyline points="15 3 21 3 21 9" />
							<line x1="10" y1="14" x2="21" y2="3" />
						</svg>
						{dict.projects.live}
					</a>
				)}
			</div>

			{/* Stack */}
			<div className="mt-4 flex flex-wrap gap-1.5">
				{stack.map((tech) => (
					<span
						key={tech}
						className="rounded-md bg-foreground/[0.04] px-2.5 py-0.5 text-xs text-foreground/50">
						{tech}
					</span>
				))}
			</div>

			{/* Image showcase */}
			{images && images.length > 0 && (
				<ImageShowcase images={images} title={title} urlHint={liveUrl} />
			)}

			{/* Spacer when floating image overflows */}
			{images && images.length > 1 && <div className="h-10 sm:h-12" />}
		</header>
	);
}
