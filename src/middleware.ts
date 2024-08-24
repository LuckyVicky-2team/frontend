import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const currentUrl = request.nextUrl;
  const hostname = request.nextUrl.hostname;

  if (currentUrl.pathname === '/crawling' && hostname !== 'localhost') {
    return new NextResponse('Access Denied', { status: 403 });
  }

  if (currentUrl.pathname === '/main') {
    const referer = request.cookies.get('referer')?.value;

    if (referer) {
      const redirectUrl = new URL(referer, request.url);
      const response = NextResponse.redirect(redirectUrl);

      response.cookies.delete('referer');

      return response;
    }
  }

  return NextResponse.next();
}
