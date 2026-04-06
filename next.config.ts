import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    // ESLint flat config + legacy eslint-config-next incompatibility — lint separately via CI
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

export default nextConfig
