import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const currentUrl = request.nextUrl;
  const hostname = request.nextUrl.hostname;

  // '/' 이동 시 '/main' 이동
  if (currentUrl.pathname === '/') {
    const redirectUrl = new URL('/main', request.url);
    const response = NextResponse.redirect(redirectUrl);

    return response;
  }

  // 개발 환경에서만 crawling 페이지 접근 허용
  if (currentUrl.pathname === '/crawling' && hostname !== 'localhost') {
    return new NextResponse('Access Denied', { status: 403 });
  }

  // main 입장 시 referer 쿠키 있으면 쿠키 값의 경로로 이동
  // if (currentUrl.pathname === '/main') {
  //   const referer = request.cookies.get('referer')?.value;

  //   if (referer) {
  //     const redirectUrl = new URL(referer, request.url);
  //     const response = NextResponse.redirect(redirectUrl);

  //     response.cookies.delete('referer');

  //     return response;
  //   }
  // }

  return NextResponse.next();
}
