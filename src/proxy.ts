import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/i18n/config";

export default function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Check if the pathname already has a locale
	const pathnameHasLocale = locales.some(
		(locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
	);

	if (pathnameHasLocale) return NextResponse.next();

	// Skip static files, API routes, Next.js internals
	if (
		pathname.startsWith("/_next") ||
		pathname.startsWith("/api") ||
		pathname.startsWith("/favicon") ||
		pathname.includes(".") // static files like /og.png, /robots.txt
	) {
		return NextResponse.next();
	}

	// Redirect to default locale
	const url = request.nextUrl.clone();
	url.pathname = `/${defaultLocale}${pathname}`;
	return NextResponse.redirect(url);
}

export const config = {
	matcher: ["/((?!_next|api|favicon|.*\\..*).*)"],
};
