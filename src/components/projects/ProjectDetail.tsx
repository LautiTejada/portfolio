"use client";

import { useEffect, useState } from "react";
import type { ProjectFrontmatter } from "@/lib/types/project";
import type { HiringMode } from "@/components/hiring/HiringModeToggle";
import HiringModeToggle from "@/components/hiring/HiringModeToggle";

interface ProjectDetailProps {
	frontmatter: ProjectFrontmatter;
	mdxContent: React.ReactNode;
	retroContent?: string;
}

const STORAGE_KEY = "hiringMode";

export default function ProjectDetail({
	frontmatter,
	mdxContent,
	retroContent,
}: ProjectDetailProps) {
	const [mode, setMode] = useState<HiringMode>("recruiter");

	useEffect(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored === "recruiter" || stored === "techlead") {
			setMode(stored);
		}
	}, []);

	const { summary, highlights, repoUrl, liveUrl } = frontmatter;

	return (
		<div className="mt-8">
			<HiringModeToggle onChange={setMode} />

			{mode === "recruiter" ? (
				<section className="mt-8">
					<h2 className="text-xl font-semibold tracking-tight">Summary</h2>
					<p className="mt-3 leading-relaxed text-foreground/70">{summary}</p>

					{highlights.length > 0 && (
						<div className="mt-6">
							<h2 className="text-xl font-semibold tracking-tight">
								Highlights
							</h2>
							<ul className="mt-3 space-y-2">
								{highlights.map((item) => (
									<li
										key={item}
										className="flex items-start gap-2 text-foreground/70">
										<span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/30" />
										{item}
									</li>
								))}
							</ul>
						</div>
					)}

					{(repoUrl || liveUrl) && (
						<div className="mt-6">
							<h2 className="text-xl font-semibold tracking-tight">Links</h2>
							<div className="mt-3 flex gap-3">
								{repoUrl && (
									<a
										href={repoUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="rounded-md border border-foreground/10 px-3 py-1.5 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/30">
										Repository ↗
									</a>
								)}
								{liveUrl && (
									<a
										href={liveUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="rounded-md border border-foreground/10 px-3 py-1.5 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/30">
										Live Demo ↗
									</a>
								)}
							</div>
						</div>
					)}
				</section>
			) : (
				<section className="mt-8">
					{mdxContent}

					{retroContent && (
						<div className="mt-10 rounded-xl border border-foreground/10 p-6">
							<h2 className="text-xl font-semibold tracking-tight">
								Qué haría diferente
							</h2>
							<p className="mt-3 leading-relaxed text-foreground/70">
								{retroContent}
							</p>
						</div>
					)}
				</section>
			)}
		</div>
	);
}
