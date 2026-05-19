import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async rewrites() {
    return [
      {
        source: '/backend/:path*',
        destination: 'http://127.0.0.1:8000/:path*',
      },
    ];
  },
  experimental: {
    proxyTimeout: 120000,
  },
};

export default nextConfig;