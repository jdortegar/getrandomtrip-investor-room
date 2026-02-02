---
name: prisma-database
description: Prisma schema, client usage, and typing conventions for this project. Use when changing the database schema, writing queries, or defining types for investors, users, sessions, or documents.
metadata:
  project: investor-room
  database: postgresql
---

# Prisma & Database – Investor Room

This project uses **Prisma** with **PostgreSQL**. Schema is in `prisma/schema.prisma`; the client is created in `lib/api/prisma.ts`.

## Schema location

- **`prisma/schema.prisma`** – All models, enums, and datasource. After editing, run `npx prisma generate` (or `npm run build`, which runs it).

## Client usage

- **Single import**: `import { prisma } from '@/lib/api/prisma';`
- Use only in **server** code: API routes, Server Components, server actions, and `lib/auth/config.ts`. Never use Prisma in client components or in files that run in the browser.

## Typing convention (important)

- **Manual types live in `lib/types/`** (e.g. `Investor.ts`, `Document.ts`, `Safe.ts`). Use these in UI, pages, and API response shapes.
- **Do not** import types from `@prisma/client` into components or pages. Use Prisma-generated types only inside server/API/db logic or for enums.
- Align manual types with the schema but adapt as needed (e.g. optional fields for forms). Keep Prisma as the source of truth for the DB; manual types as the contract for the app.

## Common models

- **User**, **Account**, **Session**, **VerificationToken** – NextAuth.
- **Investor** – Linked to User; used for room access, status, approval.
- **Document** – File metadata (e.g. in room/files).
- Other domain models – See `prisma/schema.prisma` for the full list.

## Migrations

- After schema changes: `npx prisma migrate dev --name <description>` for local dev.
- For production/Netlify, see `docs/DATABASE-PERMISSIONS-FIX.md` and `docs/NETLIFY-DEPLOYMENT.md` if applicable.

## References

- Project types: `lib/types/`
- Prisma client: `lib/api/prisma.ts`
- AGENTS.md: "Typing (manual types vs Prisma)" section
