/**
 * Meeting Configuration
 *
 * Supports two integration methods:
 * 1. Direct Google Meet Link (simple, no API setup)
 * 2. Google Calendar API (advanced, automatic scheduling)
 *
 * See docs/GOOGLE-MEET-SETUP.md for complete setup instructions
 */

/**
 * Direct Google Meet Link (Option 1: Simplest)
 *
 * Get this from: https://meet.google.com/new
 * Or create a recurring Meet link for consistency
 */
export const GOOGLE_MEET_LINK =
  process.env.GOOGLE_MEET_LINK || 'https://meet.google.com';

/**
 * Google Calendar API Configuration (Option 2: Advanced)
 *
 * Requires OAuth 2.0 credentials obtained from OAuth Playground
 * See docs/GOOGLE-MEET-SETUP.md for setup instructions
 */
export const GOOGLE_CALENDAR_ENABLED =
  process.env.GOOGLE_CALENDAR_ENABLED === 'true';
export const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || 'primary';
export const FOUNDER_EMAILS = (
  process.env.FOUNDER_EMAIL || 'founder@randomtrip.com'
)
  .split(',')
  .map((s) => s.trim());
export const FOUNDER_EMAIL = FOUNDER_EMAILS[0];

/**
 * Get the Google Meet link from environment
 *
 * Falls back to default if not configured.
 * Used when Google Calendar API is not set up.
 */
export function getGoogleMeetLink(): string {
  const link = process.env.GOOGLE_MEET_LINK;
  if (link && link !== 'https://meet.google.com') {
    return link;
  }
  return 'https://meet.google.com';
}

/**
 * Get the meeting booking URL
 *
 * Returns either:
 * - Direct Meet link (if Calendar API not configured)
 * - API endpoint for creating meetings (if Calendar API is configured)
 */
export function getMeetingUrl(): string {
  if (GOOGLE_CALENDAR_ENABLED) {
    // Use Google Calendar API to create meeting
    return '/api/meetings/book';
  }

  // Direct Meet link
  return getGoogleMeetLink();
}
