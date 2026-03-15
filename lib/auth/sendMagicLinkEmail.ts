import { Resend } from 'resend';

import { DEFAULT_LOCALE } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import type { EmailsDictionary } from '@/lib/types/dictionary';

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error('RESEND_API_KEY is not set');
  return new Resend(apiKey);
}

function getMagicLinkHtml(strings: EmailsDictionary['magicLink'], url: string, baseUrl: string) {
  return `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <style>
      body { font-family: 'Barlow', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; margin:0; background:#f6f7fb; -webkit-font-smoothing:antialiased; }
      .container { max-width:600px; margin:24px auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 8px 24px rgba(10,34,64,0.06); }
      .header { background: #ffffff; padding:20px; text-align:center; border-bottom:1px solid #eef2f7; }
      .logo { display:block; height:48px; width:192px; max-width:100%; object-fit:contain; margin-left:auto; margin-right:auto; }
      .main { padding:28px; color:#0A2240; font-family: 'Barlow', sans-serif; }
      .title { font-family: 'Barlow Condensed', Arial Narrow, sans-serif; font-size:20px; font-weight:600; margin:0 0 8px; }
      .copy { font-family: 'Barlow', sans-serif; color:#475569; margin-bottom:18px; font-size:15px; line-height:1.5; }
      .button { background:#FED700; color:#000; padding:12px 24px; text-decoration:none; border-radius:8px; display:block; font-weight:600; font-size:1rem; font-family: 'Barlow Condensed', Arial Narrow, sans-serif; text-transform:uppercase; letter-spacing:0.025em; width:100%; }
      @media (min-width:768px){ .button { font-size:1.125rem; } }
      .footer { font-family: 'Barlow', sans-serif; padding:18px; border-top:1px solid #eef2f7; color:#6b7280; font-size:13px; text-align:center; }
      @media (max-width:480px){ .container{margin:12px} .main{padding:20px} .logo{height:40px;width:160px} }
    </style>
  </head>
  <body>
    <div class="container" role="article" aria-label="${strings.logoAlt}">
      <div class="header" role="banner">
        <img src="${baseUrl}/assets/svg/randomtrip.svg" alt="${strings.logoAlt}" class="logo" width="280" height="120" style="display:block;height:120px;width:280px;max-width:100%;object-fit:contain;margin-left:auto;margin-right:auto;" />
      </div>
      <div class="main">
        <h2 class="title">${strings.title}</h2>
        <p class="copy">${strings.copy}</p>
        <div style="border-radius:8px; margin:22px 0; overflow:hidden; text-align:center;">
          <a href="${url}" class="button" target="_blank" rel="noopener noreferrer" style="background:#FED700;border-bottom-left-radius:8px;border-bottom-right-radius:8px;border-top-left-radius:8px;border-top-right-radius:8px;color:#000;display:inline-block;font-family:'Barlow Condensed',Arial Narrow,sans-serif;font-size:1rem;font-weight:600;letter-spacing:0.025em;padding:12px 24px;text-decoration:none;text-transform:uppercase;width:100%;">${strings.button}</a>
        </div>
        <p class="copy">${strings.safeIgnore}</p>
      </div>
      <div class="footer">&copy; ${new Date().getFullYear()} getrandomtrip</div>
    </div>
  </body>
</html>
`;
}

/**
 * Sends the magic link email via Resend. Throws with a user-facing message on failure.
 */
export async function sendMagicLinkEmail(to: string, url: string): Promise<void> {
  const from = process.env.EMAIL_FROM || 'onboarding@resend.dev';
  const baseUrl = process.env.NEXTAUTH_URL || 'https://investors.getrandomtrip.com';

  const resend = getResend();
  const dict = await getDictionary(DEFAULT_LOCALE);
  const strings = (dict as { emails: EmailsDictionary }).emails.magicLink;

  const { error } = await resend.emails.send({
    from,
    to,
    subject: strings.subject,
    html: getMagicLinkHtml(strings, url, baseUrl),
  });

  if (error) throw new Error(error.message);
}
