# Investor Room — Feature Specification

**Version:** 2.0  
**Status:** Feature Shaping & Requirements

---

## 🎯 Product Vision

The Investor Room is a **product within a product** — a private, premium, secure space where investors can:

1. **Validate conviction** — Access real metrics and data
2. **Review sensitive documents** — Cap table, P&L, roadmap
3. **Sign SAFE agreements** — Streamlined legal process
4. **Join the inner circle** — First Believer Kit unlock

**Goal:** Convert interest → conviction → investment with a YC/Carta/DocSend Pro-level experience.

---

## 🔐 Access Philosophy: "Friction Progressive"

### Stage 1: Zero Friction (Public Landing)
- **URL:** `investors.getrandomtrip.com`
- **Access:** Completely open
- **Content:** Hero video, teaser deck, "Why Now/Why Us"
- **CTA:** Book Founders Call
- **No OTP required** — maximize top of funnel

### Stage 2: Human Validation (Founder Call)
- **Format:** Google Meet
- **Purpose:** Confirm fit, intent, ticket size, decision cycle
- **Action:** Founder manually approves → sends Magic Link
- **Security:** Prevents competitors and curious browsers

### Stage 3: High Security (Investor Room)
- **URL:** `investors.getrandomtrip.com/room`
- **Access:** OTP Passwordless
- **Why OTP here?**
  - Protects sensitive data (Cap Table, Economics, Roadmap)
  - Increases conversion before close
  - Creates exclusivity ("this is worth protecting")
  - DocSend-like traceability
  - Implicit NDA effect

---

## 📦 Feature Modules

### Module A: Metrics Dashboard — "The Pulse"

**Purpose:** Simple, editorial, trustworthy metrics panel

**Metrics:**
- CAC (Customer Acquisition Cost)
- LTV (Lifetime Value)
- Monthly Revenue
- Burn Rate
- Runway (months)
- Active Trippers
- Planner Conversions
- XSE Sunday Drop Performance

**Design:**
- Clean charts (manual/semi-automated updates)
- Editorial style (not noisy)
- Human-reviewed data only
- Weekly/semi-weekly updates

**Warning:** Never expose unvalidated metrics.

---

### Module B: Legal Center — The Data Room

**Purpose:** Secure document viewing with full audit trail

**Documents:**
- SAFE Template
- Estatutos (Bylaws)
- Cap Table Snapshot
- Technical Roadmap 2025-2026
- Consolidated P&L
- Due Diligence Essentials (folder)

**Security Features:**
- PDF.js viewer (no download)
- Dynamic watermarks: "Confidencial — generado para: [email] — [timestamp]"
- Right-click disabled
- Anti-print (browser-dependent)
- Access logs (who viewed what, when, how long)

**UX:**
- Document grid/list view
- Click to view in embedded viewer
- Watermark overlay visible
- No download button

---

### Module C: SAFE Generator — Gamified Legal Closure

**Purpose:** Streamlined SAFE generation and signing

**Flow:**
1. Investor enters investment amount
2. Preview SAFE with terms (Cap, Discount, MFN)
3. Generate personalized PDF
4. Send to DocuSign
5. Track signature status
6. Auto-unlock First Believer Kit on signature

**Features:**
- Amount input
- Optional: Valuation Cap, Discount Rate
- MFN (Most Favored Nation) toggle
- Real-time preview
- PDF generation
- DocuSign integration
- Status tracking: Generated → Pending Signature → Signed

**Legal:**
- DocuSign is 100% valid for Delaware (confirmed)

---

### Module D: First Believer Kit — Unlock System

**Purpose:** Reward and engage signed investors

**Unlock Trigger:** SAFE document signed

**Unlocked Content:**
1. **Personal Letter from Founder** — Santiago Senega's message
2. **Digital Certificate** — Downloadable, shareable
3. **Community Room Access** — Exclusive investor community
4. **Early Build Access** — Pre-release features
5. **Investor Meet 2026 Invitation** — Annual event

**UX:**
- Micro-transition animation
- Confetti effect
- Subtle sound effect (optional)
- Should feel like an achievement

---

## 🔧 Technical Requirements

### Authentication
- **Method:** OTP Passwordless
- **OTP Expiry:** 10 minutes
- **Session Expiry:** 15 minutes
- **Rate Limiting:** 1 request per 60 seconds
- **Options:** Firebase Auth, Supabase, Auth0, or custom

### Frontend
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind + Shadcn
- **Animations:** Framer Motion
- **Conditional Rendering:** Based on auth state

### Backend
- **API:** Next.js API Routes
- **Database:** Supabase/PostgreSQL
- **SAFE Generation:** Dynamic PDF generation
- **DocuSign:** Webhook integration
- **Audit Logs:** Real-time access tracking

### Security
- **Anti-indexing:** robots.txt
- **Dynamic Watermarks:** Server-side generation
- **Anti-screenshot:** JS overlay (partial protection)
- **Monitoring:** Sentry for errors
- **Alerts:** Unusual access patterns

---

## 📊 Analytics (DocSend-like)

**Track Every Action:**
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
- Mixpanel
- Vercel Analytics

**Use Case:**
Intelligent follow-ups:
> "I saw you reviewed the Cap Table and SAFE. Would you like a clarification call?"

---

## 🎨 UX/UI Guidelines

### Inspiration
- The Overnightist
- Carta
- DocSend Premium

### Style
- Editorial
- Minimalist
- Lots of white space
- Serif + Sans-serif typography
- High-res photos
- RandomTrip palette: Azul Confianza (#0A2240) + Terracota (#D2691E)

### Copy
- Brief, confident, warm, professional
- Examples:
  - "Ingresar a la bóveda"
  - "Descargar SAFE generado"
  - "Firmar con DocuSign"

---

## 🗺️ User Journey Diagram

```
Investor Landing
    ↓
Founder Call (Google Meet)
    ↓
Magic Link Sent (Manual)
    ↓
OTP Gate
    ↓
Investor Room
    ├── Metrics Dashboard
    ├── Legal Center
    ├── SAFE Generator
    └── First Believer Kit (locked)
            ↓
    SAFE Signed
            ↓
    First Believer Kit (unlocked)
```

---

## ✅ Acceptance Criteria

### Landing Page
- [ ] Hero video autoplays (muted, loop)
- [ ] Teaser deck visible
- [ ] "Why Now/Why Us" section
- [ ] Calendar CTA works
- [ ] No OTP required

### OTP Gate
- [ ] Email input → OTP sent
- [ ] 6-digit code input
- [ ] 10-minute expiry
- [ ] Resend after 60s
- [ ] Session created on verify

### Metrics Dashboard
- [ ] All metrics displayed
- [ ] Clean, editorial design
- [ ] Last updated timestamp
- [ ] Activity logged

### Legal Center
- [ ] Document grid/list
- [ ] PDF viewer embedded
- [ ] Watermark visible
- [ ] No download
- [ ] Access logged

### SAFE Generator
- [ ] Amount input
- [ ] Terms preview
- [ ] PDF generation
- [ ] DocuSign integration
- [ ] Status tracking

### First Believer Kit
- [ ] Locked until SAFE signed
- [ ] Unlock animation
- [ ] All benefits accessible
- [ ] Certificate downloadable

---

## 🚫 Out of Scope (v1.0)

- Investor chat/forum (v2.0)
- Real-time metrics updates (manual for now)
- Multi-language support (Spanish only for now)
- Mobile app (web-only)
- Video calls within platform (external Google Meet)

---

## 📅 Timeline Estimate

- **Week 1-2:** Foundation (auth, database, basic UI)
- **Week 3-4:** Core modules (metrics, legal, SAFE)
- **Week 5-6:** First Believer Kit + Analytics
- **Week 7:** Testing, polish, launch

**Total:** ~7 weeks for MVP

---

**Last Updated:** 2025-01-XX  
**Next Review:** After architecture decision

