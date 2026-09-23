import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/admin',
        permanent: true,
      },
    ]
  },
  images: {
    // Next 16 requires local images with query strings (e.g. ?prefix=) to be allowlisted
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cvman-prod.jcloud.ik-server.com',
        port: '',
        pathname: '/api/media/file/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/media/file/**',
      },
    ],
  },
}

export default withPayload(nextConfig)
