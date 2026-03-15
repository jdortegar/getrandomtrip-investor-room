# Investor Flow — Review

**Purpose:** Document the current investor journey and flag inconsistencies or improvements.

---

## Flow overview

```
Marketing (/) 
  → Waitlist signup (optional; creates WaitlistEntry only)
  → Founder approves in Admin → creates/updates Investor, sends “access” email

Access email link: /otp?callbackUrl=/room
  → OTP page: user enters email → NextAuth magic link
  → Magic link click → callback → redirect to /otp
  → useAuthRedirect:
      - If no investor or !profileComplete → /onboarding
      - If profileComplete && approved → callbackUrl (e.g. /room) or /room

/onboarding
  → Form: name (required), phone, company
  → POST /api/investor/update → profileComplete = true, link User ↔ Investor
  → Redirect to /room

[locale]/(app)/room layout
  → No session → redirect pathForLocale(locale, '/otp')
  → No investor or !profileComplete → redirect pathForLocale(locale, '/onboarding')
  → !approved → render “Acceso pendiente” (no room)
  → Else → render room (nav + children)
```

---

## What works well

- **Friction progressive:** Public marketing → human approval → OTP → onboarding → room.
- **Single source of truth:** `Investor` (Prisma) with `profileComplete` and `approved`; session callback loads investor into `session.investor`.
- **Locale-aware layout:** Room layout uses `getLocaleFromCookies()` and `pathForLocale()` for redirects and links.
- **Middleware:** Protects `/room` and `/en/room` (redirect to OTP when no token); i18n handles rewrites/redirects for `/otp` and `/room`.

---

## Inconsistencies and bugs

### 1. Room child pages redirect to `/otp` without locale

**Files:**  
`app/[locale]/(app)/room/helper/page.tsx`, `room/files/page.tsx`, `room/files/[id]/page.tsx`, `room/investment/page.tsx`

They do `redirect('/otp')` or `redirect('/otp')` when unauthenticated or investor not approved. The **layout** already runs first and redirects with `pathForLocale(locale, '/otp')`, so in normal navigation the layout wins. For direct access or consistency, child pages should use the same pattern:

- Get locale (e.g. `getLocaleFromCookies()`) and call `redirect(pathForLocale(locale, '/otp'))`.

**Recommendation:** Use a small server helper (e.g. `requireRoomAuth()`) that gets session + locale and redirects with `pathForLocale(locale, '/otp')` or `pathForLocale(locale, '/onboarding')` so all room pages stay consistent.

---

### 2. Room internal links without locale

**Files:**  
`app/[locale]/(app)/room/helper/page.tsx` (checklist `href: '/room/files'`, `'/room/investment'`), `room/legal/page.tsx` (`redirect('/room/files')`), `room/files/[id]/page.tsx` (`<Link href="/room/files">`).

These use paths without `pathForLocale(locale, …)`. For default locale (es) the app may rewrite `/room` → `/es/room`, so `/room/files` might still work; for `/en` the canonical path is `/en/room/files`, so hardcoded `/room/files` can break or cause an extra redirect.

**Recommendation:** Use `pathForLocale(locale, '/room/files')` (and similar) everywhere in room routes, and pass `locale` from layout into pages that need it (or read from cookies in server components).

---

### 3. Approval / resend email link has no locale

**Files:**  
`app/api/admin/investor/approve/route.ts`, `app/api/admin/investor/resend-invitation/route.ts`

`accessUrl = ${baseUrl}/otp?callbackUrl=/room`. That sends users to `/otp` and `/room` without a locale prefix. Middleware then rewrites/redirects by `accept-language` or cookie, so they still land on a valid page, but the link could be made locale-aware (e.g. from admin UI or user preference) for a more consistent experience. Lower priority than the room redirects/links above.

---

### 4. useAuthRedirect path check

**File:**  
`lib/hooks/useAuthRedirect.ts`

It only treats `currentPath !== '/otp' && currentPath !== '/en/otp'` as “on OTP page”. For Spanish, middleware rewrites `/otp` to `/es/otp`; in the client, `pathname` may still be `/otp` (browser URL). If in some cases pathname were `/es/otp`, the hook would not consider it OTP and would not run the redirect. Safer to treat “OTP page” in a locale-agnostic way (e.g. pathname ends with `/otp` or matches `/(en|es)?/otp`).

---

### 5. Session type

**File:**  
`app/[locale]/(app)/room/layout.tsx` (and others)

`const investor = (session as any).investor` is used. The session shape is extended in `lib/auth/config.ts` (session callback) but not in a shared type that components can import. Recommendation: extend the NextAuth session type (e.g. in `types/next-auth.d.ts`) with `investor?: { id, email, name, … }` and use `session.investor` without `as any`.

---

## Flow summary table

| Step | URL / action | Guard / behavior |
|------|-------------|------------------|
| 1 | Marketing `/[locale]` or `/` | Gate: localStorage “unlocked” or show WaitlistPage. |
| 2 | Waitlist submit | POST /api/waitlist → WaitlistEntry (no Investor). |
| 3 | Admin approve | POST /api/admin/investor/approve → Investor approved, email with `/otp?callbackUrl=/room`. |
| 4 | OTP page | Enter email → magic link (NextAuth Email provider + Resend). |
| 5 | Magic link | Callback → redirect to `/otp` (callback loses callbackUrl unless preserved; config redirect goes to baseUrl/otp). |
| 6 | useAuthRedirect on /otp | If authenticated: !profileComplete → /onboarding; else → callbackUrl or /room. |
| 7 | Onboarding | Form → POST /api/investor/update → profileComplete, then redirect to /room. |
| 8 | Room layout | No session → /otp; !profileComplete → /onboarding; !approved → “Acceso pendiente”; else room UI. |

---

## Recommended next steps

1. ~~**Introduce `requireRoomAuth()` (or similar)** in `lib/auth/` that returns session + locale and performs locale-aware redirects to `/otp` or `/onboarding`; use it in room layout and all room child pages so redirects are consistent.~~ **Done:** `lib/auth/requireRoomAuth.ts` added; layout and all room pages use it.
2. ~~**Replace raw `/room/...` and `redirect('/room/...')`** in room app with `pathForLocale(locale, '/room/...')` and ensure `locale` is available (e.g. from layout or cookies).~~ **Done:** helper checklist + quick links, files list + file viewer Back, legal redirect all use `pathForLocale(locale, …)`.
3. ~~**Extend NextAuth session type** so `session.investor` is typed and `(session as any)` can be removed.~~ **Done:** `types/next-auth.d.ts` already had `Session.investor`; removed `(session as any)` in RoomNav and Navbar.
4. ~~**Harden useAuthRedirect** so the “on OTP page” check works for both `/otp` and `/[locale]/otp` (e.g. pathname-based).~~ **Done:** `isOtpPath(pathname)` added; treats `/otp`, `/en/otp`, `/es/otp`.
5. ~~(Optional) Add locale to approval/resend emails~~ **Done:** approve and resend-invitation build `accessUrl` with `pathForLocale(DEFAULT_LOCALE, '/otp')` and `pathForLocale(DEFAULT_LOCALE, '/room')`; can later accept `locale` in request body if needed.

---

**Last updated:** 2025-03-05
