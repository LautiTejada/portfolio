import type { Dictionary } from "@/i18n/getDictionary";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

interface HowIWorkProps {
	dict: Dictionary;
}

export default function HowIWork({ dict }: HowIWorkProps) {
	return (
		<section>
			<AnimateOnScroll>
				<h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
					{dict.howIWork.title}
				</h2>
			</AnimateOnScroll>
			<div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{dict.howIWork.steps.map((step, index) => (
					<AnimateOnScroll key={step.number} delay={index * 0.1}>
						<div className="space-y-2">
							<span className="text-sm font-semibold text-foreground/30">
								{step.number}
							</span>
							<h3 className="text-lg font-semibold tracking-tight">
								{step.title}
							</h3>
							<p className="text-sm leading-relaxed text-foreground/60">
								{step.description}
							</p>
						</div>
					</AnimateOnScroll>
				))}
			</div>
		</section>
	);
}
