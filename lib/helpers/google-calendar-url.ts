/**
 * Google Calendar URL Helper
 *
 * Creates Google Calendar "Add Event" URLs that open Google Calendar
 * with a pre-filled event, allowing users to pick their preferred time.
 */

interface CreateCalendarEventOptions {
  title: string;
  description?: string;
  duration?: number; // in minutes, default 30
  location?: string; // Google Meet link or location
  attendees?: string[]; // email addresses
}

/**
 * Create a Google Calendar "Add Event" URL
 *
 * This opens Google Calendar with a pre-filled event where users can:
 * - Pick their preferred date and time
 * - Add the event to their calendar
 * - Get a Google Meet link automatically (if using Google Calendar)
 *
 * @param options - Event details
 * @returns Google Calendar URL
 */
export function createGoogleCalendarUrl(
  options: CreateCalendarEventOptions,
): string {
  const {
    title,
    description = '',
    duration = 30,
    location = '',
    attendees = [],
  } = options;

  // Google Calendar URL format
  const baseUrl = 'https://calendar.google.com/calendar/render';

  // Build query parameters
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    details: description,
    ...(location && { location }),
    ...(attendees.length > 0 && { add: attendees.join(',') }),
  });

  // Note: We don't set dates here - let user pick in Google Calendar
  // If you want to suggest a default time, you can add:
  // dates=YYYYMMDDTHHmmssZ/YYYYMMDDTHHmmssZ

  return `${baseUrl}?${params.toString()}`;
}

/**
 * Create a Google Calendar URL for a founder call
 *
 * @param email - Investor email (optional, for attendee)
 * @param name - Investor name (optional)
 * @returns Google Calendar URL
 */
export function createFounderCallCalendarUrl(
  email?: string,
  name?: string,
): string {
  const title = 'Founder Call: RandomTrip Investor Room';
  const description = name
    ? `Founder call with ${name}${email ? ` (${email})` : ''}`
    : email
    ? `Founder call with ${email}`
    : 'Founder call with RandomTrip';

  return createGoogleCalendarUrl({
    title,
    description,
    duration: 30,
    attendees: email ? [email] : [],
  });
}
