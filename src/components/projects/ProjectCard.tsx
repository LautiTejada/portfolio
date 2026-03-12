import Link from "next/link";
import type { ProjectFrontmatter } from "@/lib/types/project";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";

interface ProjectCardProps {
	frontmatter: ProjectFrontmatter;
	locale?: Locale;
	dict?: Dictionary;
}

export default function ProjectCard({
	frontmatter,
	locale,
	dict,
}: ProjectCardProps) {
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

	const roleLabel = dict?.projects.roleLabels[role] ?? role;
	const confLabel = dict
		? dict.projects.confidentialityLabels[confidentiality]
		: confidentiality === "public"
			? "Public"
			: "Internal";
	const prefix = locale ? `/${locale}` : "";

	return (
		<article className="group relative rounded-xl border border-foreground/10 bg-foreground/[0.02] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:bg-foreground/[0.04] hover:shadow-lg hover:shadow-foreground/5 focus-within:ring-2 focus-within:ring-foreground/30">
			{/* Top row: badges + year */}
			<div className="flex items-center gap-2">
				<span className="rounded-md bg-foreground/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide">
					{roleLabel}
				</span>
				<span
					className={`rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${
						confidentiality === "public"
							? "bg-green-500/10 text-green-700 dark:text-green-400"
							: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
					}`}>
					{confLabel}
				</span>
				<span className="ml-auto text-xs tabular-nums text-foreground/35">
					{year}
				</span>
			</div>

			{/* Title */}
			<Link
				href={`${prefix}/projects/${slug}`}
				className="mt-3 block text-lg font-semibold tracking-tight transition-colors group-hover:text-foreground/80 focus:outline-none">
				<span className="inline-flex items-center gap-1.5">
					{title}
					<svg
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-60">
						<path d="M5 12h14" />
						<path d="m12 5 7 7-7 7" />
					</svg>
				</span>
			</Link>

			{/* Summary */}
			<p className="mt-2 line-clamp-2 text-sm leading-relaxed text-foreground/55">
				{summary}
			</p>

			{/* Stack */}
			<div className="mt-4 flex flex-wrap gap-1.5">
				{stack.map((tech) => (
					<span
						key={tech}
						className="rounded-full border border-foreground/8 bg-foreground/[0.04] px-2.5 py-0.5 text-[11px] font-medium text-foreground/60">
						{tech}
					</span>
				))}
			</div>

			{/* External links */}
			{(repoUrl || liveUrl) && (
				<div className="mt-4 flex items-center gap-3 border-t border-foreground/[0.06] pt-3">
					{repoUrl && (
						<a
							href={repoUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1 text-xs font-medium text-foreground/45 transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/30">
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
							{dict?.projects.repo ?? "Repo"}
						</a>
					)}
					{liveUrl && (
						<a
							href={liveUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1 text-xs font-medium text-foreground/45 transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/30">
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
							{dict?.projects.live ?? "Live"}
						</a>
					)}
				</div>
			)}
		</article>
	);
}
