---
name: nextauth-auth
description: NextAuth configuration, session, and auth flows in this project. Use when adding or changing login, session checks, protected routes, or the auth provider (email + Resend).
metadata:
  project: investor-room
  provider: email
---

# NextAuth – Investor Room

Authentication is handled by **NextAuth** with the **Email** provider. Magic-link emails are sent via **Resend**. Session and user data are stored with **Prisma** (PostgreSQL).

## Config location

- **`lib/auth/config.ts`** – Defines providers, adapter, callbacks, and Resend integration for verification emails.
- **`app/api/auth/[...nextauth]/route.ts`** – NextAuth route handler.

## Provider

- **Email (magic link)** – No password. User enters email; NextAuth sends a sign-in link via Resend. The adapter uses Prisma for `User`, `Account`, `Session`, `VerificationToken`.

## Session and protected routes

- **Server**: `import { getServerSession } from 'next-auth';` then `const session = await getServerSession(authOptions)`. Use `authOptions` from `lib/auth/config.ts`.
- **Client**: Wrap the app (or relevant tree) in `SessionProvider` from `components/providers/SessionProvider.tsx`; then use `useSession()` from `next-auth/react`.
- **Redirects**: Use `lib/hooks/useAuthRedirect.ts` for client-side redirect when unauthenticated (e.g. from room pages).

## API routes that require auth

- Call `getServerSession(authOptions)`. If `!session`, return `401` or `NextResponse.json({ error: 'Unauthorized' }, { status: 401 })`.
- Use `session.user.email` or `session.user.id` for user-scoped logic; link to `Investor` via Prisma when needed.

## Callbacks

- Config defines `signIn`, `session`, `jwt` callbacks. The adapter handles verification token creation and consumption; `lib/auth/config.ts` wraps the adapter to handle token deletion errors gracefully.

## Environment

- **`NEXTAUTH_URL`** – Base URL (e.g. `http://localhost:3011`).
- **`NEXTAUTH_SECRET`** – Required in production.
- **`RESEND_API_KEY`** – Used by the Email provider to send magic links (see Resend skill).

## Type augmentation

- **`types/next-auth.d.ts`** – Extends NextAuth types (e.g. `session.user` fields). Use for type-safe access in components and API routes.

## References

- Auth config: `lib/auth/config.ts`
- Route handler: `app/api/auth/[...nextauth]/route.ts`
- SessionProvider: `components/providers/SessionProvider.tsx`
- useAuthRedirect: `lib/hooks/useAuthRedirect.ts`
