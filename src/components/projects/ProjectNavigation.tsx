import Link from "next/link";
import type { Locale } from "@/i18n/config";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

interface ProjectNavigationProps {
	prev: { slug: string; title: string } | null;
	next: { slug: string; title: string } | null;
	locale: Locale;
}

export default function ProjectNavigation({
	prev,
	next,
	locale,
}: ProjectNavigationProps) {
	if (!prev && !next) return null;

	return (
		<AnimateOnScroll>
			<nav className="mt-16 flex flex-col items-stretch gap-4 border-t border-foreground/10 pt-8 sm:flex-row">
				{prev ? (
					<Link
						href={`/${locale}/projects/${prev.slug}`}
						className="group flex flex-1 flex-col rounded-lg border border-foreground/10 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md hover:shadow-foreground/5">
						<span className="text-xs font-medium uppercase tracking-wider text-foreground/40">
							&larr; Prev
						</span>
						<span className="mt-1 text-sm font-medium transition-colors group-hover:text-foreground">
							{prev.title}
						</span>
					</Link>
				) : (
					<div className="flex-1" />
				)}
				{next ? (
					<Link
						href={`/${locale}/projects/${next.slug}`}
						className="group flex flex-1 flex-col items-end rounded-lg border border-foreground/10 p-4 text-right transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md hover:shadow-foreground/5">
						<span className="text-xs font-medium uppercase tracking-wider text-foreground/40">
							Next &rarr;
						</span>
						<span className="mt-1 text-sm font-medium transition-colors group-hover:text-foreground">
							{next.title}
						</span>
					</Link>
				) : (
					<div className="flex-1" />
				)}
			</nav>
		</AnimateOnScroll>
	);
}
