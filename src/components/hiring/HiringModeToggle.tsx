"use client";

import { useEffect, useState } from "react";

export type HiringMode = "recruiter" | "techlead";

const STORAGE_KEY = "hiringMode";

const OPTIONS: { value: HiringMode; label: string }[] = [
	{ value: "recruiter", label: "Recruiter" },
	{ value: "techlead", label: "Tech Lead" },
];

interface HiringModeToggleProps {
	onChange?: (mode: HiringMode) => void;
}

export default function HiringModeToggle({ onChange }: HiringModeToggleProps) {
	const [mode, setMode] = useState<HiringMode>("recruiter");

	useEffect(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored === "recruiter" || stored === "techlead") {
			setMode(stored);
		}
	}, []);

	function handleChange(next: HiringMode) {
		setMode(next);
		localStorage.setItem(STORAGE_KEY, next);
		onChange?.(next);
	}

	return (
		<div
			role="radiogroup"
			aria-label="Hiring mode view"
			className="inline-flex rounded-lg border border-foreground/10 p-0.5">
			{OPTIONS.map(({ value, label }) => (
				<button
					key={value}
					role="radio"
					aria-checked={mode === value}
					onClick={() => handleChange(value)}
					className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-foreground/30 ${
						mode === value
							? "bg-foreground text-background"
							: "text-foreground/60 hover:text-foreground"
					}`}>
					{label}
				</button>
			))}
		</div>
	);
}
