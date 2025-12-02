# Investor Room — Development Requirements

**Version:** 1.0  
**Status:** Ready for Development  
**Based on:** [Feature Specification](./investor-room-feature-spec.md)

---

## 📋 Overview

This document breaks down the feature specification into actionable development requirements, organized by priority, dependencies, and implementation phases.

---

## 🏗️ Phase 1: Foundation & Infrastructure

### 1.1 Database Schema (Prisma)

**Priority:** Critical  
**Dependencies:** None

**Models Required:**

```prisma
// Authentication & Access
model Investor {
  id            String   @id @default(cuid())
  email         String   @unique
  name          String?
  approved      Boolean  @default(false) // Manual approval after founder call
  approvedAt    DateTime?
  approvedBy    String?  // Founder email
  magicLinkSent Boolean  @default(false)
  magicLinkSentAt DateTime?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  sessions      Session[]
  accessLogs    AccessLog[]
  safeDocuments SafeDocument[]
  analytics     AnalyticsEvent[]
}

model Session {
  id        String   @id @default(cuid())
  investorId String
  token     String   @unique
  expiresAt DateTime
  createdAt DateTime @default(now())

  investor  Investor @relation(fields: [investorId], references: [id], onDelete: Cascade)

  @@index([token])
  @@index([expiresAt])
}

// OTP Management
model OtpCode {
  id        String   @id @default(cuid())
  email     String
  code      String   // 6-digit code
  expiresAt DateTime
  used      Boolean  @default(false)
  createdAt DateTime @default(now())

  @@index([email, code])
  @@index([expiresAt])
}

// Metrics
model Metric {
  id          String   @id @default(cuid())
  name        String   // "CAC", "LTV", "Monthly Revenue", etc.
  value       Float
  unit        String?  // "$", "%", "months", etc.
  period      String?  // "2025-01", "Q1 2025", etc.
  updatedAt   DateTime @default(now())
  updatedBy   String?  // Who updated (manual review)

  @@unique([name, period])
  @@index([name, updatedAt])
}

// Documents
model Document {
  id          String   @id @default(cuid())
  title       String
  type        DocumentType
  filePath    String   // S3 path or local path
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  accessLogs  AccessLog[]
}

enum DocumentType {
  SAFE_TEMPLATE
  BYLAWS
  CAP_TABLE
  ROADMAP
  P_L
  DUE_DILIGENCE
}

// SAFE Documents
model SafeDocument {
  id            String   @id @default(cuid())
  investorId    String
  amount        Float
  valuationCap  Float?
  discountRate  Float?
  mfn           Boolean  @default(false)
  pdfPath       String?
  docusignId    String?
  status        SafeStatus @default(GENERATED)
  generatedAt   DateTime @default(now())
  signedAt      DateTime?

  investor      Investor @relation(fields: [investorId], references: [id])

  @@index([investorId])
  @@index([status])
}

enum SafeStatus {
  GENERATED
  PENDING_SIGNATURE
  SIGNED
}

// Audit & Analytics
model AccessLog {
  id          String   @id @default(cuid())
  investorId  String?
  documentId  String?
  action      String   // "view_document", "view_metrics", "generate_safe", etc.
  ipAddress   String?
  userAgent   String?
  duration    Int?     // seconds
  metadata    Json?    // Additional context
  createdAt   DateTime @default(now())

  investor    Investor? @relation(fields: [investorId], references: [id])
  document    Document? @relation(fields: [documentId], references: [id])

  @@index([investorId, createdAt])
  @@index([documentId, createdAt])
  @@index([action, createdAt])
}

model AnalyticsEvent {
  id          String   @id @default(cuid())
  investorId  String?
  event       String   // "page_view", "document_opened", "safe_previewed", etc.
  properties  Json?
  ipAddress   String?
  userAgent   String?
  createdAt   DateTime @default(now())

  investor    Investor? @relation(fields: [investorId], references: [id])

  @@index([investorId, createdAt])
  @@index([event, createdAt])
}
```

**Tasks:**

- [ ] Create Prisma schema file
- [ ] Define all models and enums
- [ ] Set up database connection
- [ ] Run initial migration
- [ ] Seed initial data (test investor, sample documents)

---

### 1.2 Project Structure

**Priority:** Critical  
**Dependencies:** None

**Required Folders:**

```
investor-room/
├── app/
│   ├── (marketing)/          # Public landing (Stage 1)
│   │   └── page.tsx
│   ├── (app)/                # Protected routes (Stage 3)
│   │   ├── room/
│   │   │   ├── page.tsx      # Main dashboard
│   │   │   ├── metrics/
│   │   │   ├── legal/
│   │   │   ├── safe/
│   │   │   └── first-believer/
│   │   └── otp/
│   │       └── page.tsx      # OTP gate
│   └── api/
│       ├── auth/
│       │   ├── otp/
│       │   │   ├── send/route.ts
│       │   │   └── verify/route.ts
│       │   └── session/route.ts
│       ├── metrics/route.ts
│       ├── documents/
│       │   ├── route.ts
│       │   └── [id]/route.ts
│       ├── safe/
│       │   ├── generate/route.ts
│       │   └── [id]/route.ts
│       └── analytics/route.ts
├── components/
│   ├── app/
│   │   ├── metrics/
│   │   ├── legal/
│   │   ├── safe/
│   │   └── first-believer/
│   ├── marketing/
│   ├── auth/
│   └── ui/
├── lib/
│   ├── api/
│   ├── auth/
│   ├── helpers/
│   ├── types/
│   └── validation/
└── prisma/
```

**Tasks:**

- [ ] Create folder structure
- [ ] Set up route groups for marketing vs app
- [ ] Create placeholder components

---

### 1.3 Authentication System

**Priority:** Critical  
**Dependencies:** 1.1 (Database Schema)

**Requirements:**

1. **OTP Passwordless Auth**

   - Email input → send 6-digit OTP
   - OTP expiry: 10 minutes
   - Rate limiting: 1 request per 60 seconds per email
   - Session expiry: 15 minutes
   - Store sessions in database

2. **Magic Link System** (Manual)

   - Admin endpoint to send magic link
   - Link contains one-time token
   - Token expires after 24 hours
   - Auto-approves investor on link click

3. **Session Management** (NextAuth.js)
   - NextAuth.js with Email provider (OTP)
   - Prisma adapter for session storage
   - Middleware to protect `/room/*` routes
   - Redirect to OTP gate if not authenticated
   - 15-minute session expiry

**Tasks:**

- [ ] Install NextAuth.js and dependencies
- [ ] Configure NextAuth with Email provider
- [ ] Set up Prisma adapter
- [ ] Create auth configuration file
- [ ] Create auth middleware
- [ ] Create OTP UI component (NextAuth sign-in page)
- [ ] Configure Resend email provider
- [ ] Add rate limiting
- [ ] Test OTP flow

---

## 🎨 Phase 2: Public Landing (Stage 1)

### 2.1 Landing Page

**Priority:** High  
**Dependencies:** 1.2 (Project Structure)

**Requirements:**

- Hero video (autoplay, muted, loop)
- Teaser deck section
- "Why Now/Why Us" section
- Calendar CTA (Cal.com or similar)
- No authentication required
- Editorial design (serif + sans-serif)
- RandomTrip brand colors

**Tasks:**

- [ ] Create landing page layout
- [ ] Add hero video component
- [ ] Create teaser deck section
- [ ] Create "Why Now/Why Us" section
- [ ] Integrate calendar booking
- [ ] Style with brand colors
- [ ] Add responsive design

---

## 🔐 Phase 3: OTP Gate (Stage 3 Entry)

### 3.1 OTP Authentication Flow

**Priority:** Critical  
**Dependencies:** 1.3 (Authentication System)

**Requirements:**

- Email input form
- OTP code input (6 digits)
- Resend OTP button (60s cooldown)
- Error handling (invalid code, expired)
- Success → redirect to `/room`
- Loading states

**Tasks:**

- [ ] Create OTP page component
- [ ] Create email input form
- [ ] Create OTP input component (6 digits)
- [ ] Add resend functionality
- [ ] Add error states
- [ ] Add loading states
- [ ] Add success redirect

---

## 📊 Phase 4: Core Modules

### 4.1 Metrics Dashboard

**Priority:** High  
**Dependencies:** 1.1 (Database), 1.3 (Auth)

**Requirements:**

**Metrics to Display:**

- CAC (Customer Acquisition Cost)
- LTV (Lifetime Value)
- Monthly Revenue
- Burn Rate
- Runway (months)
- Active Trippers
- Planner Conversions
- XSE Sunday Drop Performance

**Features:**

- Clean, editorial design
- Charts (Recharts or similar)
- Last updated timestamp
- Manual data entry (admin panel)
- Access logging

**Tasks:**

- [ ] Create metrics dashboard page
- [ ] Create metric card components
- [ ] Create chart components
- [ ] Create admin API for updating metrics
- [ ] Add access logging
- [ ] Style with editorial design

---

### 4.2 Legal Center (Data Room)

**Priority:** High  
**Dependencies:** 1.1 (Database), 1.3 (Auth)

**Requirements:**

**Documents:**

- SAFE Template
- Estatutos (Bylaws)
- Cap Table Snapshot
- Technical Roadmap 2025-2026
- Consolidated P&L
- Due Diligence Essentials (folder)

**Security Features:**

- PDF.js embedded viewer
- Dynamic watermarks (email + timestamp)
- Right-click disabled
- Anti-print (browser-dependent)
- No download button
- Access logs (who, what, when, duration)

**Tasks:**

- [ ] Create document list/grid view
- [ ] Integrate PDF.js viewer
- [ ] Create watermark generation (server-side)
- [ ] Add right-click disable
- [ ] Add access logging
- [ ] Create document detail page
- [ ] Add scroll depth tracking

---

### 4.3 SAFE Generator

**Priority:** High  
**Dependencies:** 1.1 (Database), 1.3 (Auth), 4.2 (Legal Center)

**Requirements:**

**Flow:**

1. Investor enters investment amount
2. Optional: Valuation Cap, Discount Rate
3. MFN toggle
4. Preview SAFE with terms
5. Generate personalized PDF
6. Send to DocuSign
7. Track signature status
8. Auto-unlock First Believer Kit on signature

**Features:**

- Amount input with validation
- Terms preview
- PDF generation (PDFKit or similar)
- DocuSign integration
- Status tracking
- Webhook handler for DocuSign events

**Tasks:**

- [ ] Create SAFE generator form
- [ ] Create terms preview component
- [ ] Create PDF generation service
- [ ] Integrate DocuSign API
- [ ] Create DocuSign webhook handler
- [ ] Create status tracking UI
- [ ] Add validation
- [ ] Link to First Believer Kit unlock

---

### 4.4 First Believer Kit

**Priority:** Medium  
**Dependencies:** 4.3 (SAFE Generator)

**Requirements:**

**Unlock Trigger:** SAFE document signed

**Unlocked Content:**

1. Personal Letter from Founder
2. Digital Certificate (downloadable)
3. Community Room Access (placeholder)
4. Early Build Access (placeholder)
5. Investor Meet 2026 Invitation

**UX:**

- Locked state (visual lock)
- Unlock animation (confetti, micro-transitions)
- Subtle sound effect (optional)
- Achievement feel

**Tasks:**

- [ ] Create First Believer Kit page
- [ ] Create locked state UI
- [ ] Create unlock animation
- [ ] Create certificate generation
- [ ] Add confetti effect
- [ ] Create content sections
- [ ] Add download functionality

---

## 📈 Phase 5: Analytics & Monitoring

### 5.1 Analytics Integration

**Priority:** Medium  
**Dependencies:** All modules

**Requirements:**

**Track:**

- Email address
- Date/time
- IP address
- Total time in room
- Time per module
- Documents opened
- SAFE preview > 10s (key event)
- Scroll depth

**Tools:**

- PostHog (recommended)
- Mixpanel (alternative)
- Vercel Analytics (supplementary)

**Tasks:**

- [ ] Set up PostHog
- [ ] Create analytics helper functions
- [ ] Add event tracking to all modules
- [ ] Create analytics dashboard (admin)
- [ ] Add intelligent follow-up triggers

---

### 5.2 Security & Monitoring

**Priority:** High  
**Dependencies:** All modules

**Requirements:**

- Anti-indexing (robots.txt)
- Dynamic watermarks (server-side)
- Anti-screenshot (JS overlay - partial)
- Sentry for error monitoring
- Alerts for unusual access patterns
- Rate limiting on all API routes

**Tasks:**

- [ ] Configure robots.txt
- [ ] Set up Sentry
- [ ] Add rate limiting middleware
- [ ] Create access pattern monitoring
- [ ] Add alert system
- [ ] Implement anti-screenshot overlay

---

## 🎯 Implementation Priority

### Sprint 1 (Week 1-2): Foundation

1. Database schema & Prisma setup
2. Project structure
3. Authentication system (OTP)
4. Basic UI components (Shadcn)

### Sprint 2 (Week 3-4): Core Features

1. Landing page
2. OTP gate
3. Metrics dashboard
4. Legal center (basic)

### Sprint 3 (Week 5-6): Advanced Features

1. SAFE generator
2. First Believer Kit
3. Analytics integration
4. Security hardening

### Sprint 4 (Week 7): Polish & Launch

1. Testing
2. Bug fixes
3. Performance optimization
4. Documentation
5. Deployment

---

## 🔧 Technical Decisions ✅

**All decisions made — see [Technical Decisions](./technical-decisions.md)**

1. ✅ **Email Service:** Resend
2. ✅ **PDF Generation:** Puppeteer
3. ✅ **File Storage:** Vercel Blob
4. ✅ **Analytics:** PostHog
5. ✅ **DocuSign:** eSignature API
6. ✅ **Session Management:** NextAuth.js

---

## 📝 Next Steps

1. Review and approve this requirements document
2. Make technical decisions (see above)
3. Set up database and Prisma
4. Begin Sprint 1 implementation
5. Weekly progress reviews

---

**Last Updated:** 2025-01-XX  
**Next Review:** After technical decisions
