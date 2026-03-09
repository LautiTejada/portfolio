import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Podés customizar elementos HTML que MDX renderiza.
    // Ejemplo: h1: ({ children }) => <h1 className="text-3xl font-bold">{children}</h1>,
    ...components,
  };
}
