import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Firebase Hosting
  output: 'export',
  
  // Image optimization settings - use unoptimized for static export
  images: {
    unoptimized: true,
  },

  // Disable x-powered-by header
  poweredByHeader: false,
  
  // Trailing slashes for proper routing
  trailingSlash: true,
};

export default nextConfig;
