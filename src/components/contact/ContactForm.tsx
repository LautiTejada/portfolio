"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/getDictionary";

interface ContactFormProps {
	dict: Dictionary;
}

export default function ContactForm({ dict }: ContactFormProps) {
	const [copied, setCopied] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const email = "tu@email.com";

	function handleCopyEmail() {
		navigator.clipboard.writeText(email).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const form = e.currentTarget;
		const name = (form.elements.namedItem("name") as HTMLInputElement).value;
		const senderEmail = (form.elements.namedItem("email") as HTMLInputElement)
			.value;
		const message = (form.elements.namedItem("message") as HTMLTextAreaElement)
			.value;

		const subject = encodeURIComponent(`Contact from ${name}`);
		const body = encodeURIComponent(
			`From: ${name} (${senderEmail})\n\n${message}`,
		);
		window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;

		setSubmitted(true);
		setTimeout(() => setSubmitted(false), 3000);
	}

	return (
		<div className="mt-10 grid gap-10 sm:grid-cols-2">
			{/* Info column */}
			<div className="space-y-6">
				{/* Email */}
				<div>
					<h2 className="text-sm font-medium uppercase tracking-wider text-foreground/40">
						{dict.contact.emailLabel}
					</h2>
					<div className="mt-2 flex items-center gap-2">
						<span className="text-foreground/70">{email}</span>
						<button
							type="button"
							onClick={handleCopyEmail}
							className="rounded-md border border-foreground/10 px-2.5 py-1 text-xs font-medium text-foreground/60 transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/30">
							{copied ? dict.contact.copied : dict.contact.copy}
						</button>
					</div>
				</div>

				{/* Links */}
				<div>
					<h2 className="text-sm font-medium uppercase tracking-wider text-foreground/40">
						{dict.contact.linksLabel}
					</h2>
					<div className="mt-2 flex flex-col gap-2">
						<a
							href="https://github.com/your-username"
							target="_blank"
							rel="noopener noreferrer"
							className="text-foreground/70 underline underline-offset-4 transition-colors hover:text-foreground">
							GitHub ↗
						</a>
						<a
							href="https://linkedin.com/in/your-username"
							target="_blank"
							rel="noopener noreferrer"
							className="text-foreground/70 underline underline-offset-4 transition-colors hover:text-foreground">
							LinkedIn ↗
						</a>
					</div>
				</div>
			</div>

			{/* Form column */}
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label
						htmlFor="name"
						className="block text-sm font-medium text-foreground/60">
						{dict.contact.nameLabel}
					</label>
					<input
						id="name"
						name="name"
						type="text"
						required
						className="mt-1 w-full rounded-md border border-foreground/10 bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-foreground/30 focus:border-foreground/30 focus:outline-none focus:ring-1 focus:ring-foreground/30"
						placeholder={dict.contact.namePlaceholder}
					/>
				</div>

				<div>
					<label
						htmlFor="email"
						className="block text-sm font-medium text-foreground/60">
						{dict.contact.emailFieldLabel}
					</label>
					<input
						id="email"
						name="email"
						type="email"
						required
						className="mt-1 w-full rounded-md border border-foreground/10 bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-foreground/30 focus:border-foreground/30 focus:outline-none focus:ring-1 focus:ring-foreground/30"
						placeholder={dict.contact.emailPlaceholder}
					/>
				</div>

				<div>
					<label
						htmlFor="message"
						className="block text-sm font-medium text-foreground/60">
						{dict.contact.messageLabel}
					</label>
					<textarea
						id="message"
						name="message"
						required
						rows={4}
						className="mt-1 w-full resize-none rounded-md border border-foreground/10 bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-foreground/30 focus:border-foreground/30 focus:outline-none focus:ring-1 focus:ring-foreground/30"
						placeholder={dict.contact.messagePlaceholder}
					/>
				</div>

				<button
					type="submit"
					className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-foreground/30 focus:ring-offset-2 focus:ring-offset-background">
					{submitted ? dict.contact.sending : dict.contact.send}
				</button>
			</form>
		</div>
	);
}
