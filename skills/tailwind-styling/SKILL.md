---
name: tailwind-styling
description: Tailwind CSS styling conventions for this project—class order, grouping with cn(), responsive and state prefixes. Use when writing or refactoring className and layout styles.
metadata:
  project: investor-room
  tailwind: '4.x'
---

# Tailwind CSS – Investor Room

This project uses **Tailwind CSS** (v4). Global styles are in **`app/globals.css`**. Use the **`cn()`** utility from **`@/lib/utils`** to merge and override classes (e.g. with component props).

## Class order and grouping

1. **Alphabetical order** – Within each group, sort classes alphabetically.
2. **Prefix grouping** – Split into separate strings inside `cn()`:
   - Base (no prefix): layout, spacing, typography, colors, etc.
   - Responsive: `sm:`, `md:`, `lg:`.
   - State: `hover:`, `focus:`, `active:`, `disabled:`, etc.

Example:

```tsx
import { cn } from '@/lib/utils';

className={cn(
  'absolute flex left-0 max-h-full space-x-20 top-0',
  'sm:w-full md:w-1/3 lg:w-1/4',
  'hover:opacity-90 focus:ring-2'
)}
```

## Responsive design

- **Mobile-first**: Base classes for mobile; use `sm:`, `md:`, `lg:` for larger breakpoints.
- Prefer Tailwind breakpoints over custom media queries unless necessary.

## Using cn()

- **`cn(...)`** – Merges class names and resolves conflicts (e.g. later classes override earlier). Use for component variants and conditional classes.
- Import: `import { cn } from '@/lib/utils';`

## Config

- **`tailwind.config.ts`** – Theme and content paths.
- **`app/globals.css`** – Tailwind directives and any global custom styles.
- **`postcss.config.mjs`** – PostCSS/Tailwind pipeline.

## Do not

- Mix long ungrouped class strings; keep alphabetical and grouped.
- Put raw Tailwind in external CSS files for component-level styling; keep component styles in JSX with Tailwind classes.

## References

- Utils: `lib/utils.ts`
- Globals: `app/globals.css`
- AGENTS.md: "Tailwind classes" section
