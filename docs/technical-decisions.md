# Investor Room — Technical Decisions

**Version:** 1.1  
**Status:** Decisions Made ✅  
**Purpose:** Document technical choices and rationale

---

## 🔧 Decisions Required

### 1. Email Service

**Options:**
- **Resend** — Modern, developer-friendly, great DX
- **SendGrid** — Enterprise-grade, reliable, more complex
- **AWS SES** — Cost-effective, requires AWS setup

**Recommendation:** Resend
- Simple API
- Good free tier
- Built for transactional emails
- Easy OTP integration

**Decision:** ✅ **Resend**
- Simple API
- Good free tier (3,000 emails/month)
- Built for transactional emails
- Easy OTP integration

**Rationale:** Best developer experience, modern API, perfect for OTP emails

---

### 2. PDF Generation

**Options:**
- **PDFKit** — Node.js native, good for server-side
- **Puppeteer** — HTML to PDF, heavy but flexible
- **@react-pdf/renderer** — React-based, good for templates

**Recommendation:** PDFKit or @react-pdf/renderer
- PDFKit: Lightweight, good for SAFE documents
- @react-pdf/renderer: If we want React-based templates

**Decision:** ✅ **Puppeteer**
- HTML to PDF conversion
- Flexible for complex SAFE documents
- Can use React components as templates
- Good watermark support

**Rationale:** Most flexible option, allows using React components for PDF templates, better for complex documents

---

### 3. File Storage

**Options:**
- **AWS S3** — Industry standard, scalable
- **Supabase Storage** — If using Supabase for DB
- **Vercel Blob** — Simple, integrated with Vercel

**Recommendation:** Vercel Blob (if on Vercel) or S3
- Vercel Blob: Easiest if deploying on Vercel
- S3: More control, better for production scale

**Decision:** ✅ **Vercel Blob**
- Integrated with Vercel deployment
- Simple API
- Good performance
- Cost-effective

**Rationale:** Seamless integration with Vercel, simple setup, perfect for document storage

---

### 4. Analytics

**Options:**
- **PostHog** — Open-source, self-hostable, great features
- **Mixpanel** — Mature, enterprise features
- **Vercel Analytics** — Simple, built-in

**Recommendation:** PostHog
- Open-source option
- Great for product analytics
- Good free tier
- Self-hostable

**Decision:** ✅ **PostHog**
- Open-source option available
- Great for product analytics
- Good free tier
- Self-hostable if needed

**Rationale:** Best balance of features and cost, excellent for tracking investor behavior

---

### 5. DocuSign Integration

**Options:**
- **DocuSign eSignature API** — Official, comprehensive
- **Embedded Signing** — In-app experience
- **Remote Signing** — Email-based

**Recommendation:** DocuSign eSignature API with Embedded Signing
- Better UX (no email redirect)
- More control
- Still legally valid

**Decision:** ✅ **DocuSign eSignature API**
- Official API
- Embedded or Remote signing options
- Webhook support for status updates
- Legally valid for Delaware

**Rationale:** Official API provides flexibility for embedded or email-based signing

---

### 6. Session Management

**Options:**
- **JWT** — Stateless, scalable
- **Database Sessions** — More control, easier revocation

**Recommendation:** Database Sessions
- Better security (can revoke immediately)
- Easier to track active sessions
- Better for audit logs

**Decision:** ✅ **NextAuth.js**
- Built-in OTP support (Email provider)
- Session management included
- Database adapter for Prisma
- Secure by default
- Great Next.js integration

**Rationale:** Perfect fit for Next.js, handles OTP and sessions, integrates with Prisma

---

### 7. Authentication Provider

**Options:**
- **Custom OTP** — Full control, more work
- **Supabase Auth** — Built-in OTP, easy
- **Firebase Auth** — Google-backed, reliable
- **Auth0** — Enterprise features, overkill

**Recommendation:** Custom OTP or Supabase Auth
- Custom: Full control, matches requirements exactly
- Supabase: Faster setup, good if using Supabase for DB

**Decision:** ⏳ Pending

---

### 8. Database

**Options:**
- **PostgreSQL (Supabase)** — Managed, good DX
- **PostgreSQL (Self-hosted)** — More control
- **Same DB as main app** — Shared infrastructure

**Recommendation:** Same DB as main app (if possible)
- Shared infrastructure
- Easier data sync if needed
- Cost-effective

**Decision:** ⏳ Pending (assume same DB as main app)

---

## ✅ Decisions Made

### Summary

1. ✅ **Email Service:** Resend
2. ✅ **PDF Generation:** Puppeteer
3. ✅ **File Storage:** Vercel Blob
4. ✅ **Analytics:** PostHog
5. ✅ **DocuSign:** eSignature API (embedded or remote)
6. ✅ **Session Management:** NextAuth.js
7. ⏳ **Database:** Pending (assume same DB as main app)

---

## 📝 Decision Log

| Date | Decision | Rationale | Impact |
|------|----------|-----------|--------|
| 2025-01-XX | Resend for Email | Best DX, modern API, good free tier | Need Resend API key |
| 2025-01-XX | Puppeteer for PDF | Flexible, React component support | Larger bundle, need Chrome/Chromium |
| 2025-01-XX | Vercel Blob | Integrated with Vercel, simple | Need Vercel Blob token |
| 2025-01-XX | PostHog | Great analytics, good free tier | Need PostHog API key |
| 2025-01-XX | DocuSign API | Official, flexible signing options | Need DocuSign credentials |
| 2025-01-XX | NextAuth.js | Built-in OTP, Prisma adapter | Simplifies auth implementation |

---

**Last Updated:** 2025-01-XX  
**Next Review:** Before Sprint 1 start

