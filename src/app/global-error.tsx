"use client";

import Container from "@/components/layout/Container";

export default function GlobalError({
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<html lang="es">
			<body className="flex min-h-screen flex-col bg-[#0a0a0a] text-[#ededed] antialiased">
				<Container className="flex flex-1 flex-col items-center justify-center py-32 text-center">
					<p className="text-sm font-medium uppercase tracking-widest text-white/40">
						Error
					</p>
					<h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
						Algo salió mal
					</h1>
					<p className="mt-3 max-w-md text-white/60">
						Ocurrió un error inesperado.
					</p>
					<button
						onClick={reset}
						className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-black transition-colors hover:bg-white/90">
						Intentar de nuevo
					</button>
				</Container>
			</body>
		</html>
	);
}
