"use client";

import { useActionState, useState, useRef, useEffect } from "react";
import { sendContactEmail } from "@/app/actions/contact";
import type { Dictionary } from "@/i18n/getDictionary";

interface ContactFormProps {
	dict: Dictionary;
}

export default function ContactForm({ dict }: ContactFormProps) {
	const [copied, setCopied] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);
	const email = "tejadalautaro616@gmail.com";

	const [state, formAction, isPending] = useActionState(sendContactEmail, {
		success: false,
	});

	useEffect(() => {
		if (state.success) {
			formRef.current?.reset();
		}
	}, [state]);

	function handleCopyEmail() {
		navigator.clipboard.writeText(email).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
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
							href="https://github.com/lauti3314"
							target="_blank"
							rel="noopener noreferrer"
							className="text-foreground/70 underline underline-offset-4 transition-colors hover:text-foreground">
							GitHub ↗
						</a>
						<a
							href="https://www.linkedin.com/in/lautaro-tejada-733b47264/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-foreground/70 underline underline-offset-4 transition-colors hover:text-foreground">
							LinkedIn ↗
						</a>
						<a
							href="/cv.pdf"
							download
							className="text-foreground/70 underline underline-offset-4 transition-colors hover:text-foreground">
							{dict.contact.downloadCV} ↓
						</a>
					</div>
				</div>
			</div>

			{/* Form column */}
			<form ref={formRef} action={formAction} className="space-y-4">
				{state.success && (
					<div className="rounded-md bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-400">
						{dict.contact.successMessage}
					</div>
				)}
				{state.error && (
					<div className="rounded-md bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-400">
						{state.error}
					</div>
				)}
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
					disabled={isPending}
					className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-foreground/30 focus:ring-offset-2 focus:ring-offset-background">
					{isPending ? dict.contact.sending : dict.contact.send}
				</button>
			</form>
		</div>
	);
}
