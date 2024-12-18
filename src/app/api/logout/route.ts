import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: '쿠키가 삭제되었습니다.',
  });

  response.cookies.set('Authorization', '', {
    maxAge: -1,
    path: '/',
    secure: true,
    httpOnly: true,
  });

  response.cookies.set('Authorization', '', {
    domain: '.board-go.net',
    maxAge: -1,
    path: '/',
    secure: true,
    httpOnly: true,
  });

  return response;
}
