# Tracking metrics — what to measure

Recommended GTM/GA4 metrics for the investor room and how they’re implemented.

---

## Already implemented

| Metric           | Event          | Where                        | Purpose                                        |
| ---------------- | -------------- | ---------------------------- | ---------------------------------------------- |
| **Page view**    | `page_view`    | AppTracking (every route)    | Path, sessions, entry/exit                     |
| **User ID**      | `set_user`     | AppTracking (when logged in) | Cross-session identity                         |
| **Button click** | `click_button` | Button (`trackLabel` prop)   | CTAs, actions                                  |
| **Scroll depth** | `scroll_depth` | ScrollDepthTracker (layout)  | Engagement on long pages (25%, 50%, 75%, 100%) |

---

## Important metrics to add

### 1. Scroll depth (done)

- **Event:** `scroll_depth` — `page_path`, `depth_percent` (25, 50, 75, 100).
- **Use:** See how far users scroll on marketing and room pages; compare sections and pages.
- **Implementation:** `ScrollDepthTracker` in root layout; `trackScrollDepth(page_path, depth_percent)` in `lib/helpers/tracking/gtm.ts`.

### 2. Section / content visibility

- **Event:** `section_view` — `page_path`, `section_id`.
- **Use:** Which sections are seen (Hero, Metrics, Legal, etc.); prioritize content.
- **Implementation:** Call `trackSectionView(page_path, section_id)` when a section enters view (e.g. `IntersectionObserver` on marketing sections). Optional: `useSectionView(sectionId)` hook or wrapper per section.

### 3. Funnel steps

- **Events:** Keep `page_view`; optionally add explicit steps, e.g. `funnel_step` with `step` and `page_path`.
- **Use:** Landing → Book meeting click → OTP start → OTP success → Room entry. Compare drop-off between steps.
- **Implementation:** `trackButtonClick` on key CTAs (e.g. “Book meeting”, “Enviar enlace”) plus `page_view` for OTP and /room. In GTM/GA4, build funnel from these events.

### 4. Form start / submit

- **Events:** `form_start`, `form_submit` — `form_name`, optional `page_path`.
- **Use:** OTP form, book-meeting form: how many start vs submit; which forms convert.
- **Implementation:** `trackFormStart('otp')` on first focus or first change; `trackFormSubmit('otp')` in submit handler. Same for book-meeting form.

### 5. Outbound / external links

- **Use:** Clicks to Google Calendar, DocuSign, external docs. Understand which CTAs are used.
- **Implementation:** Either `trackButtonClick` with a label (e.g. “open_google_calendar”) on those buttons, or a small wrapper/link component that fires a generic `outbound_click` (url + label) and use that in GTM.

### 6. Time on page (GA4)

- **Use:** Engagement time per page or per section. Usually handled by GA4 automatically if GA4 is loaded via GTM; no extra app code needed.

### 7. Video engagement (if you add video)

- **Events:** e.g. `video_start`, `video_progress` (25%, 50%, 75%), `video_complete`.
- **Use:** Hero or explainer video: watch rate and completion.
- **Implementation:** Add event types and helpers in `gtm.ts`; fire from video player `onPlay`, `onTimeUpdate`, `onEnded`.

---

## Event reference (`lib/helpers/tracking/gtm.ts`)

| Helper              | Event                 | Parameters                                     |
| ------------------- | --------------------- | ---------------------------------------------- |
| `trackPageview`     | `page_view`           | `page_path`                                    |
| `trackScrollDepth`  | `scroll_depth`        | `page_path`, `depth_percent` (25, 50, 75, 100) |
| `trackSectionView`  | `section_view`        | `page_path`, `section_id`                      |
| `trackButtonClick`  | `click_button`        | `label`                                        |
| `trackFormStart`    | `form_start`          | `form_name`, optional `page_path`              |
| `trackFormSubmit`   | `form_submit`         | `form_name`, optional `page_path`              |
| `setUser`           | `set_user`            | `user_id`                                      |
| `setUserProperties` | `set_user_properties` | `user_type`                                    |
| `trackSignUp`       | `sign_up`             | `method`                                       |
| `trackPurchase`     | `purchase`            | transaction fields                             |
| `trackCustomEvent`  | (any)                 | custom payload                                 |

---

## GTM / GA4 setup

- **Scroll depth:** In GTM, create a trigger on Custom Event `scroll_depth`; optionally create GA4 events or dimensions from `depth_percent` and `page_path`.
- **Funnels:** Build in GA4 from `page_view` + `click_button` (and optional `form_start` / `form_submit`) by step URL or event label.
- **Filter by site:** Use **Page Hostname** (e.g. `investors.getrandomtrip.com`) so investor-room traffic is separate from the main site. See `docs/GTM_MULTI_SITE.md`.
