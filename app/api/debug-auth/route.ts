import { NextResponse } from 'next/server';

/**
 * Safe auth debug endpoint for production (e.g. Netlify) when you have no server logs.
 * GET /api/debug-auth — returns only non-sensitive hints to debug session/cookie issues.
 * Remove or restrict this route once debugging is done.
 */
export async function GET(request: Request) {
  const cookieHeader = request.headers.get('cookie') ?? '';
  const hasSessionCookie =
    cookieHeader.includes('next-auth.session-token') ||
    cookieHeader.includes('__Secure-next-auth.session-token');

  const hasUrl = !!process.env.NEXTAUTH_URL;
  const urlStartsHttps = process.env.NEXTAUTH_URL?.startsWith('https://') ?? false;
  const hasSecret = !!process.env.NEXTAUTH_SECRET;

  return NextResponse.json({
    ok: true,
    hints: {
      NEXTAUTH_URL_set: hasUrl,
      NEXTAUTH_URL_starts_https: urlStartsHttps,
      NEXTAUTH_SECRET_set: hasSecret,
      request_has_session_cookie: hasSessionCookie,
      node_env: process.env.NODE_ENV ?? 'undefined',
    },
    what_to_check: [
      !hasUrl && 'Set NEXTAUTH_URL in Netlify env (e.g. https://your-site.com)',
      !hasSecret && 'Set NEXTAUTH_SECRET in Netlify env',
      hasUrl && !urlStartsHttps && 'NEXTAUTH_URL should start with https:// in production',
      !hasSessionCookie &&
        'No session cookie in this request — login may not be setting the cookie, or cookie domain/path/Secure is wrong',
    ].filter(Boolean),
  });
}
