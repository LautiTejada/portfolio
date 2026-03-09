import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/content/projects";
import Container from "@/components/layout/Container";
import ProjectHeader from "@/components/projects/ProjectHeader";
import ProjectDetail from "@/components/projects/ProjectDetail";

interface PageProps {
	params: Promise<{ slug: string }>;
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
	const { slug } = await params;
	const project = await getProjectBySlug(slug);
	if (!project) return { title: "Project not found" };

	return {
		title: `${project.frontmatter.title} — Portfolio`,
		description: project.frontmatter.summary,
	};
}

export default async function ProjectPage({ params }: PageProps) {
	const { slug } = await params;
	const project = await getProjectBySlug(slug);

	if (!project) notFound();

	const retroContent = extractRetroSection(project.content);

	const MDXComponent = (await import(`@/content/projects/${slug}.mdx`)).default;

	const mdxContent = (
		<div className="mdx-content max-w-none [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:tracking-tight [&>h3]:mt-8 [&>h3]:mb-3 [&>h3]:text-lg [&>h3]:font-semibold [&>p]:mb-4 [&>p]:leading-relaxed [&>p]:text-foreground/70 [&>ul]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:text-foreground/70 [&>ol]:mb-4 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:text-foreground/70 [&_li]:mb-1 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-foreground/60 [&_strong]:font-semibold [&_strong]:text-foreground [&_code]:rounded [&_code]:bg-foreground/5 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&>hr]:my-8 [&>hr]:border-foreground/10">
			<MDXComponent />
		</div>
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
