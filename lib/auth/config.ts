import { type NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/api/prisma';
import { Resend } from 'resend';
import type { Adapter } from 'next-auth/adapters';

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
    EmailProvider({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      maxAge: 10 * 60, // 10 minutes
      // Custom email sending with Resend
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        // Only initialize Resend when actually sending an email
        const resend = getResend();

        try {
          const { data, error } = await resend.emails.send({
            from: provider.from as string,
            to: identifier,
            subject: 'Accede al Investor Room',
            html: `
              <!doctype html>
              <html>
                <head>
                  <meta charset="utf-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <style>
                    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; margin:0; background:#f6f7fb; -webkit-font-smoothing:antialiased; }
                    .container { max-width:600px; margin:24px auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 8px 24px rgba(10,34,64,0.06); }
                    .header { background: #ffffff; padding:20px; text-align:center; border-bottom:1px solid #eef2f7; }
                    .logo { height:40px; display:inline-block; }
                    .main { padding:28px; color:#0A2240; }
                    .title { font-size:20px; margin:0 0 8px; }
                    .copy { color:#475569; margin-bottom:18px; font-size:15px; line-height:1.5; }
                    .button { background:#0A2240; color:#fff; padding:12px 22px; text-decoration:none; border-radius:8px; display:inline-block; font-weight:600; }
                    .footer { padding:18px; border-top:1px solid #eef2f7; color:#6b7280; font-size:13px; text-align:center; }
                    @media (max-width:480px){ .container{margin:12px} .main{padding:20px} .logo{height:36px} }
                  </style>
                </head>
                <body>
                  <div class="container" role="article" aria-label="Accede a la Sala de inversores">
                    <div class="header" role="banner">
                      <img src="https://investors.getrandomtrip.com/assets/svg/logo.svg" alt="Sala de inversores" class="logo" />
                    </div>
                    <div class="main">
                      <h2 class="title">Accede a tu cuenta</h2>
                      <p class="copy">Haz clic en el botón abajo para acceder a la Sala de inversores. Este enlace expirará en 10 minutos.</p>
                      <div style="text-align:center; margin:22px 0;">
                        <a href="${url}" class="button" target="_blank" rel="noopener noreferrer">Acceder</a>
                      </div>
                      <p class="copy">Si no solicitaste este correo, puedes ignorarlo de forma segura.</p>
                    </div>
                    <div class="footer">&copy; ${new Date().getFullYear()} getrandomtrip</div>
                  </div>
                </body>
              </html>
            `,
          });

          if (error) {
            throw new Error(`Resend error: ${error.message}`);
          }
        } catch (error) {
          console.error('Failed to send email:', error);
          throw new Error('Failed to send email');
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
