/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: ${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}
      ? [
          {
            protocol: 'https',
            hostname: `${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}`,
            port: '',
          },
        ]
      : [],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
