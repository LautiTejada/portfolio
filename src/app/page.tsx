import Link from "next/link";
import Container from "@/components/layout/Container";

export default function Home() {
  return (
    <Container className="flex flex-col items-center justify-center py-32 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Hi, I&apos;m <span className="text-foreground/70">Your Name</span>
      </h1>

      <p className="mt-4 max-w-lg text-lg text-foreground/60">
        Developer passionate about building clean, performant web experiences.
        Take a look at my work or get in touch.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/projects"
          className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
        >
          View Projects
        </Link>
        <Link
          href="/contact"
          className="inline-flex h-12 items-center justify-center rounded-full border border-foreground/20 px-6 text-sm font-medium transition-colors hover:bg-foreground/5"
        >
          Contact Me
        </Link>
      </div>
    </Container>
  );
}
