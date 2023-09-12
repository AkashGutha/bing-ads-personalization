/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'th.bing.com',
            port: '',
            pathname: '/th/id/**',
          },
        ],
      },
}

module.exports = nextConfig
