# GTM: same container for main site and investor room

Use one Google Tag Manager container for **getrandomtrip.com** and **investors.getrandomtrip.com** (this app). Filter by **Page Hostname** in GTM to segment traffic.

---

## Setup in this repo (investor-room)

This repo already includes:

| File                                     | Purpose                                                                    |
| ---------------------------------------- | -------------------------------------------------------------------------- |
| `lib/constants/tracking/service-keys.ts` | `GTM_ID` from `NEXT_PUBLIC_GTM_ID`                                         |
| `lib/helpers/tracking/gtm.ts`            | `dataLayer` push, `trackPageview`, `setUser`, etc.                         |
| `components/tracking/AppTracking.tsx`    | GTM script + noscript iframe; page_view + set_user on route/session change |

**Root layout** (`app/layout.tsx`): `<AppTracking />` is rendered inside `<SessionProvider>`.

## Environment

Add to `.env` (same container ID as getrandomtrip):

```env
NEXT_PUBLIC_GTM_ID="GTM-XXXXXXX"
```

Use the **same** value as the main site. No other GTM env vars needed; filter by **Page Hostname** in GTM.

## GTM: filter by hostname

- Enable the built-in variable **Page Hostname** (Variables → Configure → Page Hostname).
- In triggers or tags, use **Page Hostname** to filter (e.g. `equals` `investors.getrandomtrip.com` for this app vs `getrandomtrip.com` for the main site).
- In GA4 you can create a custom dimension from the hostname if needed.

## GTM and GA4: how data reaches GA

**GTM does not send data to GA by itself.** It runs _tags_. You need two kinds of tags for GA4:

1. **GA4 Configuration tag**

   - Loads the GA4 script (gtag.js) and sets your Measurement ID (e.g. `G-XXXXXXXXXX`).
   - Fires on **All Pages** (or a trigger that includes your site).
   - Sends the default **page_view** and establishes the GA session. No extra setup needed for basic page views once this tag is there.

2. **GA4 Event tags** (one per custom event you want in GA)
   - Each tag sends **one event** to GA4 (e.g. `click_button`, `scroll_depth`, `form_submit`).
   - **Trigger:** Custom Event, matching the `event` name you push to `dataLayer` (e.g. `scroll_depth`).
   - **Event name:** Same as in dataLayer (e.g. `scroll_depth`).
   - **Event parameters:** Map dataLayer fields (e.g. `page_path`, `depth_percent`, `label`) so they appear in GA4.

So: the app pushes to `dataLayer`; GTM’s **GA4 Configuration tag** sends page_view (and loads GA); **GA4 Event tags** send your custom events when their triggers fire. Both are needed if you want custom events (clicks, scroll depth, forms) in GA4.

## Reference

Original setup doc: **getrandomtrip** repo → `docs/GTM_MULTI_SITE.md`.
