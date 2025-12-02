# Squarespace DNS Setup for Netlify Subdomain

**Quick reference for configuring `investors.getrandomtrip.com`**

---

## 📍 Step-by-Step: Squarespace DNS Configuration

### 1. Access Squarespace Domain Settings

1. Log in to [Squarespace](https://account.squarespace.com)
2. Navigate to **Settings** → **Domains**
3. Find and click on `getrandomtrip.com`
4. Click **DNS Settings** or **Advanced DNS**

### 2. Get Netlify DNS Information

**Before configuring Squarespace, get the target from Netlify:**

1. Go to Netlify Dashboard → Your Site → **Site Settings**
2. Click **Domain Management**
3. Click **Add custom domain**
4. Enter: `investors.getrandomtrip.com`
5. Netlify will show you the DNS target (usually `your-site-name.netlify.app`)

### 3. Add CNAME Record in Squarespace

**Option A: CNAME Record (Recommended)**

1. In Squarespace DNS Settings, click **Add Record**
2. Select **CNAME**
3. Fill in:
   - **Host:** `investors` (or `investors.getrandomtrip.com` - depends on Squarespace interface)
   - **Points to:** `your-site-name.netlify.app` (from Netlify)
   - **TTL:** 3600 (or leave default)
4. Click **Save**

**Option B: A Record (If CNAME doesn't work)**

If Squarespace doesn't support CNAME for subdomains:

1. In Squarespace DNS Settings, click **Add Record**
2. Select **A**
3. Fill in:
   - **Host:** `investors`
   - **Points to:** Netlify's IP addresses (Netlify will provide these - usually 4 IPs)
   - **TTL:** 3600
4. Add all 4 A records with the same host but different IPs
5. Click **Save** for each

### 4. Verify DNS Configuration

**Check DNS Propagation:**

1. Visit [whatsmydns.net](https://www.whatsmydns.net)
2. Enter: `investors.getrandomtrip.com`
3. Select **CNAME** record type
4. Check if it resolves to your Netlify domain

**Expected Result:**

```
investors.getrandomtrip.com → your-site-name.netlify.app
```

### 5. Wait for Netlify to Detect Domain

1. Return to Netlify Dashboard
2. Go to **Domain Management**
3. Wait for status to change from "DNS configuration needed" to "DNS configuration detected"
4. This usually takes 5-30 minutes after DNS propagates

### 6. SSL Certificate (Automatic)

Once Netlify detects the domain:

- SSL certificate is automatically provisioned
- Takes 5-10 minutes
- Your site will be available at `https://investors.getrandomtrip.com`

---

## 🔍 Common Squarespace DNS Interface Variations

Squarespace has updated their interface over time. Here are common variations:

### Interface Type 1: Simple CNAME

```
Host: investors
Type: CNAME
Points to: your-site-name.netlify.app
```

### Interface Type 2: Full Domain

```
Host: investors.getrandomtrip.com
Type: CNAME
Points to: your-site-name.netlify.app
```

### Interface Type 3: Subdomain Only

```
Subdomain: investors
Type: CNAME
Target: your-site-name.netlify.app
```

**Note:** If you're unsure, try `investors` first (without the full domain).

---

## ⚠️ Troubleshooting

### Issue: "DNS configuration needed" in Netlify

**Solutions:**

1. Wait 30-60 minutes (DNS propagation takes time)
2. Verify CNAME record is correct in Squarespace
3. Check DNS propagation with whatsmydns.net
4. Ensure no conflicting records exist

### Issue: CNAME not available in Squarespace

**Solution:**

- Use A records instead
- Get IP addresses from Netlify support or dashboard
- Add all 4 A records with same host

### Issue: Subdomain not resolving

**Solutions:**

1. Check for typos in host name
2. Verify TTL hasn't expired
3. Clear DNS cache: `sudo dscacheutil -flushcache` (Mac) or `ipconfig /flushdns` (Windows)
4. Wait longer (can take up to 48 hours)

### Issue: SSL certificate not issuing

**Solutions:**

1. Ensure DNS is fully propagated
2. Verify domain is correctly added in Netlify
3. Check that domain status shows "DNS configuration detected"
4. Wait 10-15 minutes after DNS is detected
5. Contact Netlify support if issues persist

---

## 📝 Quick Checklist

- [ ] Logged into Squarespace account
- [ ] Accessed DNS settings for `getrandomtrip.com`
- [ ] Got Netlify target domain from Netlify dashboard
- [ ] Added CNAME record: `investors` → `your-site-name.netlify.app`
- [ ] Saved DNS record in Squarespace
- [ ] Verified DNS propagation (whatsmydns.net)
- [ ] Netlify shows "DNS configuration detected"
- [ ] SSL certificate issued (automatic)
- [ ] Site accessible at `https://investors.getrandomtrip.com`

---

## 🔗 Useful Links

- [Squarespace DNS Help](https://support.squarespace.com/hc/en-us/articles/205812668)
- [Netlify Custom Domains](https://docs.netlify.com/domains-https/custom-domains/)
- [DNS Propagation Checker](https://www.whatsmydns.net)
- [Netlify Support](https://www.netlify.com/support/)

---

**Last Updated:** 2025-01-XX
