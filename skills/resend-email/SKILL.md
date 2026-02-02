---
name: resend-email
description: Sending transactional email with Resend in this project—NextAuth magic links and investor invitations. Use when adding or changing email sending, invitation flows, or Resend configuration.
metadata:
  project: investor-room
---

# Resend Email – Investor Room

This project uses **Resend** for transactional email:

1. **NextAuth magic links** – Sign-in links sent via the Email provider (configured in `lib/auth/config.ts`).
2. **Investor invitations** – Access emails sent from the admin “Resend invitation” flow (`app/api/admin/investor/resend-invitation/route.ts`).

## Environment

- **`RESEND_API_KEY`** – Required for sending. Set in `.env` (local) and in Netlify (or your host) environment variables. Never expose in client code.

## Where Resend is used

- **`lib/auth/config.ts`** – Lazy `getResend()`; used in the Email provider’s `sendVerificationRequest` to send magic-link emails. From address and domain come from env (e.g. `RESEND_FROM_EMAIL` / domain).
- **`app/api/admin/investor/resend-invitation/route.ts`** – Admin-only POST; finds or creates an investor by email, then sends an invitation email with a link to `/otp?callbackUrl=/room` (or similar). Uses Resend to send the email.

## Adding new email flows

1. Use Resend only in **server** code (API routes, server actions, or auth callbacks).
2. Read `RESEND_API_KEY` from `process.env`; if missing, return a clear error (e.g. 500 with “Resend API key not configured”).
3. Use a consistent from address/domain (preferably from env) and handle bounces/errors as needed.
4. Do not log or expose full email content or API keys.

## Resend API

- Instantiate: `new Resend(process.env.RESEND_API_KEY)`.
- Send: `resend.emails.send({ from, to, subject, html, ... })`. See [Resend docs](https://resend.com/docs) for options.

## References

- Auth + magic links: `lib/auth/config.ts`
- Resend invitation API: `app/api/admin/investor/resend-invitation/route.ts`
- Docs: `docs/RESEND-SETUP.md` (if present)
