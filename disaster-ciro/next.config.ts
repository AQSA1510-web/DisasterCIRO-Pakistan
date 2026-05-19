import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async rewrites() {
    return [
      {
        source: '/backend/:path*',
        destination: 'https://disasterciro-backend-1080890664486.us-central1.run.app/:path*',
      },
    ];
  },
  experimental: {
    proxyTimeout: 120000,
  },
};

export default nextConfig;