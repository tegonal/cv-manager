import { withPayload } from '@payloadcms/next/withPayload'
import CopyPlugin from 'copy-webpack-plugin'

/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['chromiumly'],
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
  webpack: (config) => {
    config.experiments = { ...config.experiments, asyncWebAssembly: true }
    // append the CopyPlugin to copy the file to your public dir
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: './node_modules/pagedjs/dist/paged.polyfill.min.js',
            to: './static/paged.polyfill.min.js',
          },
        ],
      }),
    )

    // Important: return the modified config
    return config
  },
}

export default withPayload(nextConfig)
