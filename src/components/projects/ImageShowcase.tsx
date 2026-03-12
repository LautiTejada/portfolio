"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageShowcaseProps {
	images: string[];
	title: string;
	urlHint?: string;
}

export default function ImageShowcase({
	images,
	title,
	urlHint,
}: ImageShowcaseProps) {
	const [activeIndex, setActiveIndex] = useState(0);
	const secondaryIndex = activeIndex === 0 ? 1 : 0;

	const swap = () => {
		if (images.length < 2) return;
		setActiveIndex((prev) => (prev === 0 ? 1 : 0));
	};

	return (
		<div className="relative mt-10">
			{/* Main screenshot in browser mockup */}
			<div className="overflow-hidden rounded-xl border border-foreground/[0.08] bg-foreground/[0.03] shadow-xl shadow-foreground/[0.04]">
				{/* Browser chrome */}
				<div className="flex items-center gap-1.5 border-b border-foreground/[0.06] bg-foreground/[0.03] px-4 py-2.5">
					<span className="size-2.5 rounded-full bg-foreground/10" />
					<span className="size-2.5 rounded-full bg-foreground/10" />
					<span className="size-2.5 rounded-full bg-foreground/10" />
					<span className="ml-3 flex-1 rounded-md bg-foreground/[0.04] px-3 py-1 text-[10px] text-foreground/25">
						{urlHint ?? title.toLowerCase().replace(/\s+/g, "-") + ".app"}
					</span>
				</div>
				{/* Screenshot with crossfade */}
				<div className="relative aspect-[16/10]">
					{images.map((src, i) => (
						<Image
							key={src}
							src={src}
							alt={`${title} — screenshot ${i + 1}`}
							fill
							className={`object-cover object-top transition-opacity duration-500 ${
								i === activeIndex ? "opacity-100" : "opacity-0"
							}`}
							sizes="(max-width: 768px) 100vw, 900px"
							priority={i === 0}
						/>
					))}
				</div>
			</div>

			{/* Secondary screenshot — floating card (clickable to swap) */}
			{images.length > 1 && (
				<button
					type="button"
					onClick={swap}
					aria-label="Cambiar imagen"
					className="absolute -right-2 -bottom-6 w-[40%] cursor-pointer transition-transform duration-500 hover:scale-105 sm:-right-4 sm:-bottom-8 sm:w-[35%]">
					<div className="overflow-hidden rounded-lg border border-foreground/[0.1] bg-background shadow-2xl shadow-foreground/[0.08]">
						<div className="relative aspect-[16/10]">
							{images.map((src, i) => (
								<Image
									key={src}
									src={src}
									alt={`${title} — screenshot ${i + 1}`}
									fill
									className={`object-cover object-top transition-opacity duration-500 ${
										i === secondaryIndex ? "opacity-100" : "opacity-0"
									}`}
									sizes="(max-width: 768px) 40vw, 320px"
								/>
							))}
						</div>
					</div>
					{/* Swap icon hint */}
					<span className="absolute -top-2 -left-2 flex size-6 items-center justify-center rounded-full border border-foreground/10 bg-background text-foreground/40 shadow-md transition-colors hover:text-foreground/70">
						<svg
							width="12"
							height="12"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round">
							<path d="M7 16V4m0 0L3 8m4-4 4 4" />
							<path d="M17 8v12m0 0 4-4m-4 4-4-4" />
						</svg>
					</span>
				</button>
			)}
		</div>
	);
}
