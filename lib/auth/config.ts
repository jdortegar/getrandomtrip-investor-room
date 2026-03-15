import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/api/prisma';
import { Resend } from 'resend';
import type { Adapter } from 'next-auth/adapters';

import { DEFAULT_LOCALE } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import type { EmailsDictionary } from '@/lib/types/dictionary';

// WIP gate: single hardcoded admin user (no DB)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'randomtrip2026';

// Create base adapter
const baseAdapter = PrismaAdapter(prisma) as Adapter;

// Custom adapter wrapper to handle verification token deletion errors gracefully
const adapter: Adapter = {
  ...baseAdapter,
  async useVerificationToken({ identifier, token }) {
    try {
      // Try to find and delete the token
      const verificationToken = await prisma.verificationToken.findUnique({
        where: {
          identifier_token: {
            identifier,
            token,
          },
        },
      });

      if (!verificationToken) {
        // Token doesn't exist (already used or expired)
        return null;
      }

      // Check if token is expired
      if (verificationToken.expires < new Date()) {
        // Delete expired token
        await prisma.verificationToken.delete({
          where: {
            identifier_token: {
              identifier,
              token,
            },
          },
        });
        return null;
      }

      // Delete the token and return it
      await prisma.verificationToken.delete({
        where: {
          identifier_token: {
            identifier,
            token,
          },
        },
      });

      return {
        identifier: verificationToken.identifier,
        token: verificationToken.token,
        expires: verificationToken.expires,
      };
    } catch (error: any) {
      // If token doesn't exist or any other error, return null
      // This prevents the "Record to delete does not exist" error
      if (error?.code === 'P2025' || error?.message?.includes('not found')) {
        return null;
      }
      // Log other errors but don't throw
      console.error('Error using verification token:', error);
      return null;
    }
  },
};

// Lazy initialization - only create Resend instance when needed
function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not set');
  }
  return new Resend(apiKey);
}

export const authOptions: NextAuthOptions = {
  adapter,
  providers: [
    CredentialsProvider({
      credentials: {
        password: { label: 'Password', type: 'password' },
        username: { label: 'Username', type: 'text' },
      },
      async authorize(credentials) {
        if (
          credentials?.username === ADMIN_USERNAME &&
          credentials?.password === ADMIN_PASSWORD
        ) {
          return { id: 'admin', email: 'admin', name: 'Admin' };
        }
        return null;
      },
      id: 'credentials',
      name: 'Username & password',
    }),
    EmailProvider({
      // Use EMAIL_FROM from env; must be a sender on your verified Resend domain (e.g. contact.getrandomtrip.com)
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      maxAge: 10 * 60, // 10 minutes
      // Custom email sending with Resend
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        const baseUrl ='https://investors.getrandomtrip.com';

        try {
          const resend = getResend();
          const dict = await getDictionary(DEFAULT_LOCALE);
          const strings = (dict as { emails: EmailsDictionary }).emails
            .magicLink;

          const { error } = await resend.emails.send({
            from: provider.from as string,
            to: identifier,
            subject: strings.subject,
            // Self-contained full document; html/head/body are not from any other part
            html: `
              <!doctype html>
              <html>
                <head>
                  <meta charset="utf-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <link rel="preconnect" href="https://fonts.googleapis.com" />
                  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                  <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@400;500;600;700&display=swap" rel="stylesheet" />
                  <style>
                    body { font-family: 'Barlow', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; margin:0; background:#f6f7fb; -webkit-font-smoothing:antialiased; }
                    .container { max-width:600px; margin:24px auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 8px 24px rgba(10,34,64,0.06); }
                    .header { background: #ffffff; padding:20px; text-align:center; border-bottom:1px solid #eef2f7; }
                    .logo { display:block; height:48px; width:192px; max-width:100%; object-fit:contain; margin-left:auto; margin-right:auto; }
                    .main { padding:28px; color:#0A2240; font-family: 'Barlow', sans-serif; }
                    .title { font-family: 'Barlow Condensed', Arial Narrow, sans-serif; font-size:20px; font-weight:600; margin:0 0 8px; }
                    .copy { font-family: 'Barlow', sans-serif; color:#475569; margin-bottom:18px; font-size:15px; line-height:1.5; }
                    .button { background:#FED700; color:#000; padding:12px 24px; text-decoration:none; border-radius:8px; display:block; font-weight:600; font-size:1rem; font-family: 'Barlow Condensed', Arial Narrow, sans-serif; text-transform:uppercase; letter-spacing:0.025em; width:100%; }
                    @media (min-width:768px){ .button { font-size:1.125rem; } }
                    .footer { font-family: 'Barlow', sans-serif; padding:18px; border-top:1px solid #eef2f7; color:#6b7280; font-size:13px; text-align:center; }
                    @media (max-width:480px){ .container{margin:12px} .main{padding:20px} .logo{height:40px;width:160px} }
                  </style>
                </head>
                <body>
                  <div class="container" role="article" aria-label="${strings.logoAlt}">
                    <div class="header" role="banner">
                      <img src="${baseUrl}/assets/svg/randomtrip.svg" alt="${strings.logoAlt}" class="logo" width="280" height="120" style="display:block;height:120px;width:280px;max-width:100%;object-fit:contain;margin-left:auto;margin-right:auto;" />
                    </div>
                    <div class="main">
                      <h2 class="title">${strings.title}</h2>
                      <p class="copy">${strings.copy}</p>
                      <div style="border-radius:8px; margin:22px 0; overflow:hidden; text-align:center;">
                        <a href="${url}" class="button" target="_blank" rel="noopener noreferrer" style="background:#FED700;border-bottom-left-radius:8px;border-bottom-right-radius:8px;border-top-left-radius:8px;border-top-right-radius:8px;color:#000;display:inline-block;font-family:'Barlow Condensed',Arial Narrow,sans-serif;font-size:1rem;font-weight:600;letter-spacing:0.025em;padding:12px 24px;text-decoration:none;text-transform:uppercase;width:100%;">${strings.button}</a>
                      </div>
                      <p class="copy">${strings.safeIgnore}</p>
                    </div>
                    <div class="footer">&copy; ${new Date().getFullYear()} getrandomtrip</div>
                  </div>
                </body>
              </html>
            `,
          });

          if (error) {
            console.error('[NextAuth Email] Resend error:', {
              identifier,
              message: error.message,
              name: error.name,
            });
            throw new Error(`error: ${error.message}`);
          }
        } catch (err) {
          const message =
            err instanceof Error ? err.message : 'Failed to send email';
          console.error('[NextAuth Email] sendVerificationRequest failed:', {
            identifier,
            message,
            error: err,
          });
          throw new Error(message);
        }
      },
    }),
  ],
  pages: {
    signIn: '/otp',
    error: '/otp',
  },
  session: {
    maxAge: 15 * 60, // 15 minutes
    strategy: 'jwt',
  },
  useSecureCookies: process.env.NEXTAUTH_URL?.startsWith('https://') ?? false,
  callbacks: {
    async jwt({ token, user }) {
      // On sign-in, user is present; persist user id so session callback can use it
      if (user) {
        token.sub = user.id;
        token.email = user.email ?? token.email;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      // For email provider callbacks, always redirect to /otp
      // The OTP page will handle the actual redirect based on investor status
      if (url.includes('/api/auth/callback/email')) {
        return `${baseUrl}/otp`;
      }

      // If url is a relative path, make it absolute
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }
      // If url is on the same origin, allow it
      if (new URL(url).origin === baseUrl) {
        return url;
      }
      // Otherwise, redirect to room
      return `${baseUrl}/room`;
    },
    async session({ session, token }) {
      // JWT strategy: session callback receives token, not user
      if (session.user) {
        session.user.id = token.sub as string;

        if (token.email) {
          const investor = await prisma.investor.findUnique({
            where: { email: token.email as string },
          });

          if (investor) {
            session.investor = {
              id: investor.id,
              email: investor.email,
              name: investor.name,
              phone: investor.phone,
              company: investor.company,
              profileComplete: investor.profileComplete,
              approved: investor.approved,
            };
          }
        }
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
