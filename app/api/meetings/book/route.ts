import { NextRequest, NextResponse } from 'next/server';
import {
  createMeetingWithMeetLink,
  isGoogleCalendarConfigured,
} from '@/lib/helpers/google-calendar';
import { getGoogleMeetLink } from '@/lib/constants/meeting';

/**
 * POST /api/meetings/book
 *
 * Creates a Google Calendar event with Google Meet link
 *
 * Setup: Requires OAuth 2.0 credentials from OAuth Playground
 * See docs/GOOGLE-MEET-SETUP.md for setup instructions
 *
 * Body:
 * {
 *   email: string (investor email, required)
 *   name?: string (investor name, optional)
 *   preferredDate?: string (ISO date string, e.g., "2025-12-15")
 *   preferredTime?: string (time in HH:mm format, e.g., "14:00")
 * }
 *
 * Response:
 * {
 *   meetingLink: string (Google Meet URL)
 *   calendarEventLink?: string (Google Calendar event URL)
 *   eventId?: string (Calendar event ID)
 *   message?: string (informational message)
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, preferredDate, preferredTime } = body;

    // Validate required fields
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required and must be a string' },
        { status: 400 },
      );
    }

    // Check if Google Calendar API is configured
    if (!isGoogleCalendarConfigured()) {
      // Fallback to direct Meet link
      return NextResponse.json(
        {
          meetingLink: getGoogleMeetLink(),
          message:
            'Using direct Meet link. Configure Google Calendar API for automatic scheduling. See docs/GOOGLE-MEET-SETUP.md',
        },
        { status: 200 },
      );
    }

    // Calculate meeting time
    const now = new Date();
    let startTime: Date;

    if (preferredDate && preferredTime) {
      // Parse preferred date and time
      const [hours, minutes] = preferredTime.split(':').map(Number);
      startTime = new Date(preferredDate);
      startTime.setHours(hours || 14, minutes || 0, 0, 0);

      // Validate date is in the future
      if (startTime < now) {
        return NextResponse.json(
          { error: 'Preferred date and time must be in the future' },
          { status: 400 },
        );
      }
    } else {
      // Default to 1 hour from now
      startTime = new Date(now.getTime() + 60 * 60 * 1000);
    }

    // Meeting duration: 30 minutes
    const endTime = new Date(startTime.getTime() + 30 * 60 * 1000);

    // Create calendar event with Meet link
    const meeting = await createMeetingWithMeetLink({
      summary: `Founder Call: ${name || email}`,
      description: `Founder call with ${name || email} (${email})`,
      startTime,
      endTime,
      attendeeEmail: email,
    });

    return NextResponse.json({
      meetingLink: meeting.meetingLink,
      calendarEventLink: meeting.calendarEventLink,
      eventId: meeting.eventId,
    });
  } catch (error) {
    console.error('Error creating meeting:', error);

    // Provide helpful error messages
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    const isConfigError =
      errorMessage.includes('not configured') ||
      errorMessage.includes('Invalid refresh token');

    return NextResponse.json(
      {
        error: 'Failed to create meeting',
        message: errorMessage,
        // Fallback to direct Meet link if API fails
        meetingLink: getGoogleMeetLink(),
        ...(isConfigError && {
          help: 'See docs/GOOGLE-MEET-SETUP.md for setup instructions',
        }),
      },
      { status: 500 },
    );
  }
}
