import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React Strict Mode for development
  reactStrictMode: true,

  // Optimize images from these domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'masterdisplaycases.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Redirects for SEO and funnel consolidation
  async redirects() {
    return [
      {
        source: '/display-cases',
        destination: '/collections/rgb-displays',
        permanent: true,
      },
      {
        source: '/store-packages',
        destination: '/collections/store-packages',
        permanent: true,
      },
      // Funnel consolidation - ALL paths point to master funnel
      {
        source: '/rgb-display-cases',
        destination: '/collections/rgb-displays',
        permanent: true,
      },
      {
        source: '/collections/rgb-display-cases',
        destination: '/collections/rgb-displays',
        permanent: true,
      },
      {
        source: '/collections/display-cases',
        destination: '/collections/rgb-displays',
        permanent: true,
      },
      {
        source: '/collections/all',
        destination: '/collections/rgb-displays',
        permanent: true,
      },
    ];
  },

  // Environment variables - match .env.local naming
  // Use empty strings as fallback if not set (prevents build errors)
  env: {
    NEXT_PUBLIC_SHOPIFY_DOMAIN: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || '',
    NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || '',
  },
};

export default nextConfig;