---
name: react-hook-form-zod
description: Building and validating forms with React Hook Form and Zod in this project. Use when adding or changing forms, validation schemas, or form submission handling.
metadata:
  project: investor-room
  resolver: '@hookform/resolvers'
---

# React Hook Form + Zod – Investor Room

This project uses **React Hook Form** with **Zod** for validation via **`@hookform/resolvers`**. Use this stack for any form that needs validation (e.g. OTP, onboarding, admin forms).

## Dependencies

- **`react-hook-form`** – Form state and handlers.
- **`@hookform/resolvers`** – Bridges Zod schemas to React Hook Form (`zodResolver`).
- **`zod`** – Schema and validation.

## Pattern

1. **Define a Zod schema** (e.g. in the same file or in `lib/`).
2. **Use `useForm`** with `resolver: zodResolver(schema)` and optional `defaultValues`.
3. **Wire inputs** with `register`, `control` (for Controller), or `formState.errors`.
4. **Submit** with `handleSubmit(onValid)`; Zod runs before `onValid`. Type the submit handler with `z.infer<typeof schema>` if needed.

Example:

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

function MyForm() {
  const form = useForm<FormData>({
    defaultValues: { email: '', name: '' },
    resolver: zodResolver(schema),
  });

  const handleSubmit = (data: FormData) => {
    // submit data
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      {/* inputs with form.register or Controller */}
    </form>
  );
}
```

## Conventions

- Keep schemas focused; reuse with `z.object().extend()` or composition as needed.
- Use manual types from `lib/types/` for API or app-level types; use `z.infer<typeof schema>` mainly for form payloads and validation.
- For Shadcn Form components, use the Form component from `components/ui/form.tsx` with `control` and `formField`-style usage when the project uses that pattern.

## Where used

- **OTP / auth flows** – e.g. `app/otp/` components.
- **Admin or onboarding forms** – Any form that needs validation in this project.

## References

- UI form component: `components/ui/form.tsx`
- Hooks: `lib/hooks/`
- AGENTS.md: "Typing" (manual types vs Zod infer)
