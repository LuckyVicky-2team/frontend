import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = url.hostname;

  // 호스트명이 'localhost'인 경우에만 접근 허용
  if (hostname !== 'localhost') {
    return new NextResponse('Access Denied', { status: 403 });
  }

  return NextResponse.next();
}
