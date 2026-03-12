"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/components/layout/Container";
import { locales, defaultLocale, type Locale } from "@/i18n/config";
import es from "@/i18n/dictionaries/es.json";
import en from "@/i18n/dictionaries/en.json";

const dictionaries = { es, en } as const;

export default function NotFound() {
	const pathname = usePathname();
	const segment = pathname.split("/")[1];
	const locale: Locale = locales.includes(segment as Locale)
		? (segment as Locale)
		: defaultLocale;
	const t = dictionaries[locale].notFound;

	return (
		<Container className="flex flex-col items-center justify-center py-32 text-center">
			<p className="text-sm font-medium uppercase tracking-widest text-foreground/40">
				404
			</p>
			<h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
				{t.title}
			</h1>
			<p className="mt-3 max-w-md text-foreground/60">{t.description}</p>

			<div className="mt-8 flex flex-col gap-4 sm:flex-row">
				<Link
					href={`/${locale}`}
					className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-foreground/90">
					{t.goHome}
				</Link>
				<Link
					href={`/${locale}/projects`}
					className="inline-flex h-12 items-center justify-center rounded-full border border-foreground/20 px-6 text-sm font-medium transition-colors hover:bg-foreground/5">
					{t.viewProjects}
				</Link>
			</div>
		</Container>
	);
}
