interface MDXWrapperProps {
	children: React.ReactNode;
}

export default function MDXWrapper({ children }: MDXWrapperProps) {
	return (
		<div className="mdx-content max-w-none [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:tracking-tight [&>h3]:mt-8 [&>h3]:mb-3 [&>h3]:text-lg [&>h3]:font-semibold [&>p]:mb-4 [&>p]:leading-relaxed [&>p]:text-foreground/70 [&>ul]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:text-foreground/70 [&>ol]:mb-4 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:text-foreground/70 [&_li]:mb-1 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-foreground/60 [&_strong]:font-semibold [&_strong]:text-foreground [&_code]:rounded [&_code]:bg-foreground/5 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&>hr]:my-8 [&>hr]:border-foreground/10">
			{children}
		</div>
	);
}
