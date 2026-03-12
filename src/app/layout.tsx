import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeProvider from "@/components/ui/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		default: "Lautaro Tejada — Fullstack Developer",
		template: "%s | Lautaro Tejada",
	},
	description:
		"Fullstack developer specializing in Next.js, TypeScript, and Node. Building performant, maintainable web products.",
	metadataBase: new URL(
		process.env.NEXT_PUBLIC_SITE_URL ?? "https://lautarotejada.dev",
	),
	openGraph: {
		title: "Lautaro Tejada — Fullstack Developer",
		description:
			"Fullstack developer specializing in Next.js, TypeScript, and Node.",
		url: "https://lautarotejada.dev",
		siteName: "Lautaro Tejada — Portfolio",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Lautaro Tejada — Fullstack Developer",
		description:
			"Fullstack developer specializing in Next.js, TypeScript, and Node.",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: "Lautaro Tejada",
		jobTitle: "Fullstack Developer",
		url: "https://lautarotejada.dev",
		sameAs: [
			"https://github.com/lauti3314",
			"https://www.linkedin.com/in/lautaro-tejada-733b47264/",
		],
		knowsAbout: [
			"Next.js",
			"TypeScript",
			"React",
			"Node.js",
			"NestJS",
			"PostgreSQL",
			"Tailwind CSS",
		],
	};

	return (
		<html lang="es" suppressHydrationWarning>
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `(function(){try{var t=localStorage.getItem("theme");var d=t==="light"?"light":t==="dark"?"dark":window.matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light";document.documentElement.classList.add(d);document.documentElement.style.colorScheme=d}catch(e){}})()`,
					}}
				/>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen flex-col`}
				suppressHydrationWarning>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
				<ThemeProvider>{children}</ThemeProvider>
			</body>
		</html>
	);
}
