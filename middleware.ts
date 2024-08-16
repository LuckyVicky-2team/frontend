import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 요청의 hostname 가져오기
  const hostname = request.nextUrl.hostname;

  // hostname이 'abc'가 아닌 경우 리다이렉트
  if (hostname !== 'localhost') {
    return new NextResponse('Access Denied', { status: 403 });
  }

  // hostname이 'abc'인 경우 요청을 계속 진행
  return NextResponse.next();
}

// 미들웨어가 적용될 경로 설정
export const config = {
  matcher: '/crawling/:path*', // 특정 경로에만 미들웨어 적용
};
