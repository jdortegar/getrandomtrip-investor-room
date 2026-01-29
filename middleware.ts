import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Check if user is accessing /room routes
    if (req.nextUrl.pathname.startsWith('/room')) {
      const token = req.nextauth.token;

      // If no token, redirect to OTP
      if (!token) {
        return NextResponse.redirect(new URL('/otp', req.url));
      }

      // Check if user is an approved investor (from token or session)
      // With database sessions, investor data is in the session callback
      // The token might not have it, so we'll check in the route handler instead
      // For now, just check if token exists (auth check happens in layout)
      return NextResponse.next();
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to public routes
        if (
          req.nextUrl.pathname === '/' ||
          req.nextUrl.pathname.startsWith('/api') ||
          req.nextUrl.pathname === '/otp' ||
          req.nextUrl.pathname === '/onboarding'
        ) {
          return true;
        }

        // Require auth for /room routes
        if (req.nextUrl.pathname.startsWith('/room')) {
          return !!token;
        }

        return true;
      },
    },
  },
);

export const config = {
  matcher: ['/room/:path*'],
};
