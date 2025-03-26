/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
  // Fix asset path issues
  assetPrefix: '.', // This makes asset paths relative instead of absolute
  // Ignore ESLint errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ignore TypeScript errors during build (if needed)
  typescript: {
    ignoreBuildErrors: true,
  },
  // Add env variables if needed
  env: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '6j5zhc3g',
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  }
}

module.exports = nextConfig