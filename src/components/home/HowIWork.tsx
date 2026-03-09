const steps = [
	{
		number: "01",
		title: "Discover",
		description:
			"Understand the problem, the users, and the constraints before writing a single line of code.",
	},
	{
		number: "02",
		title: "Build",
		description:
			"Ship incrementally with clean architecture, type safety, and a focus on developer experience.",
	},
	{
		number: "03",
		title: "Test",
		description:
			"Validate with real feedback. Automated tests, performance audits, and edge-case coverage.",
	},
	{
		number: "04",
		title: "Ship",
		description:
			"Deploy with confidence. CI/CD, monitoring, and documentation from day one.",
	},
];

export default function HowIWork() {
	return (
		<section>
			<h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
				How I Work
			</h2>
			<div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{steps.map((step) => (
					<div key={step.number} className="space-y-2">
						<span className="text-sm font-semibold text-foreground/30">
							{step.number}
						</span>
						<h3 className="text-lg font-semibold tracking-tight">
							{step.title}
						</h3>
						<p className="text-sm leading-relaxed text-foreground/60">
							{step.description}
						</p>
					</div>
				))}
			</div>
		</section>
	);
}
