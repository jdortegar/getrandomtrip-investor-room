/**
 * Google Calendar API Helper
 *
 * Creates Google Calendar events with Google Meet links using OAuth 2.0
 *
 * Setup (see docs/GOOGLE-MEET-SETUP.md):
 * 1. Enable Google Calendar API in Google Cloud Console
 * 2. Create OAuth 2.0 credentials (Web application)
 * 3. Get refresh token using OAuth Playground
 * 4. Set environment variables:
 *    - GOOGLE_CLIENT_ID
 *    - GOOGLE_CLIENT_SECRET
 *    - GOOGLE_REFRESH_TOKEN (from OAuth Playground)
 *    - GOOGLE_CALENDAR_ID (optional, defaults to 'primary')
 */

interface CreateMeetingOptions {
  summary: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  attendeeEmail?: string;
}

interface MeetingResponse {
  meetingLink: string;
  calendarEventLink: string;
  eventId: string;
}

interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope?: string;
}

/**
 * Get OAuth access token using refresh token
 *
 * Uses the refresh token obtained from OAuth Playground to get a new access token.
 * Access tokens expire after 1 hour, so we refresh them as needed.
 */
async function getAccessToken(): Promise<string> {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      'Google Calendar credentials not configured. Please set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN. See docs/GOOGLE-MEET-SETUP.md',
    );
  }

  // Validate refresh token format (should start with "1//")
  if (!refreshToken.startsWith('1//')) {
    throw new Error(
      'Invalid refresh token format. Refresh tokens from OAuth Playground should start with "1//". See docs/GOOGLE-MEET-SETUP.md',
    );
  }

  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to get access token: ${response.status} ${errorText}. Check your refresh token and credentials.`,
      );
    }

    const data: TokenResponse = await response.json();

    if (!data.access_token) {
      throw new Error('No access token in response');
    }

    return data.access_token;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error getting access token');
  }
}

/**
 * Create a Google Calendar event with Google Meet link
 *
 * @param options - Meeting configuration
 * @returns Meeting details including Meet link and calendar event link
 */
export async function createMeetingWithMeetLink(
  options: CreateMeetingOptions,
): Promise<MeetingResponse> {
  const accessToken = await getAccessToken();
  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

  // Create calendar event with Google Meet conference
  const event = {
    summary: options.summary,
    description: options.description || 'Founder call with RandomTrip investor',
    start: {
      dateTime: options.startTime.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
    },
    end: {
      dateTime: options.endTime.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
    },
    conferenceData: {
      createRequest: {
        requestId: `meet-${Date.now()}-${Math.random()
          .toString(36)
          .substring(7)}`,
        conferenceSolutionKey: {
          type: 'hangoutsMeet',
        },
      },
    },
    attendees: options.attendeeEmail
      ? [{ email: options.attendeeEmail }]
      : undefined,
  };

  try {
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?conferenceDataVersion=1`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to create calendar event: ${response.status} ${errorText}`,
      );
    }

    const data = await response.json();

    const meetLink = data.conferenceData?.entryPoints?.[0]?.uri;
    if (!meetLink) {
      throw new Error('No Google Meet link in response');
    }

    return {
      meetingLink: meetLink,
      calendarEventLink: data.htmlLink || '',
      eventId: data.id || '',
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error creating meeting');
  }
}

/**
 * Check if Google Calendar API is configured
 *
 * Verifies that all required OAuth credentials are set.
 * These should be obtained from OAuth Playground (see docs/GOOGLE-MEET-SETUP.md).
 */
export function isGoogleCalendarConfigured(): boolean {
  return !!(
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.GOOGLE_REFRESH_TOKEN
  );
}
