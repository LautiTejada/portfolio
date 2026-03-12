interface MDXWrapperProps {
	children: React.ReactNode;
}

export default function MDXWrapper({ children }: MDXWrapperProps) {
	return (
		<div
			className={[
				"mdx-content max-w-none",
				// Headings
				"[&>h2]:mt-12 [&>h2]:mb-4 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:tracking-tight",
				"[&>h3]:mt-8 [&>h3]:mb-3 [&>h3]:text-base [&>h3]:font-semibold",
				// Paragraphs
				"[&>p]:mb-4 [&>p]:leading-relaxed [&>p]:text-foreground/65",
				// Lists
				"[&>ul]:mb-5 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:text-foreground/65",
				"[&>ol]:mb-5 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:text-foreground/65",
				"[&_li]:mb-1.5 [&_li]:leading-relaxed",
				// Links
				"[&_a]:underline [&_a]:underline-offset-4 [&_a]:text-foreground/60 hover:[&_a]:text-foreground",
				// Inline
				"[&_strong]:font-semibold [&_strong]:text-foreground",
				"[&_code]:rounded [&_code]:bg-foreground/[0.06] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[13px]",
				// Dividers
				"[&>hr]:my-10 [&>hr]:border-foreground/[0.06]",
				// Blockquotes
				"[&>blockquote]:my-6 [&>blockquote]:border-l-2 [&>blockquote]:border-foreground/15 [&>blockquote]:pl-4 [&>blockquote]:text-sm [&>blockquote]:text-foreground/50 [&>blockquote]:italic",
				"[&>blockquote_p]:mb-0",
				// Tables
				"[&_table]:my-6 [&_table]:w-full [&_table]:text-sm",
				"[&_th]:border-b [&_th]:border-foreground/10 [&_th]:pb-2 [&_th]:text-left [&_th]:font-semibold [&_th]:text-foreground/70",
				"[&_td]:border-b [&_td]:border-foreground/[0.05] [&_td]:py-2 [&_td]:text-foreground/55",
				// Code blocks
				"[&>pre]:my-6 [&>pre]:overflow-x-auto [&>pre]:rounded-lg [&>pre]:bg-foreground/[0.04] [&>pre]:p-4 [&>pre]:text-sm [&>pre]:leading-relaxed",
			].join(" ")}>
			{children}
		</div>
	);
}
