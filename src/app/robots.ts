import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/signin', '/signup', '/mypage/', '/test/'],
    },
    sitemap: 'https://dev.app.board-go.net/sitemap.xml',
  };
}
