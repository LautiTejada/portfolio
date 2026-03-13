import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/layout/Container";
import { getAllProjects } from "@/lib/content/projects";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import HowIWork from "@/components/home/HowIWork";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

interface PageProps {
	params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
	title: "Home",
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
				<div className="flex flex-col-reverse items-center gap-12 lg:flex-row lg:items-start lg:justify-between">
					{/* Text */}
					<div className="max-w-2xl text-center lg:text-left">
						<p className="animate-fade-in-up text-sm font-medium uppercase tracking-widest text-foreground/40">
							{dict.hero.label}
						</p>
						<h1 className="animate-fade-in-up animation-delay-100 mt-3 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
							{dict.hero.title}{" "}
							<span className="text-foreground/60">
								{dict.hero.titleHighlight}
							</span>
						</h1>
						<p className="animate-fade-in-up animation-delay-200 mt-6 max-w-xl text-lg leading-relaxed text-foreground/60">
							{dict.hero.description}
						</p>
						<div className="animate-fade-in-up animation-delay-300 mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
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
							<a
								href="/cv.pdf"
								download="cv.pdf"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex h-12 items-center justify-center rounded-full border border-foreground/20 px-6 text-sm font-medium transition-colors hover:bg-foreground/5">
								{dict.hero.downloadCV} ↓
							</a>
							<span className="text-xs text-foreground/40 mt-2 block">
								{dict.hero.downloadCVMobileHint}
							</span>
						</div>
					</div>

					{/* Photo */}
					<div className="animate-fade-in-up animation-delay-200 shrink-0">
						<div className="relative h-48 w-48 overflow-hidden rounded-full ring-2 ring-foreground/10 ring-offset-4 ring-offset-background sm:h-56 sm:w-56 lg:h-64 lg:w-64">
							<Image
								src="/me.jpg"
								alt="Lautaro Tejada"
								fill
								className="object-cover"
								priority
								sizes="(max-width: 640px) 192px, (max-width: 1024px) 224px, 256px"
							/>
						</div>
					</div>
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
					<AnimateOnScroll>
						<h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
							{dict.cta.title}
						</h2>
					</AnimateOnScroll>
					<AnimateOnScroll delay={0.1}>
						<p className="mx-auto mt-3 max-w-md text-foreground/60">
							{dict.cta.description}
						</p>
					</AnimateOnScroll>
					<AnimateOnScroll delay={0.2}>
						<Link
							href={`/${locale}/contact`}
							className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-sm font-medium text-background transition-colors hover:bg-foreground/90">
							{dict.cta.button}
						</Link>
					</AnimateOnScroll>
				</Container>
			</div>
		</>
	);
}
