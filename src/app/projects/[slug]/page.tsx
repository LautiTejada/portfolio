import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/content/projects";
import Container from "@/components/layout/Container";
import ProjectHeader from "@/components/projects/ProjectHeader";
import ProjectDetail from "@/components/projects/ProjectDetail";
import MDXWrapper from "@/components/projects/MDXWrapper";

interface PageProps {
	params: { slug: string };
}

/**
 * Extrae la sección "Qué haría diferente" del content MDX si existe.
 * Busca un heading ## que contenga esas palabras.
 */
function extractRetroSection(content: string): string | undefined {
	const regex =
		/^##\s*qu[eé]\s+har[ií]a\s+diferente\s*\n([\s\S]*?)(?=^##\s|\z)/im;
	const match = content.match(regex);
	if (!match) return undefined;
	return match[1].trim() || undefined;
}

export async function generateStaticParams() {
	const slugs = await getAllProjectSlugs();
	return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
	const project = await getProjectBySlug(params.slug);
	if (!project) return { title: "Project not found" };

	const { title, summary } = project.frontmatter;

	return {
		title: `${title} | Projects`,
		description: summary,
		openGraph: {
			title: `${title} | Projects`,
			description: summary,
			images: ["/og.png"],
		},
		twitter: {
			card: "summary_large_image",
			title: `${title} | Projects`,
			description: summary,
			images: ["/og.png"],
		},
	};
}

export default async function ProjectPage({ params }: PageProps) {
	const { slug } = params;
	const project = await getProjectBySlug(slug);

	if (!project) notFound();

	const retroContent = extractRetroSection(project.content);

	let MDXComponent: React.ComponentType;
	try {
		MDXComponent = (await import(`@/content/projects/${slug}.mdx`)).default;
	} catch {
		notFound();
	}

	const mdxContent = (
		<MDXWrapper>
			<MDXComponent />
		</MDXWrapper>
	);

	return (
		<Container className="py-16">
			<ProjectHeader frontmatter={project.frontmatter} />
			<ProjectDetail
				frontmatter={project.frontmatter}
				mdxContent={mdxContent}
				retroContent={retroContent}
			/>
		</Container>
	);
}
