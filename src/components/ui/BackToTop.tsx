"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const onScroll = () => setVisible(window.scrollY > 400);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<button
			type="button"
			aria-label="Back to top"
			onClick={() => window.scrollTo({ top: 0 })}
			className={`fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-all hover:scale-110 ${
				visible
					? "translate-y-0 opacity-100"
					: "pointer-events-none translate-y-4 opacity-0"
			}`}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round">
				<path d="M18 15l-6-6-6 6" />
			</svg>
		</button>
	);
}
