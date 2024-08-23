/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN
      ? [
          {
            protocol: 'https',
            hostname: process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN,
            port: '', // 포트가 필요한 경우 추가
          },
        ]
      : [], // 환경 변수가 없으면 빈 배열로 설정
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
