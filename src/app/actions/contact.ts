"use server";

import { Resend } from "resend";

interface ContactState {
	success: boolean;
	error?: string;
}

export async function sendContactEmail(
	_prev: ContactState,
	formData: FormData,
): Promise<ContactState> {
	const name = formData.get("name");
	const email = formData.get("email");
	const message = formData.get("message");

	if (
		typeof name !== "string" ||
		typeof email !== "string" ||
		typeof message !== "string" ||
		!name.trim() ||
		!email.trim() ||
		!message.trim()
	) {
		return { success: false, error: "All fields are required." };
	}

	// Basic email format check
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		return { success: false, error: "Invalid email address." };
	}

	const apiKey = process.env.RESEND_API_KEY;
	if (!apiKey) {
		// Fallback: log the message if API key is not configured
		console.log("[Contact Form]", { name, email, message });
		return { success: true };
	}

	const resend = new Resend(apiKey);

	const { error } = await resend.emails.send({
		from: `Portfolio Contact <onboarding@resend.dev>`,
		to: "tejadalautaro616@gmail.com",
		replyTo: email,
		subject: `Contact from ${name}`,
		text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
	});

	if (error) {
		return { success: false, error: "Failed to send message. Try again." };
	}

	return { success: true };
}
