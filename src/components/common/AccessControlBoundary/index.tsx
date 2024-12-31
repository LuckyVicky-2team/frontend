'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function AccessControlBoundary() {
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const hasToken = !!localStorage.getItem('accessToken');

    if (hasToken) {
      const forbiddenPath = new Set(['/signin', '/signup']);

      if (forbiddenPath.has(path)) {
        router.replace('/main');
      }
    }

    if (!hasToken) {
      const forbiddenPath = new Set([
        '/mypage/prEdit',
        '/mypage/friendsList',
        '/mypage/myGatherings/participant',
        '/mypage/myFavoriteGatherings',
        '/mypage/settingAlarm',
        '/mypage/review',
        '/mypage/review/receivedReviews',
        '/mypage/review/myReviews',
      ]);

      if (
        forbiddenPath.has(path) ||
        path.startsWith('/threads') ||
        path.startsWith('/gatherings/new')
      ) {
        router.replace('/signin');
      }
    }
  }, [path, router]);

  return null;
}
