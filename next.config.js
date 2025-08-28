/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  // Only add basePath for production builds (GitHub Pages)
  ...(process.env.NODE_ENV === 'production' && {
    basePath: '/con-website',
    assetPrefix: '/con-website',
  }),
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig