import Container from "./Container";

const socialLinks = [
  { href: "https://github.com", label: "GitHub" },
  { href: "https://linkedin.com", label: "LinkedIn" },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-foreground/10 py-8">
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-foreground/50">
          &copy; {new Date().getFullYear()} Portfolio. All rights reserved.
        </p>

        <nav className="flex items-center gap-4">
          {socialLinks.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground/50 transition-colors hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
