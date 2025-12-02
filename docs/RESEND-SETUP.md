# Resend Setup Guide — Multiple Applications

**Purpose:** Set up a new Resend API key for Investor Room when you already have another app using Resend

---

## 🔑 Creating a New Resend API Key

### Option 1: Create a New API Key in Existing Account (Recommended)

If you want to keep all projects under one Resend account:

1. **Log in to Resend**
   - Go to [resend.com](https://resend.com)
   - Sign in to your existing account

2. **Navigate to API Keys**
   - Go to **Dashboard** → **API Keys**
   - Or visit: [resend.com/api-keys](https://resend.com/api-keys)

3. **Create New API Key**
   - Click **"Create API Key"** or **"Add API Key"**
   - Give it a descriptive name: `Investor Room - Production` or `investor-room-netlify`
   - Select permissions (usually **Full Access** for production)
   - Click **"Create"**

4. **Copy the API Key**
   - ⚠️ **Important:** Copy the key immediately - you won't be able to see it again!
   - It will look like: `re_1234567890abcdefghijklmnopqrstuvwxyz`

5. **Add to Netlify Environment Variables**
   - Go to Netlify Dashboard → Your Site → **Site Settings** → **Environment Variables**
   - Click **"Add variable"**
   - Key: `RESEND_API_KEY`
   - Value: `re_...` (the key you just copied)
   - Click **"Save"**

---

## 🎯 Option 2: Create a Separate Resend Account

If you prefer to keep projects completely separate:

1. **Sign up for New Account**
   - Go to [resend.com](https://resend.com)
   - Click **"Sign Up"**
   - Use a different email (or add `+investor-room` to your email: `yourname+investor-room@example.com`)

2. **Verify Email**
   - Check your inbox for verification email
   - Click the verification link

3. **Create API Key**
   - Follow steps 2-5 from Option 1 above

---

## 📧 Option 3: Use Different Sender Email/Domain

You can use the same API key but configure different sender addresses:

### Using Different Email Address

In your Resend account, you can send from multiple verified emails:

1. **Add New Sender Email**
   - Go to Resend Dashboard → **Domains** or **Settings**
   - Add a new email address (e.g., `investors@yourdomain.com`)
   - Verify the email address

2. **Update Environment Variable**
   - In Netlify, add/update:
     - `EMAIL_FROM=investors@yourdomain.com`

### Using Different Domain

If you have multiple domains:

1. **Add Domain in Resend**
   - Go to Resend Dashboard → **Domains**
   - Click **"Add Domain"**
   - Enter: `investors.getrandomtrip.com` (or your subdomain domain)
   - Follow DNS verification steps

2. **Update Email From**
   - Set `EMAIL_FROM=noreply@investors.getrandomtrip.com`
   - Or: `EMAIL_FROM=onboarding@investors.getrandomtrip.com`

---

## 🔐 Best Practices

### 1. Use Different API Keys Per Environment

- **Development:** `RESEND_API_KEY_DEV` (optional, for local testing)
- **Production:** `RESEND_API_KEY` (for Netlify)

### 2. Use Descriptive Names

When creating API keys, use clear names:
- ✅ `investor-room-production`
- ✅ `investor-room-netlify`
- ❌ `key1`, `test`, `new key`

### 3. Rotate Keys Regularly

- Create new keys periodically
- Revoke old keys that are no longer in use
- Keep track of which keys are used where

### 4. Limit Permissions (if possible)

- Some services allow scoped permissions
- Use the minimum permissions needed

---

## 📝 Current Configuration

Your Investor Room app is configured to use:

```typescript
// lib/auth/config.ts
function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not set');
  }
  return new Resend(apiKey);
}
```

**Environment Variable Required:**
- `RESEND_API_KEY` - Your Resend API key (starts with `re_`)

**Optional:**
- `EMAIL_FROM` - Sender email address (defaults to `onboarding@resend.dev`)

---

## 🚀 Quick Setup Steps

1. ✅ Create new API key in Resend (or use existing)
2. ✅ Copy the API key (`re_...`)
3. ✅ Add to Netlify: `RESEND_API_KEY=re_...`
4. ✅ (Optional) Add `EMAIL_FROM` if using custom email
5. ✅ Redeploy site

---

## 🔍 Verifying Setup

After adding the API key:

1. **Check Netlify Build Logs**
   - Build should complete without Resend errors
   - Look for successful compilation

2. **Test Email Sending**
   - Try the OTP/sign-in flow
   - Check if email is received
   - Check Resend dashboard for email logs

3. **Check Resend Dashboard**
   - Go to Resend Dashboard → **Logs**
   - You should see email sending activity
   - Check for any errors

---

## ⚠️ Important Notes

- **API Key Security:** Never commit API keys to Git
- **Key Visibility:** You can only see the full key once when creating it
- **Rate Limits:** Free tier: 3,000 emails/month
- **Key Revocation:** You can revoke keys anytime in Resend dashboard

---

## 🆘 Troubleshooting

### Issue: "Missing API key" error

**Solution:**
- Verify `RESEND_API_KEY` is set in Netlify environment variables
- Check for typos (should start with `re_`)
- Ensure no extra spaces or quotes
- Redeploy after adding the variable

### Issue: Emails not sending

**Solution:**
- Check Resend dashboard logs for errors
- Verify sender email is verified in Resend
- Check rate limits (free tier: 3,000/month)
- Verify API key has correct permissions

### Issue: "Unauthorized" error

**Solution:**
- Verify API key is correct
- Check if key was revoked
- Ensure key has "Send Email" permissions
- Try creating a new key

---

## 📚 Resources

- [Resend Dashboard](https://resend.com/api-keys)
- [Resend Documentation](https://resend.com/docs)
- [Resend API Reference](https://resend.com/docs/api-reference)

---

**Last Updated:** 2025-01-XX

