import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    investor?: {
      id: string;
      email: string;
      name?: string | null;
      phone?: string | null;
      company?: string | null;
      profileComplete: boolean;
      approved: boolean;
    };
  }

  interface User {
    id: string;
  }
}
