import NextAuth from 'next-auth';

import { authOptions } from '@/lib/auth/config';

const nextAuthHandler = NextAuth(authOptions);

function handler(
  req: Request,
  context: { params: Promise<{ nextauth: string[] }> },
) {
  return nextAuthHandler(req, context).catch((err: unknown) => {
    console.error('[NextAuth] Unhandled error:', err);
    if (err instanceof Error) {
      console.error('[NextAuth] message:', err.message);
      console.error('[NextAuth] stack:', err.stack);
    }
    throw err;
  });
}

export { handler as GET, handler as POST };

