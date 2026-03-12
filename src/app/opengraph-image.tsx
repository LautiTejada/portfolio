import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Lautaro Tejada — Fullstack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "flex-start",
				padding: "80px",
				backgroundColor: "#0a0a0a",
				color: "#ededed",
				fontFamily: "system-ui, sans-serif",
			}}>
			<div
				style={{
					fontSize: 20,
					fontWeight: 500,
					letterSpacing: "0.15em",
					textTransform: "uppercase" as const,
					color: "#888",
					marginBottom: 16,
				}}>
				Portfolio
			</div>
			<div
				style={{
					fontSize: 64,
					fontWeight: 700,
					lineHeight: 1.1,
					letterSpacing: "-0.02em",
					marginBottom: 16,
				}}>
				Lautaro Tejada
			</div>
			<div
				style={{
					fontSize: 36,
					fontWeight: 400,
					color: "#888",
					marginBottom: 40,
				}}>
				Fullstack Developer — Next.js / TypeScript / Node
			</div>
			<div
				style={{
					display: "flex",
					gap: 12,
				}}>
				{["Next.js", "TypeScript", "React", "NestJS", "PostgreSQL"].map(
					(tech) => (
						<div
							key={tech}
							style={{
								fontSize: 16,
								padding: "8px 16px",
								borderRadius: 20,
								backgroundColor: "#1a1a1a",
								border: "1px solid #333",
								color: "#aaa",
							}}>
							{tech}
						</div>
					),
				)}
			</div>
		</div>,
		{ ...size },
	);
}
