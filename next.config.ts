import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  reactCompiler: true,
};

const withMDX = createMDX();

export default withMDX(nextConfig);
