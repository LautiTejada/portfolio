import Container from "./Container";
import type { Dictionary } from "@/i18n/getDictionary";

const socialLinks = [
	{ href: "https://github.com/lauti3314", label: "GitHub" },
	{
		href: "https://www.linkedin.com/in/lautaro-tejada-733b47264/",
		label: "LinkedIn",
	},
] as const;

interface FooterProps {
	dict: Dictionary;
}

export default function Footer({ dict }: FooterProps) {
	const navLinks = [
		{ href: "#main-content", label: dict.nav.home },
		{ href: "#projects", label: dict.nav.projects },
		{ href: "#contact", label: dict.nav.contact },
	];

	return (
		<footer className="border-t border-foreground/10 py-12">
			<Container>
				<div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
					{/* Navigation */}
					<div>
						<h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground/70">
							{dict.footer.navigation}
						</h3>
						<ul className="space-y-2">
							{navLinks.map(({ href, label }) => (
								<li key={label}>
									<a
										href={href}
										className="text-sm text-foreground/50 transition-colors hover:text-foreground">
										{label}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Contact */}
					<div>
						<h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground/70">
							{dict.footer.contact}
						</h3>
						<a
							href="mailto:tejadalautaro616@gmail.com"
							className="text-sm text-foreground/50 transition-colors hover:text-foreground">
							tejadalautaro616@gmail.com
						</a>
						<nav className="mt-3 flex items-center gap-4">
							{socialLinks.map(({ href, label }) => (
								<a
									key={label}
									href={href}
									target="_blank"
									rel="noopener noreferrer"
									className="text-sm text-foreground/50 transition-colors hover:text-foreground">
									{label}
								</a>
							))}
						</nav>
					</div>
				</div>

				<div className="mt-10 border-t border-foreground/10 pt-6 text-center">
					<p className="text-xs text-foreground/40">
						&copy; {new Date().getFullYear()} Lautaro Tejada.{" "}
						{dict.footer.rights}
					</p>
				</div>
			</Container>
		</footer>
	);
}
