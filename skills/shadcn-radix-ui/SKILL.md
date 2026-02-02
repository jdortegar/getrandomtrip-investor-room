---
name: shadcn-radix-ui
description: Shadcn UI and Radix primitives in this project. Use when adding or customizing UI components (buttons, dialogs, forms, tabs) or when following the project's component and alias conventions.
metadata:
  project: investor-room
  style: default
  rsc: true
---

# Shadcn / Radix UI – Investor Room

This project uses **Shadcn UI** (Radix-based) with the **default** style. Components are in `components/ui/` and support **RSC** (many are server-compatible until interactivity is needed).

## Config

- **`components.json`** – Shadcn config: style `default`, `rsc: true`, `tsx: true`, Tailwind in `tailwind.config.ts`, CSS in `app/globals.css`, base color `slate`, CSS variables enabled.

## Aliases (use these in imports)

- **`@/components`** – Components root.
- **`@/components/ui`** – Shadcn/Radix UI primitives.
- **`@/lib`** – Lib root.
- **`@/lib/utils`** – `cn()` and other utils.
- **`@/lib/hooks`** – Shared hooks.

## UI components location

- **`components/ui/`** – Button, Card, Dialog, Input, Label, Select, Tabs, Alert, Badge, Form, etc. File names are kebab-case (e.g. `alert-dialog.tsx`, `dropdown-menu.tsx`).

## Adding a new Shadcn component

- From project root: `npx shadcn@latest add <component-name>` (or follow current Shadcn CLI). Components are added under `components/ui/` with the project’s Tailwind and alias setup.

## Usage conventions

- Prefer **composition**: use small primitives (Button, Input, Label) and compose in feature components under `components/admin/`, `components/app/`, `components/marketing/`, etc.
- **JSX props**: List alphabetically (see AGENTS.md).
- **Forms**: Use with `react-hook-form` and `@hookform/resolvers` + Zod when you need validation (see react-hook-form-zod skill).

## Do not

- Put business logic inside `components/ui/`; keep these presentational.
- Import Prisma or server-only code into UI components that might run on the client.

## References

- components.json: `components.json`
- UI components: `components/ui/`
- AGENTS.md: "Component structure", "JSX and props"
