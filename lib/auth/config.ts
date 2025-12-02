import { type NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/api/prisma';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    EmailProvider({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      // Custom email sending with Resend
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        try {
          const { data, error } = await resend.emails.send({
            from: provider.from as string,
            to: identifier,
            subject: 'Sign in to Investor Room',
            html: `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                  <div style="background: linear-gradient(135deg, #0A2240 0%, #D2691E 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
                    <h1 style="color: white; margin: 0; font-size: 28px;">Investor Room</h1>
                  </div>
                  <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
                    <h2 style="color: #0A2240; margin-top: 0;">Sign in to your account</h2>
                    <p>Click the button below to sign in to the Investor Room. This link will expire in 10 minutes.</p>
                    <div style="text-align: center; margin: 30px 0;">
                      <a href="${url}" style="background: #0A2240; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600;">Sign In</a>
                    </div>
                    <p style="font-size: 14px; color: #666; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
                      If you didn't request this email, you can safely ignore it.
                    </p>
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
    strategy: 'database',
    maxAge: 15 * 60, // 15 minutes
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user && user) {
        session.user.id = user.id;
        
        // Check if user is an approved investor
        if (user.email) {
          const investor = await prisma.investor.findUnique({
            where: { email: user.email },
          });

          if (investor && investor.approved) {
            session.investor = {
              id: investor.id,
              email: investor.email,
              name: investor.name,
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

