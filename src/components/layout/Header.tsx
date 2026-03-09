"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight transition-colors hover:text-foreground/80"
        >
          Portfolio
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-foreground/10 text-foreground"
                    : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </Container>
    </header>
  );
}
