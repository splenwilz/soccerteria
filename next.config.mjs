/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.github.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '**.github.com',
        port: '',
        pathname: '**',
      },
      {
        hostname: 'utfs.io',
      },
    ],
  },
}

export default nextConfig
