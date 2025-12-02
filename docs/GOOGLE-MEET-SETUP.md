# Google Meet Integration Setup

**Purpose:** Configure Google Meet for founder calls in the Investor Room

---

## 🎯 Integration Options

### Option 1: Direct Google Meet Link (Simplest) ⭐ Recommended for MVP

**Best for:** Quick setup, manual scheduling

**Steps:**

1. **Create a Google Meet link:**

   - Go to [meet.google.com](https://meet.google.com)
   - Click "New meeting" → "Create a meeting for later"
   - Copy the meeting link (e.g., `https://meet.google.com/abc-defg-hij`)
   - Or use a recurring Meet link for consistency

2. **Add to environment variables:**

   ```env
   GOOGLE_MEET_LINK=https://meet.google.com/your-meet-link
   ```

3. **Done!** The links on the landing page will now use this Meet link.

**Pros:**

- ✅ Zero setup time
- ✅ No API configuration needed
- ✅ Works immediately

**Cons:**

- ❌ Manual scheduling required
- ❌ No automatic calendar invites
- ❌ Same link for all meetings

---

### Option 2: Google Calendar API (Advanced) 🚀

**Best for:** Automated scheduling, calendar integration, professional setup

**Steps:**

#### 1. Enable Google Calendar API

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project (or select existing)
3. Enable **Google Calendar API**:
   - Navigate to "APIs & Services" → "Library"
   - Search for "Google Calendar API"
   - Click "Enable"

#### 2. Create OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Configure OAuth consent screen (if not done):
   - User Type: External
   - App name: "RandomTrip Investor Room"
   - Support email: your email
   - Scopes: Add `https://www.googleapis.com/auth/calendar.events`
   - Save
4. Create OAuth client:
   - Application type: Web application
   - Name: "Investor Room Calendar"
   - **Authorized redirect URIs:** Add this:
     - `https://developers.google.com/oauthplayground` (required for OAuth Playground)
   - Click "Create"
5. **Save the Client ID and Client Secret** (you'll need these in the next step)

#### 3. Get Refresh Token Using OAuth Playground

1. Go to [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
2. Click the gear icon (⚙️) in the top right → Check **"Use your own OAuth credentials"**
3. Enter your **Client ID** and **Client Secret** (from step 2)
4. In the left panel, scroll to **"Calendar API v3"**
5. Select: `https://www.googleapis.com/auth/calendar.events`
6. Click **"Authorize APIs"** button
7. **Important:** If you see "redirect_uri_mismatch" error:
   - Go back to Google Cloud Console
   - In your OAuth client settings, add this redirect URI: `https://developers.google.com/oauthplayground`
   - Click "Save" and wait 1-2 minutes
   - Try again
8. Sign in with your Google account and authorize the app
9. Click **"Exchange authorization code for tokens"** button
10. **Copy the Refresh Token** (it's a long string starting with `1//`, save it securely)

#### 4. Set Environment Variables

Add to `.env.local` and Netlify:

```env
# Google Calendar API
GOOGLE_CALENDAR_ENABLED=true
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REFRESH_TOKEN=your-refresh-token
GOOGLE_CALENDAR_ID=primary  # or specific calendar ID
FOUNDER_EMAIL=founder@randomtrip.com
```

#### 5. Test the Integration

The API route `/api/meetings/book` will now:

- Create calendar events automatically
- Generate Google Meet links
- Send calendar invites to investors

**Pros:**

- ✅ Automatic calendar invites
- ✅ Unique Meet links per meeting
- ✅ Professional experience
- ✅ Calendar integration

**Cons:**

- ❌ More setup required
- ❌ Requires Google Cloud project
- ❌ OAuth token management

---

## 📝 Implementation Details

### Current Implementation

The app supports both approaches:

1. **If `GOOGLE_CALENDAR_ENABLED=true` and credentials are set:**

   - Uses Google Calendar API
   - Creates meetings programmatically
   - Returns unique Meet links

2. **Otherwise:**
   - Falls back to direct `GOOGLE_MEET_LINK`
   - Simple, works immediately

### API Endpoint

**POST `/api/meetings/book`**

```json
{
  "email": "investor@example.com",
  "name": "John Doe",
  "preferredDate": "2025-02-15",
  "preferredTime": "14:00"
}
```

**Response:**

```json
{
  "meetingLink": "https://meet.google.com/abc-defg-hij",
  "calendarEventLink": "https://calendar.google.com/event?eid=...",
  "eventId": "event-id-123"
}
```

---

## 🔧 Troubleshooting

### Issue: "redirect_uri_mismatch" Error

**Solution:**

- Go to Google Cloud Console → APIs & Services → Credentials
- Click on your OAuth client ID
- Under "Authorized redirect URIs", add: `https://developers.google.com/oauthplayground`
- Click "Save" and wait 1-2 minutes for changes to propagate
- Try again in OAuth Playground

See detailed fix guide: [GOOGLE-MEET-FIX-REDIRECT.md](./GOOGLE-MEET-FIX-REDIRECT.md)

### Issue: "Google Calendar credentials not configured"

**Solution:**

- Verify all environment variables are set
- Check for typos in variable names
- Ensure `GOOGLE_CALENDAR_ENABLED=true` if using API

### Issue: "Failed to get access token"

**Solution:**

- Verify refresh token is correct (should start with `1//`)
- Check if refresh token has expired (unlikely, but possible)
- Ensure OAuth consent screen is configured

### Issue: "Failed to create meeting"

**Solution:**

- Check calendar permissions
- Verify calendar ID is correct
- Ensure API is enabled in Google Cloud Console

### Issue: Meet link not working

**Solution:**

- For direct links: Verify `GOOGLE_MEET_LINK` is correct
- For API: Check that `conferenceData` is included in request
- Ensure Meet is enabled for your Google Workspace

---

## 🚀 Quick Start (Recommended for MVP)

1. **Get a Google Meet link:**

   ```bash
   # Visit meet.google.com and create a meeting
   # Copy the link
   ```

2. **Add to environment:**

   ```env
   GOOGLE_MEET_LINK=https://meet.google.com/your-link
   ```

3. **Done!** The landing page will use this link.

You can upgrade to the Calendar API later for automatic scheduling.

---

## 📚 Resources

- [Google Calendar API Docs](https://developers.google.com/calendar/api/guides/overview)
- [Google Meet API Docs](https://developers.google.com/workspace/meet/rest)
- [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
- [Google Cloud Console](https://console.cloud.google.com)

---

**Last Updated:** 2025-01-XX
