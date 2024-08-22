/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}`,
        port: '',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`,
      },
    ];
  },
  sassOptions: {
    includePaths: ['styles'],
    additionalData: `@import "@/styles/color.scss"; @import "@/styles/typography.scss";`,
  },
};

export default nextConfig;
