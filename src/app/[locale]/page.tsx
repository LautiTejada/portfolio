import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { getAllProjects } from "@/lib/content/projects";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import HowIWork from "@/components/home/HowIWork";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

interface PageProps {
	params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
	title: "Home | Your Name",
	description:
		"Fullstack developer building performant, maintainable web products with Next.js, TypeScript, and Node.",
};

export default async function Home({ params }: PageProps) {
	const { locale: loc } = await params;
	const locale = loc as Locale;
	const dict = await getDictionary(locale);
	const allProjects = await getAllProjects(locale);
	const featured = allProjects
		.filter((p) => p.frontmatter.featured)
		.slice(0, 3);

	return (
		<>
			{/* Hero */}
			<Container className="py-24 sm:py-32">
				<p className="text-sm font-medium uppercase tracking-widest text-foreground/40">
					{dict.hero.label}
				</p>
				<h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
					{dict.hero.title}{" "}
					<span className="text-foreground/60">{dict.hero.titleHighlight}</span>
				</h1>
				<p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/60">
					{dict.hero.description}
				</p>
				<div className="mt-8 flex flex-col gap-4 sm:flex-row">
					<Link
						href={`/${locale}/projects`}
						className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-foreground/90">
						{dict.hero.viewProjects}
					</Link>
					<Link
						href={`/${locale}/contact`}
						className="inline-flex h-12 items-center justify-center rounded-full border border-foreground/20 px-6 text-sm font-medium transition-colors hover:bg-foreground/5">
						{dict.hero.contact}
					</Link>
				</div>
			</Container>

			{/* Featured Projects */}
			<Container className="pb-20">
				<FeaturedProjects projects={featured} locale={locale} dict={dict} />
			</Container>

			{/* How I Work */}
			<div className="border-t border-foreground/5">
				<Container className="py-20">
					<HowIWork dict={dict} />
				</Container>
			</div>

			{/* Final CTA */}
			<div className="border-t border-foreground/5">
				<Container className="py-20 text-center">
					<h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
						{dict.cta.title}
					</h2>
					<p className="mx-auto mt-3 max-w-md text-foreground/60">
						{dict.cta.description}
					</p>
					<Link
						href={`/${locale}/contact`}
						className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-sm font-medium text-background transition-colors hover:bg-foreground/90">
						{dict.cta.button}
					</Link>
				</Container>
			</div>
		</>
	);
}
