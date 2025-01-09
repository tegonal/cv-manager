import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['chromiumly'],
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/admin',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cvman-prod.jcloud.ik-server.com",
        port: "",
        pathname: "/api/media/file/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/api/media/file/**",
      },
    ],
  }
};

export default withPayload(nextConfig);
