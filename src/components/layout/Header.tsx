"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";
import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";

interface HeaderProps {
	locale: Locale;
	dict: Dictionary;
}

export default function Header({ locale, dict }: HeaderProps) {
	const pathname = usePathname();

	const navLinks = [
		{ href: `/${locale}`, label: dict.nav.home },
		{ href: `/${locale}/projects`, label: dict.nav.projects },
		{ href: `/${locale}/contact`, label: dict.nav.contact },
	];

	function switchLocalePath(target: Locale) {
		// Replace current locale segment in the pathname
		const segments = pathname.split("/");
		segments[1] = target;
		return segments.join("/") || `/${target}`;
	}

	return (
		<header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/80 backdrop-blur-md">
			<Container className="flex h-16 items-center justify-between">
				<Link
					href={`/${locale}`}
					className="text-lg font-semibold tracking-tight transition-colors hover:text-foreground/80">
					Portfolio
				</Link>

				<div className="flex items-center gap-4">
					<nav className="flex items-center gap-1 sm:gap-2">
						{navLinks.map(({ href, label }) => {
							const isActive = pathname === href;
							return (
								<Link
									key={href}
									href={href}
									className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
										isActive
											? "bg-foreground/10 text-foreground"
											: "text-foreground/60 hover:bg-foreground/5 hover:text-foreground"
									}`}>
									{label}
								</Link>
							);
						})}
					</nav>

					{/* Locale switch */}
					<div className="flex items-center gap-0.5 rounded-md border border-foreground/10 p-0.5">
						{locales.map((loc) => (
							<Link
								key={loc}
								href={switchLocalePath(loc)}
								className={`rounded px-2 py-1 text-xs font-medium uppercase transition-colors ${
									locale === loc
										? "bg-foreground/10 text-foreground"
										: "text-foreground/40 hover:text-foreground/70"
								}`}>
								{loc}
							</Link>
						))}
					</div>
				</div>
			</Container>
		</header>
	);
}
