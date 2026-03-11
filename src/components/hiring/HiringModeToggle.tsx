"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n/getDictionary";

export type HiringMode = "recruiter" | "techlead";

const STORAGE_KEY = "hiringMode";

interface HiringModeToggleProps {
	onChange?: (mode: HiringMode) => void;
	dict: Dictionary;
}

export default function HiringModeToggle({
	onChange,
	dict,
}: HiringModeToggleProps) {
	const [mode, setMode] = useState<HiringMode>("recruiter");

	const options: { value: HiringMode; label: string }[] = [
		{ value: "recruiter", label: dict.hiring.recruiter },
		{ value: "techlead", label: dict.hiring.techLead },
	];

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
			aria-label={dict.hiring.ariaLabel}
			className="inline-flex rounded-lg border border-foreground/10 p-0.5">
			{options.map(({ value, label }) => (
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
