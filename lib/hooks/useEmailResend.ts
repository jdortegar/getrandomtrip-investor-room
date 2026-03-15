'use client';

import { useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';

const RESEND_COOLDOWN_SECONDS = 60;

/**
 * Custom hook to handle email resend with cooldown.
 * Uses custom API so the server can return the real error message to the client.
 */
export function useEmailResend() {
  const pathname = usePathname();
  const [cooldown, setCooldown] = useState(0);
  const [canResend, setCanResend] = useState(true);

  const startCooldown = useCallback(() => {
    setCooldown(RESEND_COOLDOWN_SECONDS);
    setCanResend(false);

    const interval = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const sendEmail = useCallback(
    async (email: string): Promise<{ error?: string }> => {
      if (!canResend) {
        return { error: 'Please wait before resending' };
      }

      const locale = pathname?.startsWith('/en') ? 'en' : 'es';

      const res = await fetch('/api/auth/send-magic-link', {
        body: JSON.stringify({
          callbackUrl: '/room',
          email: email.trim(),
          locale,
        }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        return { error: data?.error ?? 'Failed to send the sign-in link' };
      }

      startCooldown();
      return {};
    },
    [canResend, pathname, startCooldown],
  );

  return { cooldown, canResend, sendEmail };
}
