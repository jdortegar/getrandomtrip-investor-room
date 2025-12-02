# Testing Google Meet Integration

**Purpose:** Test the Google Calendar API integration for creating meetings

---

## 🧪 Quick Test Methods

### Method 1: Test Page (Easiest) ⭐

1. **Start your dev server:**

   ```bash
   npm run dev
   ```

2. **Navigate to test page:**

   - Go to: `http://localhost:3011/room/test-meeting`
   - (You'll need to be authenticated - sign in first)

3. **Fill in the form:**

   - Enter an investor email
   - Optionally add name, date, and time
   - Click "Create Meeting"

4. **Check results:**
   - View the response JSON
   - Click the Meet link to verify it works
   - Check your Google Calendar for the event

---

### Method 2: Using cURL

**Test with default time (1 hour from now):**

```bash
curl -X POST http://localhost:3011/api/meetings/book \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test Investor"
  }'
```

**Test with preferred date and time:**

```bash
curl -X POST http://localhost:3011/api/meetings/book \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test Investor",
    "preferredDate": "2025-12-15",
    "preferredTime": "14:00"
  }'
```

**Expected Response:**

```json
{
  "meetingLink": "https://meet.google.com/abc-defg-hij",
  "calendarEventLink": "https://calendar.google.com/event?eid=...",
  "eventId": "event-id-123"
}
```

---

### Method 3: Using Postman or Insomnia

1. **Create a POST request:**

   - URL: `http://localhost:3011/api/meetings/book`
   - Method: `POST`
   - Headers: `Content-Type: application/json`

2. **Body (JSON):**

   ```json
   {
     "email": "test@example.com",
     "name": "Test Investor",
     "preferredDate": "2025-12-15",
     "preferredTime": "14:00"
   }
   ```

3. **Send request and check response**

---

## ✅ Verification Checklist

After creating a meeting, verify:

- [ ] **API Response:**

  - Returns `meetingLink` (Google Meet URL)
  - Returns `calendarEventLink` (Calendar event URL)
  - Returns `eventId` (Event ID)

- [ ] **Google Calendar:**

  - Event appears in your calendar
  - Event has correct title: "Founder Call: [Name]"
  - Event has correct time
  - Event includes Google Meet link

- [ ] **Google Meet Link:**

  - Link is clickable and valid
  - Link opens Google Meet
  - Meeting is accessible

- [ ] **Email Invite:**
  - Investor email receives calendar invite (if attendeeEmail was provided)
  - Invite includes Meet link

---

## 🔍 Troubleshooting

### Issue: "Google Calendar credentials not configured"

**Solution:**

- Check `.env.local` file exists
- Verify all environment variables are set:
  ```env
  GOOGLE_CALENDAR_ENABLED=true
  GOOGLE_CLIENT_ID=...
  GOOGLE_CLIENT_SECRET=...
  GOOGLE_REFRESH_TOKEN=...
  ```
- Restart dev server after adding variables

### Issue: "Invalid refresh token format"

**Solution:**

- Refresh token should start with `1//`
- Get a new refresh token from OAuth Playground
- See [GOOGLE-MEET-SETUP.md](./GOOGLE-MEET-SETUP.md)

### Issue: "Failed to get access token"

**Solution:**

- Verify refresh token is correct
- Check OAuth consent screen is configured
- Ensure Calendar API is enabled in Google Cloud Console

### Issue: "Failed to create calendar event"

**Solution:**

- Check calendar permissions
- Verify `GOOGLE_CALENDAR_ID` is correct (default: `primary`)
- Ensure Meet is enabled for your Google Workspace

### Issue: No Meet link in response

**Solution:**

- Check that `conferenceDataVersion=1` is in the API request
- Verify Meet is enabled for your Google account
- Check API response for errors

---

## 📝 Test Scenarios

### Scenario 1: Basic Meeting (Default Time)

```json
{
  "email": "investor@example.com"
}
```

**Expected:** Meeting created 1 hour from now, 30 minutes duration

---

### Scenario 2: Meeting with Name

```json
{
  "email": "investor@example.com",
  "name": "John Doe"
}
```

**Expected:** Event title includes name: "Founder Call: John Doe"

---

### Scenario 3: Meeting with Preferred Time

```json
{
  "email": "investor@example.com",
  "name": "Jane Smith",
  "preferredDate": "2025-12-20",
  "preferredTime": "15:30"
}
```

**Expected:** Meeting created at specified date and time

---

### Scenario 4: Past Date (Should Fail)

```json
{
  "email": "investor@example.com",
  "preferredDate": "2020-01-01",
  "preferredTime": "10:00"
}
```

**Expected:** Error: "Preferred date and time must be in the future"

---

## 🚀 Production Testing

Before deploying to production:

1. **Set environment variables in Netlify:**

   - Go to Netlify Dashboard → Site Settings → Environment Variables
   - Add all Google Calendar API credentials

2. **Test with production URL:**

   ```bash
   curl -X POST https://investors.getrandomtrip.com/api/meetings/book \
     -H "Content-Type: application/json" \
     -d '{"email": "test@example.com"}'
   ```

3. **Verify:**
   - Events appear in production calendar
   - Meet links work correctly
   - Email invites are sent

---

## 📚 Related Documentation

- [GOOGLE-MEET-SETUP.md](./GOOGLE-MEET-SETUP.md) - Setup instructions
- [GOOGLE-MEET-FIX-REDIRECT.md](./GOOGLE-MEET-FIX-REDIRECT.md) - Troubleshooting OAuth

---

**Last Updated:** 2025-01-XX
