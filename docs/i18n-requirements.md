# i18n Requirements – Investor Room

Shaping requirements before implementation. Adjust and confirm, then we implement.

---

## 1. Locales

| Question | Options | Recommendation |
|----------|---------|----------------|
| **Which languages?** | e.g. `en`, `es`, `pt`, `fr` | Define initial set (e.g. **en** + **es**). |
| **Default locale** | Usually primary market | **en** (or your primary). |
| **Locale codes** | `en` / `en-US`, `es` / `es-ES` | Short codes (**en**, **es**) unless you need region-specific content. |

**Decision:**  
- Locales: **en**, **es**  
- Default: **es**  

---

## 2. Routing strategy

| Approach | URL examples | Pros | Cons |
|----------|--------------|------|------|
| **Sub-path for all** | `/en/`, `/es/room`, `/es/admin` | Clear, SEO-friendly, consistent | Every route under `[locale]` |
| **Default locale without prefix** | `/` = en, `/es/`, `/es/room` | Shorter URLs for default | Slightly more logic in middleware/routing |
| **Domain per locale** | `investor.randomtrip.com` vs `es.randomtrip.com` | Strong for multi-region brands | DNS + config; often later phase |

**Next.js fit:**  
- App Router uses a **dynamic segment** `[locale]` (e.g. `app/[locale]/(marketing)/page.tsx`).  
- Next.js docs suggest **sub-path for all** or **prefixless default + sub-path for others** (via middleware redirect).

**Decision:**  
- [x] Default without prefix: `/` = default locale (es), `/en/...` for English  
- [ ] Sub-path for all: `/en/...`, `/es/...`  

---

## 3. Implementation approach

| Option | Description | When to use |
|--------|-------------|-------------|
| **A) Next.js built-in (dictionaries)** | `getDictionary(locale)`, JSON files, `app/[locale]/...`. No extra lib. | Minimal deps, full control, RSC-only or simple client usage. |
| **B) next-intl** | Library + plugin + middleware. `useTranslations()` / `getTranslations()`, rich formatting. | Need formatting (dates, numbers), pluralization, and shared client/server usage. |

**Decision:**  
- [x] **A) Built-in** – dictionaries + `[locale]` segment (fits Phase 1 marketing scope)  
- [ ] **B) next-intl** – full-featured i18n  

---

## 4. Scope (what to translate first)

| Area | Routes | Priority |
|------|--------|----------|
| **Marketing** | `(marketing)/` | Usually first (public, SEO) |
| **Authenticated app** | `(app)/room/*` | High (investor-facing) |
| **Admin** | `admin/` | Medium (internal) |
| **Onboarding / OTP** | `onboarding/`, `otp/` | High (part of funnel) |
| **API responses** | `app/api/` | Optional (e.g. error messages) |

**Decision:**  
- Phase 1: **Marketing** (nav, footer, paragraph, how-it-works, locale switcher)  
- Phase 2: Room, admin, onboarding/OTP copy  

---

## 5. Locale detection and persistence

| Question | Options |
|----------|--------|
| **Initial locale** | `Accept-Language` header, or always default, or geo? |
| **User override** | Locale switcher (e.g. in nav) that sets cookie and redirects? |
| **Persistence** | Cookie (e.g. `NEXT_LOCALE`) so next visit keeps preference? |

**Decision:**  
- First visit: **Accept-Language** header (then cookie if set)  
- Switcher: **Yes** – world icon with dropdown (Español / English)  
- Cookie name: **NEXT_LOCALE**  

---

## 6. Technical constraints (this repo)

- **Route structure:** `(app)/`, `(marketing)/`, `admin/`, `onboarding/`, `otp/`, `api/`.  
- **Port:** 3011.  
- **Conventions:** RSC by default, minimal client; types in `lib/types/`; no Prisma in UI.

After i18n, we will:

1. Introduce `app/[locale]/` and move current route groups/pages under it (or use middleware so default locale has no prefix).  
2. Add a small i18n layer: either **dictionaries + `getDictionary`** or **next-intl** (with `NextIntlClientProvider` only where needed).  
3. Add `generateStaticParams` for `[locale]` where static generation is desired.  
4. Set `<html lang={locale}>` in root layout.

---

## 7. Checklist before implementation

- [x] Locales and default chosen (section 1)  
- [x] Routing strategy chosen (section 2)  
- [x] Approach A or B chosen (section 3)  
- [x] Scope / phases agreed (section 4)  
- [x] Locale detection and switcher decided (section 5)  

**Implemented:** Middleware (rewrite/redirect + cookie), `app/[locale]/` structure, dictionaries (es/en), `getDictionary` + `pathForLocale`, LocaleSwitcher (world icon + dropdown), marketing Phase 1 wired (Navbar, Footer, Paragraph, HowItWorks).
