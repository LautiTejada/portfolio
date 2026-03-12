"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Container from "./Container";
import ThemeToggle from "@/components/ui/ThemeToggle";
import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";

interface HeaderProps {
	locale: Locale;
	dict: Dictionary;
}

export default function Header({ locale, dict }: HeaderProps) {
	const pathname = usePathname();
	const router = useRouter();
	const [mobileOpen, setMobileOpen] = useState(false);

	const navLinks = [
		{
			href: `/${locale}`,
			label: dict.nav.home,
			isActive: pathname === `/${locale}`,
		},
		{
			href: `/${locale}/projects`,
			label: dict.nav.projects,
			isActive: pathname.startsWith(`/${locale}/projects`),
		},
		{
			href: `/${locale}/contact`,
			label: dict.nav.contact,
			isActive: pathname === `/${locale}/contact`,
		},
	];

	function switchLocalePath(target: Locale) {
		if (!pathname || pathname === "/") return `/${target}`;

		const segments = pathname.split("/");
		const hasLocale = locales.includes(segments[1] as Locale);

		if (hasLocale) {
			segments[1] = target;
			return segments.join("/") || `/${target}`;
		}

		return `/${target}${pathname}`;
	}

	return (
		<header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/80 backdrop-blur-md">
			<Container className="flex h-16 items-center justify-between">
				<Link
					href={`/${locale}`}
					className="text-lg font-semibold tracking-tight transition-colors hover:text-foreground/80">
					Lautaro Tejada
				</Link>

				{/* Desktop nav */}
				<div className="hidden items-center gap-4 md:flex">
					<nav aria-label="Main navigation" className="flex items-center gap-1">
						{navLinks.map(({ href, label, isActive }) => (
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
						))}
					</nav>

					<div className="flex items-center gap-0.5 rounded-md border border-foreground/10 p-0.5">
						{locales.map((loc) => (
							<button
								key={loc}
								type="button"
								onClick={() =>
									router.replace(switchLocalePath(loc), { scroll: false })
								}
								className={`rounded px-2 py-1 text-xs font-medium uppercase transition-colors ${
									locale === loc
										? "bg-foreground/10 text-foreground"
										: "text-foreground/40 hover:text-foreground/70"
								}`}>
								{loc}
							</button>
						))}
					</div>

					<ThemeToggle />
				</div>

				{/* Mobile controls */}
				<div className="flex items-center gap-2 md:hidden">
					<ThemeToggle />
					<button
						type="button"
						onClick={() => setMobileOpen(!mobileOpen)}
						aria-label={mobileOpen ? "Close menu" : "Open menu"}
						aria-expanded={mobileOpen}
						className="rounded-md p-2 text-foreground/60 transition-colors hover:bg-foreground/5 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/30">
						{mobileOpen ? (
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round">
								<line x1="18" y1="6" x2="6" y2="18" />
								<line x1="6" y1="6" x2="18" y2="18" />
							</svg>
						) : (
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round">
								<line x1="3" y1="6" x2="21" y2="6" />
								<line x1="3" y1="12" x2="21" y2="12" />
								<line x1="3" y1="18" x2="21" y2="18" />
							</svg>
						)}
					</button>
				</div>
			</Container>

			{/* Mobile menu */}
			{mobileOpen && (
				<div className="border-t border-foreground/10 bg-background md:hidden">
					<Container className="flex flex-col gap-1 py-4">
						<nav aria-label="Mobile navigation" className="flex flex-col gap-1">
							{navLinks.map(({ href, label, isActive }) => (
								<Link
									key={href}
									href={href}
									onClick={() => setMobileOpen(false)}
									className={`rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
										isActive
											? "bg-foreground/10 text-foreground"
											: "text-foreground/60 hover:bg-foreground/5 hover:text-foreground"
									}`}>
									{label}
								</Link>
							))}
						</nav>

						<div className="mt-3 flex items-center gap-2 border-t border-foreground/10 pt-3">
							<span className="text-xs text-foreground/40">Language:</span>
							<div className="flex items-center gap-0.5 rounded-md border border-foreground/10 p-0.5">
								{locales.map((loc) => (
									<button
										key={loc}
										type="button"
										onClick={() => {
											router.replace(switchLocalePath(loc), { scroll: false });
											setMobileOpen(false);
										}}
										className={`rounded px-2 py-1 text-xs font-medium uppercase transition-colors ${
											locale === loc
												? "bg-foreground/10 text-foreground"
												: "text-foreground/40 hover:text-foreground/70"
										}`}>
										{loc}
									</button>
								))}
							</div>
						</div>
					</Container>
				</div>
			)}
		</header>
	);
}
