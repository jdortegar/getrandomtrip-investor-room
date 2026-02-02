# AGENTS.md

Instructions for AI coding agents working on this project. See [agents.md](https://agents.md/) for the format.

## Project overview

**Investor Room** is a Next.js App Router application for RandomTrip's investor portal. It includes marketing pages, authenticated room (metrics, files, investment, legal, etc.), admin (investor approval, resend invitation), OTP flow, and meeting booking. Stack: Next.js 14, TypeScript, Prisma, PostgreSQL, NextAuth, Shadcn/Radix, Tailwind CSS, Resend. Deployed on Netlify.

## Setup commands

- Install deps: `npm install`
- Start dev server: `npm run dev` (port **3011**)
- Build: `npm run build` (runs `prisma generate` then `next build`)
- Start prod: `npm start` (port **3011**)
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`

Before committing, run `npm run lint` and `npm run typecheck`.

## Environment

Create `.env` with at least:

- `DATABASE_URL` – PostgreSQL connection string (same DB as main app when applicable)
- `NEXTAUTH_URL` – e.g. `http://localhost:3011` for local

See `docs/` for Resend, Google Meet, Netlify, and other setup.

## Skills (Agent Skills)

Feature-specific instructions live in **`skills/`** following the [Agent Skills](https://agentskills.io/home) format. Each skill is a directory with a `SKILL.md`. **Load the skill when the task matches its description** (read `skills/<name>/SKILL.md`).

| Skill                        | Description                                                                                                                                                           |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **nextjs-app-router**        | Next.js 14 App Router—route groups, layouts, RSC vs client, API routes, port 3011. Use when adding pages, layouts, route handlers, or deciding server vs client code. |
| **prisma-database**          | Prisma schema, client usage, and typing. Use when changing the database schema, writing queries, or defining types for investors, users, sessions, or documents.      |
| **nextauth-auth**            | NextAuth config, session, and auth flows. Use when adding or changing login, session checks, protected routes, or the Email + Resend provider.                        |
| **shadcn-radix-ui**          | Shadcn UI and Radix primitives. Use when adding or customizing UI components (buttons, dialogs, forms, tabs) or following component and alias conventions.            |
| **tailwind-styling**         | Tailwind CSS—class order, grouping with `cn()`, responsive and state prefixes. Use when writing or refactoring `className` and layout styles.                         |
| **resend-email**             | Transactional email with Resend—magic links and investor invitations. Use when adding or changing email sending, invitation flows, or Resend config.                  |
| **react-hook-form-zod**      | Forms with React Hook Form and Zod. Use when adding or changing forms, validation schemas, or form submission handling.                                               |
| **netlify-deploy**           | Building and deploying on Netlify—build command, env, Prisma, Next.js plugin. Use when changing deployment, build settings, or production env.                        |
| **google-calendar-meetings** | Google Calendar event URLs and meeting booking. Use when adding or changing meeting booking, calendar links, or Google Meet integration.                              |

Path for each: **`skills/<skill-name>/SKILL.md`** (e.g. `skills/nextjs-app-router/SKILL.md`).

## Folder structure

Respect this layout. Do not add ad-hoc folders (e.g. `helpers2/`, `misc/`).

```
/ ── app/
│    ├── (app)/          # Authenticated app (room, metrics, files, etc.)
│    ├── (marketing)/    # Public marketing
│    ├── api/            # Route handlers
│    ├── admin/          # Admin pages
│    ├── onboarding/    # Onboarding
│    └── otp/            # OTP flow

/ ── components/
│    ├── admin/          # Admin UI (e.g. ApproveInvestorButton)
│    ├── app/             # App-specific (e.g. Safe)
│    ├── marketing/      # Marketing sections
│    ├── navigation/     # Nav, SignOut
│    ├── providers/      # SessionProvider, etc.
│    └── ui/              # Shadcn/Radix primitives (kebab-case filenames ok)

/ ── lib/
│    ├── api/             # Prisma client, DB helpers
│    ├── auth/            # NextAuth config
│    ├── constants/       # Meeting, etc.
│    ├── helpers/         # Pure utilities (camelCase.ts)
│    ├── hooks/           # useAuthRedirect, useEmailResend, etc.
│    └── types/           # Manual types (PascalCase.ts) — see Typing

/ ── prisma/              # schema.prisma
/ ── public/               # assets, images, videos
/ ── store/                # Zustand (when used)
│    ├── slices/          # One slice per file
│    └── store.ts         # Composed store
/ ── types/                # Global augmentations (e.g. next-auth.d.ts)
```

Match domain logic across layers (e.g. `components/app/` ↔ `lib/helpers/`).

## Imports

- **Order**: Group and sort imports in this order, with a blank line between groups:
  1. React / Next.js (e.g. `react`, `next/navigation`, `next/link`)
  2. Third-party packages (e.g. `next-auth`, `@radix-ui/*`, `zod`)
  3. Aliased project imports (`@/components/*`, `@/lib/*`, `@/types/*`)
  4. Relative imports (e.g. `./utils`, `../types`)
- **Sorting**: Alphabetize within each group by module path (e.g. `@/components/ui/button` before `@/lib/utils`).
- **Path alias**: Prefer `@/` for app code (components, lib, types); use relative only for same-directory or sibling files when shorter and clear.

## Code comments

- **Prefer clear names over comments** – Use descriptive identifiers (e.g. `isLoading`, `handleSubmit`); avoid comments that only restate the code.
- **When to comment**: Non-obvious business rules, workarounds, TODOs with context, and brief JSDoc for public helpers/API when it adds value.
- **Style**: Short, factual sentences. Use `//` for single-line; avoid block comments for trivial notes.
- **Avoid**: Commented-out code (delete or rely on git); noisy or outdated comments.

## Commits

- **Before committing**: Run `npm run lint` and `npm run typecheck`; fix errors.
- **Messages**: Use clear, imperative subject line (e.g. "Add investor approval API", "Fix OTP redirect"). Optionally add a short body for non-obvious changes.
- **Scope**: Prefer small, logical commits (one feature or fix per commit) so history stays readable and revertable.

## Code style

- **TypeScript**: Strict mode. Prefer `interface` over `type`. Avoid enums; use maps where needed.
- **Functions**: Use the `function` keyword for pure functions.
- **Naming**: Descriptive names; booleans with auxiliaries (e.g. `isLoading`, `hasError`).
- **Exports**: Prefer named exports for components.
- **File length**: Keep files under **300 lines**; split by responsibility.

## File and folder naming

| Kind            | Convention               | Example                          |
| --------------- | ------------------------ | -------------------------------- |
| Folders         | kebab-case               | `book-editor`, `room/files`      |
| Component files | PascalCase               | `BookCard.tsx`                   |
| Utilities       | camelCase                | `formatCurrency.ts`              |
| Constants       | SNAKE_CASE or PascalCase | `meeting.ts`, `API_ENDPOINTS.ts` |
| Types           | PascalCase               | `User.ts`, `Investor.ts`         |
| Hooks           | useCamelCase             | `useAuthRedirect.ts`             |

Exception: `components/ui/` may use kebab-case to match Shadcn (e.g. `alert-dialog.tsx`).

## JSX and props

- **Props order**: List JSX props **alphabetically by name**.
- **Handlers**: Use `handle` prefix (e.g. `handleSubmit`, `handleClick`).

Example:

```tsx
<Button
  aria-label="Submit"
  disabled={isDisabled}
  onClick={handleSubmit}
  size="lg"
/>
```

## Tailwind classes

- **Order**: Alphabetical within each group.
- **Grouping**: Put unprefixed, then responsive (`sm:`, `md:`), then state (`hover:`, `focus:`) in separate strings inside `cn()`.

Example:

```tsx
className={cn(
  'absolute flex left-0 max-h-full space-x-20 top-0',
  'sm:w-full md:w-1/3 lg:w-1/4',
  'hover:opacity-90'
)}
```

## Component structure

- **Functional components only**; one component per file.
- **Order in file**: Imports → Types/Interfaces → Routing/state → Derived/memoized → Hooks → Effects → Actions (handleX) → Refs/classes → JSX return.
- **Props and helpers**: Declare interfaces and helper functions **above** the component.
- **Single responsibility**: One clear purpose per component; split when logic grows.

## "use client" and RSC

- **Minimize `"use client"`.** Prefer React Server Components for data fetching and layout.
- **Use client only for**: Web APIs (`window`, `navigator`), interactive UI (buttons, modals, toasts), Zustand/local state, or component-specific `useEffect`.
- **Do not use client for**: Data fetching (fetch, Prisma), pure utilities, static display, or top-level route handlers. Move data fetching to RSC or server actions.
- Wrap client components in `Suspense` with a fallback when appropriate.

## Typing (manual types vs Prisma)

- **Manual types live in `lib/types/`.** Use them in UI and app code.
- **Do not** import `@prisma/client` types into components or pages. Use Prisma types only for enums or inside server/API/db code.
- Align manual types with the Prisma schema but adapt as needed (e.g. optional fields for forms).
- Use `z.infer<typeof schema>` only in forms or backend validation, not as the main app type source.

## Zustand (when used)

- Slices in `store/slices/`, one file per slice.
- Compose in `store/store.ts` with `create<>()` and optional `devtools`/`persist`.
- Each slice: explicit interface and clear actions (e.g. `setUser`, `clearCart`).
- Strong typing; avoid untyped `create(() => ({ ... }))`.

## Testing and quality

- Run `npm run lint` and `npm run typecheck` before committing.
- Fix lint and type errors before considering the task done.
- Add or update tests for changed behavior when relevant.
- For deployment and DB: see `docs/` (Netlify, Prisma, permissions, etc.).

## Security and env

- Do not commit secrets or `.env`. Do not hardcode API keys in client-visible code.
- Use server-side env for Resend, NextAuth, DB, and other secrets.

## Documentation

- Human-facing: `README.md`, `SETUP.md`.
- Architecture and decisions: `docs/` (e.g. `technical-decisions.md`, `investor-room-feature-spec.md`).
- Agent-facing: this file (`AGENTS.md`). Skills: `skills/<name>/SKILL.md`. For nested or large areas, add an `AGENTS.md` in that directory; the closest one in the tree takes precedence.
