"use server";

import { Resend } from "resend";
import { headers } from "next/headers";

interface ContactState {
	success: boolean;
	error?: string;
}

// Simple in-memory rate limiter: max 3 submissions per IP per 15 minutes
const rateMap = new Map<string, number[]>();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 15 * 60 * 1000;

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;

export async function sendContactEmail(
	_prev: ContactState,
	formData: FormData,
): Promise<ContactState> {
	// Rate limiting
	const headerStore = await headers();
	const ip = headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
	const now = Date.now();
	const timestamps = rateMap.get(ip)?.filter((t) => now - t < RATE_WINDOW_MS) ?? [];
	if (timestamps.length >= RATE_LIMIT) {
		return { success: false, error: "Too many messages. Please try again later." };
	}

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

	// Length limits
	if (name.length > MAX_NAME_LENGTH || email.length > MAX_EMAIL_LENGTH || message.length > MAX_MESSAGE_LENGTH) {
		return { success: false, error: "Input too long." };
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

	// Record this submission for rate limiting
	timestamps.push(now);
	rateMap.set(ip, timestamps);

	const resend = new Resend(apiKey);

	function escapeHtml(str: string) {
		return str
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;");
	}

	const safeName = escapeHtml(name);
	const safeEmail = escapeHtml(email);
	const safeMessage = escapeHtml(message);

	const html = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:system-ui,-apple-system,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background-color:#171717;padding:24px 32px;">
              <h1 style="margin:0;font-size:18px;font-weight:600;color:#ffffff;letter-spacing:-0.01em;">Nuevo mensaje desde tu Portfolio</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <!-- Sender info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td style="padding-bottom:12px;">
                    <span style="display:block;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#a1a1aa;margin-bottom:4px;">Nombre</span>
                    <span style="font-size:15px;color:#18181b;font-weight:500;">${safeName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:12px;">
                    <span style="display:block;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#a1a1aa;margin-bottom:4px;">Email</span>
                    <a href="mailto:${safeEmail}" style="font-size:15px;color:#2563eb;text-decoration:none;font-weight:500;">${safeEmail}</a>
                  </td>
                </tr>
              </table>
              <!-- Divider -->
              <hr style="border:none;border-top:1px solid #e4e4e7;margin:0 0 24px 0;">
              <!-- Message -->
              <span style="display:block;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#a1a1aa;margin-bottom:8px;">Mensaje</span>
              <div style="font-size:15px;line-height:1.7;color:#3f3f46;white-space:pre-wrap;">${safeMessage}</div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:16px 32px;background-color:#fafafa;border-top:1px solid #e4e4e7;">
              <p style="margin:0;font-size:12px;color:#a1a1aa;text-align:center;">
                Enviado desde el formulario de contacto · lautarotejada.dev
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

	const { error } = await resend.emails.send({
		from: `Portfolio Contact <onboarding@resend.dev>`,
		to: "tejadalautaro616@gmail.com",
		replyTo: email,
		subject: `Nuevo mensaje de ${safeName} · Portfolio`,
		html,
		text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
	});

	if (error) {
		return { success: false, error: "Failed to send message. Try again." };
	}

	return { success: true };
}
