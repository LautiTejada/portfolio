export default function ProjectCardSkeleton() {
	return (
		<div className="animate-pulse rounded-xl border border-foreground/10 p-5">
			<div className="flex items-start justify-between gap-3">
				<div className="h-5 w-3/4 rounded bg-foreground/10" />
				<div className="h-4 w-10 rounded bg-foreground/10" />
			</div>
			<div className="mt-3 space-y-2">
				<div className="h-3 w-full rounded bg-foreground/5" />
				<div className="h-3 w-5/6 rounded bg-foreground/5" />
			</div>
			<div className="mt-4 flex gap-1.5">
				<div className="h-5 w-16 rounded-full bg-foreground/5" />
				<div className="h-5 w-14 rounded-full bg-foreground/5" />
				<div className="h-5 w-20 rounded-full bg-foreground/5" />
			</div>
			<div className="mt-4 flex gap-2">
				<div className="h-5 w-16 rounded-md bg-foreground/10" />
				<div className="h-5 w-14 rounded-md bg-foreground/10" />
			</div>
		</div>
	);
}

export function ProjectGridSkeleton({ count = 6 }: { count?: number }) {
	return (
		<div className="grid gap-4 sm:grid-cols-2">
			{Array.from({ length: count }).map((_, i) => (
				<ProjectCardSkeleton key={i} />
			))}
		</div>
	);
}
