import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { getAllProjects } from "@/lib/content/projects";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import HowIWork from "@/components/home/HowIWork";

export const metadata: Metadata = {
	title: "Home | Your Name",
	description:
		"Fullstack developer building performant, maintainable web products with Next.js, TypeScript, and Node.",
};

export default async function Home() {
	const allProjects = await getAllProjects();
	const featured = allProjects
		.filter((p) => p.frontmatter.featured)
		.slice(0, 3);

	return (
		<>
			{/* Hero */}
			<Container className="py-24 sm:py-32">
				<p className="text-sm font-medium uppercase tracking-widest text-foreground/40">
					Portfolio
				</p>
				<h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
					Fullstack Developer —{" "}
					<span className="text-foreground/60">
						Next.js / TypeScript / Node
					</span>
				</h1>
				<p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/60">
					I build performant, maintainable web products with a focus on
					developer experience and real-world impact.
				</p>
				<div className="mt-8 flex flex-col gap-4 sm:flex-row">
					<Link
						href="/projects"
						className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-foreground/90">
						View Projects
					</Link>
					<Link
						href="/contact"
						className="inline-flex h-12 items-center justify-center rounded-full border border-foreground/20 px-6 text-sm font-medium transition-colors hover:bg-foreground/5">
						Contact
					</Link>
				</div>
			</Container>

			{/* Featured Projects */}
			<Container className="pb-20">
				<FeaturedProjects projects={featured} />
			</Container>

			{/* How I Work */}
			<div className="border-t border-foreground/5">
				<Container className="py-20">
					<HowIWork />
				</Container>
			</div>

			{/* Final CTA */}
			<div className="border-t border-foreground/5">
				<Container className="py-20 text-center">
					<h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
						Let&apos;s build something
					</h2>
					<p className="mx-auto mt-3 max-w-md text-foreground/60">
						Have a project in mind? I&apos;m open to new opportunities and
						collaborations.
					</p>
					<Link
						href="/contact"
						className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-sm font-medium text-background transition-colors hover:bg-foreground/90">
						Get in Touch
					</Link>
				</Container>
			</div>
		</>
	);
}
