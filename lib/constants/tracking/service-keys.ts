// Google Tag Manager container ID (e.g. GTM-XXXXXXX) — same for main site and investor room; filter by Page Hostname in GTM
export const GTM_ID =
  typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_GTM_ID ?? '' : '';
