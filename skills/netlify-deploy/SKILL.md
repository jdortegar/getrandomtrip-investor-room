---
name: netlify-deploy
description: Building and deploying this Next.js app on Netlify—build command, env, Prisma, and Next.js plugin. Use when changing deployment, build settings, or environment variables for production.
metadata:
  project: investor-room
  platform: netlify
---

# Netlify Deployment – Investor Room

This project is deployed on **Netlify**. Next.js is served via **`@netlify/plugin-nextjs`**.

## Config file

- **`netlify.toml`** – Build command, publish directory, env, plugins, and functions config.

## Build

- **Command**: `npm run build` (runs `prisma generate` then `next build`).
- **Publish**: `.next` (handled by the Next.js plugin).
- **Node**: `NODE_VERSION = "20"`.
- **NPM**: `NPM_FLAGS = "--legacy-peer-deps"`; `NPM_CONFIG_FETCH_TIMEOUT = "300000"` for install.

## Environment (build / runtime)

- Set **`DATABASE_URL`**, **`NEXTAUTH_URL`**, **`NEXTAUTH_SECRET`**, **`RESEND_API_KEY`**, and any other required vars in Netlify **Site settings → Environment variables**.
- **`NEXTAUTH_URL`** must match the production URL (e.g. `https://your-site.netlify.app`).
- Never commit secrets; use Netlify’s env UI or CLI.

## Prisma

- **`[functions]`** in `netlify.toml`: `included_files = ["prisma/**"]` so the schema is available at build/runtime. `external_node_modules` includes `@prisma/client` as needed by the plugin.
- **Puppeteer**: Build env sets `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD = "true"` and `PUPPETEER_EXECUTABLE_PATH` for server-side use if applicable.

## Plugin

- **`@netlify/plugin-nextjs`** – Enables Next.js SSR, API routes, and correct asset handling on Netlify.

## After config changes

- Commit `netlify.toml` and trigger a new deploy, or run a local build with `npm run build` to verify.

## References

- netlify.toml: `netlify.toml`
- Docs: `docs/NETLIFY-DEPLOYMENT.md`, `docs/NETLIFY-BUILD-FIX.md` (if present)
