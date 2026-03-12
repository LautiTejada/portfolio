import type { ProjectFrontmatter } from "@/lib/types/project";
import type { Dictionary } from "@/i18n/getDictionary";

interface ProjectDetailProps {
	frontmatter: ProjectFrontmatter;
	mdxContent: React.ReactNode;
	dict: Dictionary;
}

export default function ProjectDetail({
	frontmatter,
	mdxContent,
	dict,
}: ProjectDetailProps) {
	const { highlights } = frontmatter;

	return (
		<div className="mt-10">
			{/* Highlights grid */}
			{highlights.length > 0 && (
				<div className="mb-12">
					<h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground/35">
						{dict.projects.highlights}
					</h2>
					<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{highlights.map((item, i) => (
							<div
								key={item}
								className="rounded-lg border border-foreground/[0.06] bg-foreground/[0.02] px-4 py-3">
								<span className="mr-2 text-xs font-bold tabular-nums text-foreground/20">
									{String(i + 1).padStart(2, "0")}
								</span>
								<span className="text-sm leading-relaxed text-foreground/65">
									{item}
								</span>
							</div>
						))}
					</div>
				</div>
			)}

			{/* MDX content */}
			<div className="max-w-3xl">{mdxContent}</div>
		</div>
	);
}
