# Investor Room — Setup Guide

**Status:** Ready for Implementation  
**Purpose:** Step-by-step setup instructions for all services and dependencies

---

## 📦 Installation

### 1. Install Dependencies

```bash
npm install
```

This will install:
- Next.js, React, TypeScript
- NextAuth.js (authentication)
- Prisma (database)
- Resend (email)
- Puppeteer (PDF generation)
- Vercel Blob (file storage)
- PostHog (analytics)
- DocuSign SDK
- UI libraries (Framer Motion, Lucide, etc.)

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/investor_room"

# NextAuth
NEXTAUTH_URL="http://localhost:3011"
NEXTAUTH_SECRET="your-secret-key-here" # Generate with: openssl rand -base64 32

# Resend (Email Service)
RESEND_API_KEY="re_xxxxxxxxxxxxx"

# Vercel Blob (File Storage)
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_xxxxxxxxxxxxx"

# PostHog (Analytics)
NEXT_PUBLIC_POSTHOG_KEY="phc_xxxxxxxxxxxxx"
NEXT_PUBLIC_POSTHOG_HOST="https://app.posthog.com" # or your self-hosted URL

# DocuSign
DOCUSIGN_INTEGRATION_KEY="your-integration-key"
DOCUSIGN_USER_ID="your-user-id"
DOCUSIGN_ACCOUNT_ID="your-account-id"
DOCUSIGN_RSA_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----"
DOCUSIGN_BASE_PATH="https://demo.docusign.net" # or "https://www.docusign.net" for production

# Optional: Sentry (Error Monitoring)
SENTRY_DSN="https://xxxxx@xxxxx.ingest.sentry.io/xxxxx"
```

---

## 🔑 Service Setup

### 1. Resend (Email Service)

1. Sign up at [resend.com](https://resend.com)
2. Create an API key
3. Verify your domain (optional, but recommended)
4. Add `RESEND_API_KEY` to `.env.local`

**Free Tier:** 3,000 emails/month

---

### 2. Vercel Blob (File Storage)

1. If deploying on Vercel, Blob is automatically available
2. Go to your Vercel project → Settings → Storage
3. Create a Blob store
4. Get the read/write token
5. Add `BLOB_READ_WRITE_TOKEN` to `.env.local`

**Alternative:** If not using Vercel, consider AWS S3 or Supabase Storage

---

### 3. PostHog (Analytics)

1. Sign up at [posthog.com](https://posthog.com)
2. Create a new project
3. Get your API key from Project Settings
4. Add `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` to `.env.local`

**Free Tier:** 1M events/month

**Self-hosted Option:** Available if you prefer

---

### 4. DocuSign (E-Signatures)

1. Create a DocuSign Developer account at [developers.docusign.com](https://developers.docusign.com)
2. Create an Integration (App)
3. Generate RSA key pair:
   ```bash
   openssl genrsa -out private.key 2048
   openssl rsa -in private.key -pubout -out public.key
   ```
4. Add public key to your DocuSign Integration
5. Get Integration Key, User ID, Account ID
6. Add all DocuSign variables to `.env.local`

**Note:** Start with Demo environment, then move to Production

---

### 5. Database Setup

1. Ensure PostgreSQL is running (or use Supabase/Neon)
2. Update `DATABASE_URL` in `.env.local`
3. Run Prisma migrations:
   ```bash
   npx prisma migrate dev --name init
   ```
4. Generate Prisma Client:
   ```bash
   npx prisma generate
   ```

---

### 6. NextAuth Secret

Generate a secure secret:

```bash
openssl rand -base64 32
```

Add to `.env.local` as `NEXTAUTH_SECRET`

---

## 🗄️ Database Schema

The Prisma schema is defined in `prisma/schema.prisma`. After setting up your database:

1. Review the schema in `docs/requirements.md` (Phase 1.1)
2. Create the schema file: `prisma/schema.prisma`
3. Run migrations:
   ```bash
   npx prisma migrate dev
   ```
4. (Optional) Seed initial data:
   ```bash
   npx prisma db seed
   ```

---

## 🚀 Development Setup

### 1. Start Development Server

```bash
npm run dev
```

Visit: [http://localhost:3011](http://localhost:3011)

### 2. Database Studio (Optional)

View and edit database:

```bash
npx prisma studio
```

---

## ✅ Verification Checklist

- [ ] All dependencies installed
- [ ] `.env.local` file created with all variables
- [ ] Resend API key configured
- [ ] Vercel Blob token configured (or alternative)
- [ ] PostHog API key configured
- [ ] DocuSign credentials configured
- [ ] Database connection working
- [ ] Prisma schema created and migrated
- [ ] NextAuth secret generated
- [ ] Development server starts without errors

---

## 🐛 Troubleshooting

### Puppeteer Issues

If Puppeteer fails to install or run:

```bash
# Install Chromium dependencies (macOS)
brew install chromium

# Or use Puppeteer with bundled Chromium
npm install puppeteer --save
```

### NextAuth Issues

- Ensure `NEXTAUTH_URL` matches your development URL
- Check that `NEXTAUTH_SECRET` is set
- Verify Prisma adapter is configured correctly

### DocuSign Issues

- Ensure you're using the correct environment (demo vs production)
- Verify RSA key format (must include `\n` for newlines)
- Check that Integration Key matches your app

---

## 📚 Next Steps

After setup is complete:

1. ✅ Review [Development Requirements](./requirements.md)
2. ✅ Begin Sprint 1: Foundation & Infrastructure
3. ✅ Implement database schema
4. ✅ Set up NextAuth with OTP
5. ✅ Create basic UI components

---

**Last Updated:** 2025-01-XX  
**Status:** Ready for Development

