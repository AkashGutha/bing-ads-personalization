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
          {
            protocol: 'https',
            hostname: 'storage.googleapis.com',
            pathname: '/hackathon2023-4bfa8.appspot.com/**',
            port: '',
          }
        ],
      },
}

module.exports = nextConfig
