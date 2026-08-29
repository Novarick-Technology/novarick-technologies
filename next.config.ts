import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
  experimental: {
    // Default 1MB is well under ADMIN.md's 8MB upload cap.
    serverActions: { bodySizeLimit: "9mb" },
  },
};

export default nextConfig;
