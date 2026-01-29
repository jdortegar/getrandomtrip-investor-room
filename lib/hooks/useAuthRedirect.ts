import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface Investor {
  profileComplete: boolean;
  approved: boolean;
}

interface SessionWithInvestor {
  investor?: Investor;
}

/**
 * Custom hook to handle authentication redirects
 * Determines the correct redirect path based on investor status
 */
export function useAuthRedirect() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const hasRedirectedRef = useRef(false);
  const sessionRef = useRef(session);
  sessionRef.current = session;

  useEffect(() => {
    // Early returns
    if (status === 'loading') return;
    if (status !== 'authenticated') return;

    const currentSession = sessionRef.current;
    if (!currentSession?.user) return;
    if (hasRedirectedRef.current) return;
    if (searchParams.get('error') === 'Verification') return;

    const investor = (currentSession as SessionWithInvestor).investor;
    const currentPath = window.location.pathname;

    // Only redirect if we're actually on the OTP page
    if (currentPath !== '/otp') return;

    // Determine redirect target
    const targetPath = getRedirectTarget(investor, searchParams);

    // Skip if no redirect needed
    if (!targetPath || targetPath === '/otp') return;

    // Mark as redirected immediately so we never run redirect logic again
    hasRedirectedRef.current = true;

    // Small delay so session cookie is recognized, then hard redirect.
    // Don't depend on session in deps so effect doesn't re-run when session ref changes and cancel this timeout.
    const timeoutId = setTimeout(() => {
      if (window.location.pathname !== '/otp') return;
      window.location.replace(targetPath);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [status, searchParams]);
}

/**
 * Determines the redirect target based on investor status
 */
function getRedirectTarget(
  investor: Investor | undefined,
  searchParams: URLSearchParams,
): string | null {
  // No investor or profile incomplete -> onboarding
  if (!investor || !investor.profileComplete) {
    return '/onboarding';
  }

  // Approved and complete -> room (or callbackUrl)
  if (investor.approved && investor.profileComplete) {
    const callbackUrl = searchParams.get('callbackUrl');
    return callbackUrl ? decodeURIComponent(callbackUrl) : '/room';
  }

  // Profile complete but not approved -> stay on OTP
  return null;
}
