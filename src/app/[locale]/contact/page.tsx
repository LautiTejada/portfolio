import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import ContactForm from "@/components/contact/ContactForm";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

interface PageProps {
	params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
	title: "Contact",
	description:
		"Get in touch — let's discuss your next project or collaboration.",
};

export default async function ContactPage({ params }: PageProps) {
	const { locale: loc } = await params;
	const locale = loc as Locale;
	const dict = await getDictionary(locale);

	return (
		<Container className="py-16">
			<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
				{dict.contact.title}
			</h1>
			<p className="mt-2 max-w-lg text-foreground/60">
				{dict.contact.description}
			</p>

			<ContactForm dict={dict} />
		</Container>
	);
}
