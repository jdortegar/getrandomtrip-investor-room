# Fix: Google OAuth Redirect URI Mismatch Error

**Error:** `Error 400: redirect_uri_mismatch`

This error occurs when the redirect URI in your OAuth request doesn't match what's configured in Google Cloud Console.

---

## 🔧 Quick Fix

### If Using OAuth Playground

1. **Go to Google Cloud Console:**
   - [Google Cloud Console](https://console.cloud.google.com)
   - Navigate to your project
   - Go to **APIs & Services** → **Credentials**

2. **Edit Your OAuth Client:**
   - Click on your OAuth 2.0 Client ID
   - Under **"Authorized redirect URIs"**, add:
     ```
     https://developers.google.com/oauthplayground
     ```
   - Click **"Save"**

3. **Try Again:**
   - Go back to [OAuth Playground](https://developers.google.com/oauthplayground/)
   - Click the gear icon → Check "Use your own OAuth credentials"
   - Enter your Client ID and Client Secret
   - Click "Authorize APIs"
   - It should work now!

---

## 📝 Step-by-Step: Complete OAuth Setup

### Step 1: Configure OAuth Client

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your project
3. Navigate to **APIs & Services** → **Credentials**
4. Click on your OAuth 2.0 Client ID (or create a new one)

5. **Add Authorized Redirect URIs:**
   ```
   https://developers.google.com/oauthplayground
   ```
   
   **Optional (for custom flows):**
   ```
   http://localhost:3011/oauth2callback
   https://investors.getrandomtrip.com/oauth2callback
   ```

6. Click **"Save"**

### Step 2: Get Refresh Token via OAuth Playground

1. Go to [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)

2. **Configure Playground:**
   - Click the gear icon (⚙️) in top right
   - Check **"Use your own OAuth credentials"**
   - Enter your **Client ID**
   - Enter your **Client Secret**
   - Click **"Close"**

3. **Authorize:**
   - In the left panel, find **"Calendar API v3"**
   - Check: `https://www.googleapis.com/auth/calendar.events`
   - Click **"Authorize APIs"** button
   - Sign in with your Google account
   - Click **"Allow"** to grant permissions

4. **Get Tokens:**
   - Click **"Exchange authorization code for tokens"** button
   - You'll see:
     - **Access Token** (temporary, expires in 1 hour)
     - **Refresh Token** (permanent, save this!)

5. **Copy the Refresh Token:**
   - It's a long string like: `1//0g...`
   - Save it securely
   - Add to your `.env.local`:
     ```env
     GOOGLE_REFRESH_TOKEN=1//0g...
     ```

---

## ✅ Verify Your Setup

After adding the redirect URI, you should be able to:

1. ✅ Authorize in OAuth Playground without errors
2. ✅ Get a refresh token successfully
3. ✅ Use the refresh token to create calendar events

---

## 🚨 Common Issues

### Issue: Still seeing redirect_uri_mismatch

**Solutions:**
- Make sure you added `https://developers.google.com/oauthplayground` exactly (no trailing slash)
- Wait a few minutes for changes to propagate
- Clear browser cache and try again
- Double-check you're using the correct OAuth client ID

### Issue: "Access blocked: This app's request is invalid"

**Solutions:**
- Verify OAuth consent screen is configured
- Check that the app is in "Testing" or "Production" mode
- Ensure your email is added as a test user (if in Testing mode)

### Issue: Refresh token not showing

**Solutions:**
- Make sure you selected `access_type=offline` (OAuth Playground does this automatically)
- Try revoking access and re-authorizing
- Check that you're using the correct scopes

---

## 📚 Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [OAuth Playground Help](https://developers.google.com/oauthplayground/)
- [Google Cloud Console](https://console.cloud.google.com)

---

**Last Updated:** 2025-01-XX

