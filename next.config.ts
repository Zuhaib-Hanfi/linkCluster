import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors on build
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors on build
  },
};

export default nextConfig;
