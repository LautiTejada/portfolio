import type { MetadataRoute } from "next";
import { getAllProjectSlugs } from "@/lib/content/projects";
import { locales } from "@/i18n/config";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const entries: MetadataRoute.Sitemap = [];

	for (const locale of locales) {
		entries.push(
			{ url: `${BASE_URL}/${locale}`, lastModified: new Date() },
			{ url: `${BASE_URL}/${locale}/projects`, lastModified: new Date() },
			{ url: `${BASE_URL}/${locale}/contact`, lastModified: new Date() },
		);

		const slugs = await getAllProjectSlugs(locale);
		for (const slug of slugs) {
			entries.push({
				url: `${BASE_URL}/${locale}/projects/${slug}`,
				lastModified: new Date(),
			});
		}
	}

	return entries;
}
