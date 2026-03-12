import Container from "@/components/layout/Container";

export default function Loading() {
	return (
		<Container className="py-24 sm:py-32">
			<div className="animate-pulse space-y-6">
				<div className="h-4 w-20 rounded bg-foreground/10" />
				<div className="h-12 w-3/4 rounded bg-foreground/10" />
				<div className="h-5 w-1/2 rounded bg-foreground/5" />
				<div className="flex gap-4">
					<div className="h-12 w-36 rounded-full bg-foreground/10" />
					<div className="h-12 w-28 rounded-full bg-foreground/5" />
				</div>
			</div>
		</Container>
	);
}
