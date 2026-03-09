import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
	title: "Contact",
	description:
		"Get in touch — let's discuss your next project or collaboration.",
};

export default function ContactPage() {
	return (
		<Container className="py-16">
			<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Contact</h1>
			<p className="mt-2 max-w-lg text-foreground/60">
				Have a project in mind or just want to say hi? Reach out.
			</p>

			<ContactForm />
		</Container>
	);
}
