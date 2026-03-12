import { notFound } from "next/navigation";
import {
	getProjectBySlug,
	getAllProjectSlugs,
	getAllProjects,
} from "@/lib/content/projects";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Container from "@/components/layout/Container";
import ProjectHeader from "@/components/projects/ProjectHeader";
import ProjectDetail from "@/components/projects/ProjectDetail";
import ProjectNavigation from "@/components/projects/ProjectNavigation";
import MDXWrapper from "@/components/projects/MDXWrapper";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

interface PageProps {
	params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
	const params: { locale: string; slug: string }[] = [];
	for (const locale of locales) {
		const slugs = await getAllProjectSlugs(locale);
		for (const slug of slugs) {
			params.push({ locale, slug });
		}
	}
	return params;
}

export async function generateMetadata({ params }: PageProps) {
	const { locale: loc, slug } = await params;
	const locale = loc as Locale;
	const project = await getProjectBySlug(locale, slug);
	if (!project) return { title: "Project not found" };

	const { title, summary } = project.frontmatter;

	return {
		title: `${title} | Projects`,
		description: summary,
		openGraph: {
			title: `${title} | Projects`,
			description: summary,
		},
		twitter: {
			card: "summary_large_image" as const,
			title: `${title} | Projects`,
			description: summary,
		},
	};
}

export default async function ProjectPage({ params }: PageProps) {
	const { locale: loc, slug } = await params;
	const locale = loc as Locale;
	const project = await getProjectBySlug(locale, slug);

	if (!project) notFound();

	const dict = await getDictionary(locale);

	// Get all projects for prev/next navigation
	const allProjects = await getAllProjects(locale);
	const currentIndex = allProjects.findIndex(
		(p) => p.frontmatter.slug === slug,
	);
	const prev =
		currentIndex > 0
			? {
					slug: allProjects[currentIndex - 1].frontmatter.slug,
					title: allProjects[currentIndex - 1].frontmatter.title,
				}
			: null;
	const next =
		currentIndex < allProjects.length - 1
			? {
					slug: allProjects[currentIndex + 1].frontmatter.slug,
					title: allProjects[currentIndex + 1].frontmatter.title,
				}
			: null;

	const mdxContent = (
		<MDXWrapper>
			<MDXRemote
				source={project.content}
				options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
			/>
		</MDXWrapper>
	);

	return (
		<Container className="py-16">
			<ProjectHeader
				frontmatter={project.frontmatter}
				dict={dict}
				locale={locale}
			/>
			<ProjectDetail
				frontmatter={project.frontmatter}
				mdxContent={mdxContent}
				dict={dict}
			/>
			<ProjectNavigation prev={prev} next={next} locale={locale} />
		</Container>
	);
}
