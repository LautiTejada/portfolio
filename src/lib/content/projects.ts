import { readdir, readFile } from "fs/promises";
import path from "path";
import matter from "gray-matter";
import type {
	Project,
	ProjectFrontmatter,
	ProjectRole,
	ProjectConfidentiality,
} from "@/lib/types/project";
import type { Locale } from "@/i18n/config";

/** Directorio base donde se guardan los archivos MDX de proyectos por locale. */
const PROJECTS_BASE = path.join(process.cwd(), "src", "content", "projects");

function getProjectsDir(locale: Locale): string {
	return path.join(PROJECTS_BASE, locale);
}

/** Roles válidos para validación en runtime. */
const VALID_ROLES: ProjectRole[] = ["frontend", "backend", "fullstack"];

/** Niveles de confidencialidad válidos. */
const VALID_CONFIDENTIALITY: ProjectConfidentiality[] = ["public", "internal"];

/**
 * Campos requeridos en el frontmatter y su tipo esperado.
 * Se usa para validación en runtime ya que gray-matter devuelve `unknown`.
 */
const REQUIRED_FIELDS: Record<string, string> = {
	title: "string",
	slug: "string",
	summary: "string",
	role: "string",
	stack: "object", // Array.isArray se valida aparte
	featured: "boolean",
	year: "number",
	confidentiality: "string",
	highlights: "object",
};

/**
 * Valida que el frontmatter contenga todos los campos requeridos
 * con los tipos correctos. Lanza un error descriptivo si falta algo.
 */
function validateFrontmatter(
	data: Record<string, unknown>,
	fileName: string,
): asserts data is Record<string, unknown> & ProjectFrontmatter {
	for (const [field, expectedType] of Object.entries(REQUIRED_FIELDS)) {
		if (!(field in data) || data[field] === undefined || data[field] === null) {
			throw new Error(`[MDX] Missing required field "${field}" in ${fileName}`);
		}

		if (typeof data[field] !== expectedType) {
			throw new Error(
				`[MDX] Field "${field}" in ${fileName} should be ${expectedType}, got ${typeof data[field]}`,
			);
		}
	}

	if (
		!Array.isArray(data.stack) ||
		!data.stack.every((item) => typeof item === "string")
	) {
		throw new Error(
			`[MDX] Field "stack" in ${fileName} should be an array of strings`,
		);
	}

	if (
		!Array.isArray(data.highlights) ||
		!data.highlights.every((item) => typeof item === "string")
	) {
		throw new Error(
			`[MDX] Field "highlights" in ${fileName} should be an array of strings`,
		);
	}

	if (!VALID_ROLES.includes(data.role as ProjectRole)) {
		throw new Error(
			`[MDX] Invalid role "${data.role}" in ${fileName}. Expected: ${VALID_ROLES.join(", ")}`,
		);
	}

	if (
		!VALID_CONFIDENTIALITY.includes(
			data.confidentiality as ProjectConfidentiality,
		)
	) {
		throw new Error(
			`[MDX] Invalid confidentiality "${data.confidentiality}" in ${fileName}. Expected: ${VALID_CONFIDENTIALITY.join(", ")}`,
		);
	}
}

/**
 * Lee un archivo MDX de proyecto por slug.
 * Retorna `null` si el archivo no existe.
 */
export async function getProjectBySlug(
	locale: Locale,
	slug: string,
): Promise<Project | null> {
	const filePath = path.join(getProjectsDir(locale), `${slug}.mdx`);

	let raw: string;
	try {
		raw = await readFile(filePath, "utf-8");
	} catch {
		return null;
	}

	const { data, content } = matter(raw);
	validateFrontmatter(data, `${slug}.mdx`);

	return {
		frontmatter: data as ProjectFrontmatter,
		content,
	};
}

/**
 * Devuelve todos los proyectos.
 * Orden: featured primero, luego por año descendente.
 */
export async function getAllProjects(locale: Locale): Promise<Project[]> {
	const files = await readdir(getProjectsDir(locale));
	const mdxFiles = files.filter((f) => f.endsWith(".mdx"));

	const projects = await Promise.all(
		mdxFiles.map(async (file) => {
			const slug = file.replace(/\.mdx$/, "");
			const project = await getProjectBySlug(locale, slug);
			return project;
		}),
	);

	// Filtrar nulls (getProjectBySlug retorna null si el archivo no existe)
	const valid = projects.filter((p): p is Project => p !== null);

	return valid.sort((a, b) => {
		// Featured primero
		if (a.frontmatter.featured !== b.frontmatter.featured) {
			return a.frontmatter.featured ? -1 : 1;
		}
		// Luego por año descendente
		return b.frontmatter.year - a.frontmatter.year;
	});
}

/**
 * Devuelve todos los slugs de proyectos.
 * Útil para `generateStaticParams`.
 */
export async function getAllProjectSlugs(locale: Locale): Promise<string[]> {
	const files = await readdir(getProjectsDir(locale));
	return files
		.filter((f) => f.endsWith(".mdx"))
		.map((f) => f.replace(/\.mdx$/, ""));
}
