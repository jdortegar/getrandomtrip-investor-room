---
name: google-calendar-meetings
description: Creating Google Calendar event URLs and meeting booking in this project. Use when adding or changing meeting booking, calendar links, or Google Meet integration.
metadata:
  project: investor-room
---

# Google Calendar & Meetings – Investor Room

This project supports **meeting booking** by generating **Google Calendar “Add Event”** URLs so users can open Google Calendar with a pre-filled event (title, description, duration, location, attendees) and optionally get a Google Meet link.

## Helpers

- **`lib/helpers/google-calendar-url.ts`** – `createGoogleCalendarUrl(options)` builds a `https://calendar.google.com/calendar/render?...` URL with query params for title, description, duration, location, attendees.
- **`lib/helpers/google-calendar.ts`** – Additional helpers for calendar/meeting logic if present.
- **`lib/constants/meeting.ts`** – Meeting-related constants (durations, defaults, etc.).

## Usage

- Call **`createGoogleCalendarUrl({ title, description?, duration?, location?, attendees? })`** from server or client. Use the returned URL as an “Add to Calendar” or “Book meeting” link (e.g. open in new tab).
- **Duration** is in minutes (default 30). **Location** can be a Google Meet link or plain text. **Attendees** is an array of email strings.

## API

- **`app/api/meetings/book/route.ts`** – Meeting booking API; may validate input, then return or use the calendar URL helper. Check this route for the exact contract (request body, response shape).

## Conventions

- Keep calendar/meeting logic in `lib/helpers/` and constants in `lib/constants/`. Use manual types from `lib/types/` for any meeting-related types.
- Do not hardcode production Meet links or secrets; use env or config if you need dynamic Meet URLs.

## References

- Calendar URL helper: `lib/helpers/google-calendar-url.ts`
- Calendar helpers: `lib/helpers/google-calendar.ts`
- Meeting constants: `lib/constants/meeting.ts`
- Booking API: `app/api/meetings/book/route.ts`
- Docs: `docs/GOOGLE-MEET-SETUP.md`, `docs/TESTING-GOOGLE-MEET.md` (if present)
