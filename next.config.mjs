/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Flow Deployment Configuration
  output: 'export',
  trailingSlash: false,
  distDir: 'dist', // GitHub Pages compatible

  // Image Optimization for Static Export
  images: {
    unoptimized: true, // Required for static export
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 768, 1024, 1280, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mc.yandex.ru',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fonts.googleapis.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fonts.gstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'walterokumu.github.io',
        port: '',
        pathname: '/**',
      }
    ],
  },

  // Performance Optimizations
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['@headlessui/react', 'lucide-react', 'framer-motion'],
  },

  // Transpile specific packages for better compatibility
  transpilePackages: ['@headlessui/react'],

  // Compiler options for better performance
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
