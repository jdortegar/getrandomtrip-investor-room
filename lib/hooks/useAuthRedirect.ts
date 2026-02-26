import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface Investor {
  approved: boolean;
  profileComplete: boolean;
}

interface SessionWithInvestor {
  investor?: Investor;
}

function localePrefix(pathname: string): string {
  return pathname?.startsWith('/en') ? '/en' : '';
}

/**
 * Custom hook to handle authentication redirects
 * Determines the correct redirect path based on investor status and preserves locale.
 */
export function useAuthRedirect() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasRedirectedRef = useRef(false);
  const sessionRef = useRef(session);
  sessionRef.current = session;

  useEffect(() => {
    if (status === 'loading') return;
    if (status !== 'authenticated') return;

    const currentSession = sessionRef.current;
    if (!currentSession?.user) return;
    if (hasRedirectedRef.current) return;
    if (searchParams.get('error') === 'Verification') return;

    const investor = (currentSession as SessionWithInvestor).investor;
    const currentPath = pathname ?? window.location.pathname;
    const prefix = localePrefix(currentPath);

    if (currentPath !== '/otp' && currentPath !== '/en/otp') return;

    const targetPath = getRedirectTarget(investor, searchParams, prefix);

    if (!targetPath || targetPath === prefix + '/otp') return;

    hasRedirectedRef.current = true;

    const timeoutId = setTimeout(() => {
      if (window.location.pathname !== '/otp' && window.location.pathname !== '/en/otp') return;
      window.location.replace(targetPath);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [status, searchParams, pathname]);
}

function getRedirectTarget(
  investor: Investor | undefined,
  searchParams: URLSearchParams,
  prefix: string,
): string | null {
  if (!investor || !investor.profileComplete) {
    return `${prefix || ''}/onboarding`;
  }

  if (investor.approved && investor.profileComplete) {
    const callbackUrl = searchParams.get('callbackUrl');
    return callbackUrl ? decodeURIComponent(callbackUrl) : `${prefix || ''}/room`;
  }

  return null;
}
