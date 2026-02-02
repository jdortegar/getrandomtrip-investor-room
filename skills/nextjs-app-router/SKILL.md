---
name: nextjs-app-router
description: Next.js 14 App Router conventions for this project—route groups, layouts, RSC vs client, API routes, and port 3011. Use when adding pages, layouts, route handlers, or deciding where to put server vs client code.
metadata:
  project: investor-room
  port: '3011'
---

# Next.js App Router – Investor Room

This project uses **Next.js 14** with the **App Router**. Dev server runs on **port 3011**.

## Route structure

- **`app/(app)/`** – Authenticated app (room, metrics, files, investment, legal). Shared layout in `app/(app)/room/layout.tsx`.
- **`app/(marketing)/`** – Public marketing page.
- **`app/api/`** – Route handlers (REST). Subpaths: `auth/`, `admin/`, `investor/`, `meetings/`.
- **`app/admin/`** – Admin pages (e.g. investors list).
- **`app/onboarding/`**, **`app/otp/`** – Onboarding and OTP flows.

Use **route groups** `(app)` and `(marketing)` to share layouts without affecting the URL path.

## When to use Server vs Client

- **Default to Server Components.** No `"use client"` unless the component needs browser APIs, interactivity, or local/Zustand state.
- **Data fetching**: Do it in Server Components or in `app/api/` route handlers. Never fetch Prisma/DB in a client component.
- **Client only when**: `window`/`navigator`, buttons/modals/toasts, `useState`/`useEffect`, Zustand. Keep the client boundary as small as possible (leaf components).
- Wrap client components in `Suspense` with a fallback when appropriate.

## Adding a new page

1. Create `app/<segment>/page.tsx` (or under a route group).
2. Prefer async Server Components for data; use `await` for DB or fetch.
3. For layouts, add `layout.tsx` in the same segment; it wraps all child segments.

## API routes

- Live under `app/api/<segment>/route.ts`.
- Export `GET`, `POST`, `PUT`, `PATCH`, `DELETE` as needed.
- Use `NextResponse.json()` for JSON; return `NextResponse` with status for errors.
- Auth: Use `getServerSession()` from `next-auth` in API routes that require a logged-in user.

## Conventions (see AGENTS.md)

- One component per file; keep files under 300 lines.
- Props in JSX in **alphabetical order**.
- Manual types in `lib/types/`; do not import `@prisma/client` in UI.

## Commands

- `npm run dev` – dev server on http://localhost:3011
- `npm run build` – `prisma generate` then `next build`
- `npm run start` – production server on port 3011
