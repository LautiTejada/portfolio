import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllProjects } from "@/lib/content/projects";
import Container from "@/components/layout/Container";
import ProjectFilters from "@/components/projects/ProjectFilters";
import { ProjectGridSkeleton } from "@/components/projects/ProjectCardSkeleton";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

interface PageProps {
	params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
	title: "Projects",
	description:
		"A curated selection of projects I've worked on — filtered by role and tech stack.",
};

export default async function ProjectsPage({ params }: PageProps) {
	const { locale: loc } = await params;
	const locale = loc as Locale;
	const dict = await getDictionary(locale);
	const projects = await getAllProjects(locale);

	return (
		<Container className="py-16">
			<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
				{dict.projects.title}
			</h1>
			<p className="mt-2 max-w-lg text-foreground/60">
				{dict.projects.description}
			</p>

			<div className="mt-10">
				<Suspense fallback={<ProjectGridSkeleton />}>
					<ProjectFilters projects={projects} locale={locale} dict={dict} />
				</Suspense>
			</div>
		</Container>
	);
}
