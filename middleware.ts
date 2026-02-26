import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

import { handleI18n } from '@/lib/i18n/middleware';

export default async function middleware(req: Request) {
  const request = req as import('next/server').NextRequest;
  const pathname = request.nextUrl.pathname;

  const isRoomPath =
    pathname === '/room' ||
    pathname.startsWith('/room/') ||
    pathname === '/en/room' ||
    pathname.startsWith('/en/room/');

  if (isRoomPath) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (!token) {
      const isEn = pathname.startsWith('/en/');
      const otpPath = isEn ? '/en/otp' : '/otp';
      return NextResponse.redirect(new URL(otpPath, request.url));
    }
  }

  const i18nResponse = handleI18n(request);
  if (i18nResponse) return i18nResponse;

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4)$).*)',
  ],
};
