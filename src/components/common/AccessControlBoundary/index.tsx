'use client';

import { ReactNode, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function AccessControlBoundary({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const path = usePathname();

  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const hasToken = !!localStorage.getItem('accessToken');

    // 회원인 경우 접근 제어
    if (hasToken) {
      const forbiddenPath = new Set(['/signin', '/signup']);

      if (forbiddenPath.has(path)) {
        router.push('/main');
        return;
      }
    }

    // 비회원인 경우 접근 제어
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

      if (forbiddenPath.has(path)) {
        router.push('/signin');
        return;
      }

      // '/threads' 하위 경로에 대해서도 접근 제어
      if (path.startsWith('/threads')) {
        router.push('/signin');
        return;
      }

      // '/gatherings/new' 하위 경로에 대해서도 접근 제어
      if (path.startsWith('/gatherings/new')) {
        router.push('/signin');
        return;
      }
    }

    setIsChecking(false);
  }, [path, router]);

  return isChecking ? null : <>{children}</>;
}
