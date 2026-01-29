import { useState, useCallback } from 'react';
import { signIn } from 'next-auth/react';

const RESEND_COOLDOWN_SECONDS = 60;

/**
 * Custom hook to handle email resend with cooldown
 */
export function useEmailResend() {
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

      const result = await signIn('email', {
        email,
        redirect: false,
        callbackUrl: '/room',
      });

      if (result?.error) {
        return { error: result.error };
      }

      startCooldown();
      return {};
    },
    [canResend, startCooldown],
  );

  return { cooldown, canResend, sendEmail };
}
