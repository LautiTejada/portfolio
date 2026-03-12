import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

interface LocaleLayoutProps {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
	children,
	params,
}: LocaleLayoutProps) {
	const { locale } = await params;

	if (!locales.includes(locale as Locale)) {
		notFound();
	}

	const dict = await getDictionary(locale as Locale);

	return (
		<>
			<script
				dangerouslySetInnerHTML={{
					__html: `document.documentElement.lang="${locale}"`,
				}}
			/>
			<a
				href="#main-content"
				className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-background">
				Skip to content
			</a>
			<Header locale={locale as Locale} dict={dict} />
			<main id="main-content" className="flex-1">
				{children}
			</main>
			<Footer dict={dict} />
			<BackToTop />
		</>
	);
}
