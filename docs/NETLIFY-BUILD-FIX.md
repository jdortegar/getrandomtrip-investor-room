# Netlify Build Fix — Puppeteer Installation Issue

**Issue:** Build stuck during `npm install` due to Puppeteer downloading Chromium

---

## ✅ Fixes Applied

### 1. Updated `netlify.toml`

Added environment variables to skip Chromium download:

```toml
[build.environment]
  PUPPETEER_SKIP_CHROMIUM_DOWNLOAD = "true"
  PUPPETEER_EXECUTABLE_PATH = "/usr/bin/google-chrome-stable"
  NPM_CONFIG_FETCH_TIMEOUT = "300000"
```

### 2. Created `.npmrc`

Added Puppeteer configuration:

```
puppeteer_skip_chromium_download=true
fetch-timeout=300000
```

### 3. Updated Build Script

Changed build command to ensure Prisma generates before build:

```json
"build": "prisma generate && next build"
```

---

## 🔧 Additional Steps (if still stuck)

### Option 1: Add Environment Variables in Netlify Dashboard

1. Go to Netlify Dashboard → Site Settings → Environment Variables
2. Add:
   - `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD` = `true`
   - `PUPPETEER_EXECUTABLE_PATH` = `/usr/bin/google-chrome-stable`

### Option 2: Use Puppeteer Core (Alternative)

If Puppeteer continues to cause issues, consider switching to `puppeteer-core`:

```bash
npm uninstall puppeteer
npm install puppeteer-core
```

Then configure to use Netlify's Chrome:

```typescript
import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/google-chrome-stable',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
```

### Option 3: Alternative PDF Libraries

For serverless environments, consider:

1. **@react-pdf/renderer** — React-based PDF generation
2. **PDFKit** — Lightweight Node.js PDF library
3. **jsPDF** — Client-side PDF generation
4. **Playwright** — Alternative to Puppeteer (better serverless support)

---

## 🚀 Next Steps

1. **Commit and push** the updated files:
   ```bash
   git add netlify.toml .npmrc package.json
   git commit -m "Fix Netlify build: Skip Puppeteer Chromium download"
   git push
   ```

2. **Trigger new build** in Netlify (or wait for auto-deploy)

3. **Monitor build logs** to verify Puppeteer is skipped

---

## 📝 Expected Build Output

After the fix, you should see:

```
✓ npm install completed (without Chromium download)
✓ Prisma client generated
✓ Next.js build started
```

Instead of being stuck on:
```
Installing npm packages...
[stuck here]
```

---

## ⚠️ Important Notes

- **Puppeteer on Netlify Functions:** Puppeteer requires Chrome/Chromium to be available
- **Netlify provides Chrome** at `/usr/bin/google-chrome-stable` in build environment
- **For production PDFs:** Consider using a dedicated PDF service or API
- **Serverless limitations:** Large binaries like Chromium can cause cold start issues

---

**Status:** ✅ Fixes Applied  
**Next:** Commit and redeploy

