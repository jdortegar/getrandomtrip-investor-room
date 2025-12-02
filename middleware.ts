import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Check if user is accessing /room routes
    if (req.nextUrl.pathname.startsWith('/room')) {
      const token = req.nextauth.token;
      
      // Check if user is an approved investor
      if (token && (token as any).investor) {
        return NextResponse.next();
      }
      
      // Redirect to OTP if not approved
      return NextResponse.redirect(new URL('/otp', req.url));
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
          req.nextUrl.pathname === '/otp'
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
  }
);

export const config = {
  matcher: ['/room/:path*'],
};

