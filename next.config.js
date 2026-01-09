/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  basePath: '/braz-emprestimos',
  assetPrefix: '/braz-emprestimos',
}

module.exports = nextConfig
