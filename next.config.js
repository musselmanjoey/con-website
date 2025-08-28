/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/con-website',
  assetPrefix: '/con-website',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig