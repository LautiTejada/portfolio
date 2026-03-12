"use client";

import { useInView } from "@/hooks/useInView";

interface AnimateOnScrollProps {
	children: React.ReactNode;
	className?: string;
	delay?: number;
}

export default function AnimateOnScroll({
	children,
	className = "",
	delay = 0,
}: AnimateOnScrollProps) {
	const { ref, inView } = useInView();

	return (
		<div
			ref={ref}
			className={className}
			style={{
				opacity: inView ? 1 : 0,
				transform: inView ? "translateY(0)" : "translateY(20px)",
				transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
			}}>
			{children}
		</div>
	);
}
