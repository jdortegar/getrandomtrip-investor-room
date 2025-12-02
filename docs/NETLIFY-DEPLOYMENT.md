# Netlify Deployment Guide — Squarespace Subdomain

**Purpose:** Deploy Investor Room to Netlify with a Squarespace subdomain (e.g., `investors.getrandomtrip.com`)

---

## 📋 Prerequisites

1. **Netlify Account** — Sign up at [netlify.com](https://netlify.com)
2. **Squarespace Domain** — Access to Squarespace domain settings
3. **Git Repository** — Code pushed to GitHub/GitLab/Bitbucket
4. **Environment Variables** — All required variables ready

---

## 🚀 Step 1: Prepare for Netlify Deployment

### 1.1 Update Dependencies (if needed)

Since you're using Vercel Blob, you have two options:

**Option A: Switch to Netlify Blob** (Recommended for Netlify)

- Remove `@vercel/blob`
- Install Netlify Blob storage
- Update file storage code

**Option B: Keep Vercel Blob** (Works but not ideal)

- Vercel Blob works on Netlify but requires Vercel account
- Consider switching for better integration

For now, we'll proceed with the current setup.

### 1.2 Add Netlify Configuration

✅ Already created: `netlify.toml`

### 1.3 Install Netlify Next.js Plugin

The `netlify.toml` references `@netlify/plugin-nextjs`. Netlify will install this automatically, but you can also add it:

```bash
npm install -D @netlify/plugin-nextjs
```

---

## 🌐 Step 2: Deploy to Netlify

### 2.1 Connect Repository

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your Git provider (GitHub/GitLab/Bitbucket)
4. Select the `investor-room` repository

### 2.2 Configure Build Settings

Netlify should auto-detect Next.js, but verify:

- **Build command:** `npm run build`
- **Publish directory:** `.next` (or leave empty, Netlify handles it)
- **Node version:** `20` (specified in `.nvmrc`)

### 2.3 Add Environment Variables

In Netlify Dashboard → Site Settings → Environment Variables, add:

```env
# Database
DATABASE_URL=postgresql://...

# NextAuth
NEXTAUTH_URL=https://investors.getrandomtrip.com
NEXTAUTH_SECRET=your-secret-here

# Resend
RESEND_API_KEY=re_...
EMAIL_FROM=onboarding@resend.dev

# Vercel Blob (or switch to Netlify Blob)
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...

# PostHog
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# DocuSign
DOCUSIGN_INTEGRATION_KEY=...
DOCUSIGN_USER_ID=...
DOCUSIGN_ACCOUNT_ID=...
DOCUSIGN_RSA_PRIVATE_KEY=...
DOCUSIGN_BASE_PATH=https://demo.docusign.net
```

**Important:** Update `NEXTAUTH_URL` to your subdomain URL!

---

## 🔗 Step 3: Configure Squarespace Subdomain

### 3.1 Get Netlify DNS Information

1. In Netlify Dashboard → Site Settings → Domain Management
2. Click **"Add custom domain"**
3. Enter your subdomain: `investors.getrandomtrip.com`
4. Netlify will show you DNS records needed

### 3.2 Configure DNS in Squarespace

1. Log in to [Squarespace](https://account.squarespace.com)
2. Go to **Settings** → **Domains**
3. Select your domain (`getrandomtrip.com`)
4. Click **DNS Settings** or **Advanced DNS**

### 3.3 Add DNS Records

Add a **CNAME record**:

- **Type:** CNAME
- **Host:** `investors` (or `investors.getrandomtrip.com` depending on Squarespace)
- **Points to:** `your-site-name.netlify.app` (or the Netlify domain shown)
- **TTL:** 3600 (or default)

**Alternative:** If CNAME doesn't work, use **A Record**:

- **Type:** A
- **Host:** `investors`
- **Points to:** Netlify's IP addresses (Netlify will provide these)

### 3.4 Wait for DNS Propagation

- DNS changes can take 24-48 hours (usually faster)
- Check propagation: [whatsmydns.net](https://www.whatsmydns.net)
- Netlify will show "DNS configuration detected" when ready

---

## ✅ Step 4: SSL Certificate

Netlify automatically provisions SSL certificates via Let's Encrypt:

1. Once DNS is configured, Netlify detects the domain
2. SSL certificate is automatically issued (can take a few minutes)
3. Your site will be available at `https://investors.getrandomtrip.com`

---

## 🔧 Step 5: Post-Deployment Configuration

### 5.1 Update NextAuth URL

Ensure `NEXTAUTH_URL` in Netlify environment variables matches:

```
https://investors.getrandomtrip.com
```

### 5.2 Update Resend Domain (if using custom domain)

If you're using a custom domain for emails:

1. Verify domain in Resend
2. Update `EMAIL_FROM` to use your domain

### 5.3 Test the Deployment

1. Visit `https://investors.getrandomtrip.com`
2. Test authentication flow
3. Verify all API routes work
4. Check database connections

---

## 🐛 Troubleshooting

### Issue: Build Stuck on npm install / Puppeteer

**Symptoms:**

- Build hangs during `npm install`
- Warnings about Puppeteer Chromium download
- Build times out

**Solutions:**

1. ✅ **Already configured:** `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true` in `netlify.toml`
2. ✅ **Already configured:** `.npmrc` file with Puppeteer skip settings
3. If still stuck, add to Netlify environment variables:
   - `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true`
   - `PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable`
4. **Alternative:** Consider using `puppeteer-core` or switching to a different PDF generation library for serverless

### Issue: Build Fails

**Solution:**

- Check build logs in Netlify Dashboard
- Ensure all environment variables are set
- Verify Node version (should be 20)
- Check `package.json` scripts
- Verify Prisma client is generated (check `postinstall` script)

### Issue: DNS Not Resolving

**Solution:**

- Wait 24-48 hours for propagation
- Verify DNS records in Squarespace match Netlify's requirements
- Check for typos in CNAME/A record
- Use `dig investors.getrandomtrip.com` to check DNS

### Issue: SSL Certificate Not Issuing

**Solution:**

- Ensure DNS is fully propagated
- Check that domain is correctly added in Netlify
- Wait a few minutes (certificates auto-provision)
- Contact Netlify support if issues persist

### Issue: NextAuth Not Working

**Solution:**

- Verify `NEXTAUTH_URL` matches your subdomain exactly
- Check `NEXTAUTH_SECRET` is set
- Ensure database is accessible from Netlify
- Check Netlify function logs

### Issue: Database Connection Fails

**Solution:**

- Ensure database allows connections from Netlify IPs
- Check `DATABASE_URL` is correct
- Verify SSL requirements for database
- Some databases need IP whitelisting

---

## 📝 Additional Notes

### Netlify Functions

Next.js API routes run as Netlify Functions automatically. No additional configuration needed.

### Build Time

- First build: ~5-10 minutes
- Subsequent builds: ~2-5 minutes
- Builds triggered on every Git push

### Custom Headers (if needed)

Add to `netlify.toml`:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### Redirects (if needed)

Add to `netlify.toml`:

```toml
[[redirects]]
  from = "/old-path"
  to = "/new-path"
  status = 301
```

---

## 🎯 Quick Checklist

- [ ] Code pushed to Git repository
- [ ] Netlify site created and connected to repo
- [ ] All environment variables added to Netlify
- [ ] `NEXTAUTH_URL` updated to subdomain
- [ ] CNAME record added in Squarespace DNS
- [ ] DNS propagated (check with whatsmydns.net)
- [ ] SSL certificate issued (automatic)
- [ ] Site accessible at `https://investors.getrandomtrip.com`
- [ ] Authentication flow tested
- [ ] Database connection verified

---

## 📚 Resources

- [Netlify Next.js Docs](https://docs.netlify.com/integrations/frameworks/nextjs/)
- [Netlify DNS Docs](https://docs.netlify.com/domains-https/custom-domains/)
- [Squarespace DNS Help](https://support.squarespace.com/hc/en-us/articles/205812668)
- [NextAuth Deployment](https://next-auth.js.org/deployment)

---

**Last Updated:** 2025-01-XX  
**Status:** Ready for Deployment
