/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
<<<<<<< HEAD
        hostname:
          `${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}` ||
          'd248qe8akqy587.cloudfront.net',
        pathname: '**',
=======
        hostname: 'd248qe8akqy587.cloudfront.net',
>>>>>>> d2be1fc22a087e7be666d9afb03d35085d3ca799
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
