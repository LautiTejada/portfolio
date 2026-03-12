"use client";

import { useEffect } from "react";
import Container from "@/components/layout/Container";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<Container className="flex flex-col items-center justify-center py-32 text-center">
			<p className="text-sm font-medium uppercase tracking-widest text-foreground/40">
				Error
			</p>
			<h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
				Algo salió mal
			</h1>
			<p className="mt-3 max-w-md text-foreground/60">
				Ocurrió un error inesperado. Podés intentar de nuevo o volver al inicio.
			</p>
			<div className="mt-8 flex flex-col gap-4 sm:flex-row">
				<button
					onClick={reset}
					className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-foreground/90">
					Intentar de nuevo
				</button>
				<a
					href="/"
					className="inline-flex h-12 items-center justify-center rounded-full border border-foreground/20 px-6 text-sm font-medium transition-colors hover:bg-foreground/5">
					Ir al inicio
				</a>
			</div>
		</Container>
	);
}
