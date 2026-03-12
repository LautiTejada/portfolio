/** Rol desempeñado en el proyecto. */
export type ProjectRole = "frontend" | "backend" | "fullstack";

/** Nivel de confidencialidad del proyecto. */
export type ProjectConfidentiality = "public" | "internal";

/** Frontmatter esperado en cada archivo MDX de proyecto. */
export interface ProjectFrontmatter {
	title: string;
	slug: string;
	summary: string;
	role: ProjectRole;
	stack: string[];
	featured: boolean;
	year: number;
	confidentiality: ProjectConfidentiality;
	highlights: string[];
	repoUrl?: string;
	liveUrl?: string;
	images?: string[];
}

/** Proyecto con frontmatter tipado + contenido raw MDX. */
export interface Project {
	frontmatter: ProjectFrontmatter;
	content: string;
}
