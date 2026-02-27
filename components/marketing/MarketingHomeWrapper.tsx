'use client';

import { useEffect, useState } from 'react';

import { FullMarketingContent } from '@/components/marketing/FullMarketingContent';
import { LoginModal } from '@/components/marketing/LoginModal';
import { Navbar } from '@/components/marketing/Navbar';
import { WaitlistPage } from '@/components/marketing/WaitlistPage';
import { LocaleSwitcher } from '@/components/navigation/LocaleSwitcher';
import type { MarketingDictionary } from '@/lib/types/dictionary';
import type { Locale } from '@/lib/i18n/config';

const GATE_STORAGE_KEY = 'investor_room_marketing_gate';

function getGateUnlocked(): boolean {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(GATE_STORAGE_KEY) === '1';
}

interface MarketingHomeWrapperProps {
  dict: MarketingDictionary;
  locale: Locale;
}

export function MarketingHomeWrapper({
  dict,
  locale,
}: MarketingHomeWrapperProps) {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    setIsUnlocked(getGateUnlocked());
  }, []);

  const handleLoginSuccess = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(GATE_STORAGE_KEY, '1');
    }
    setLoginModalOpen(false);
    setIsUnlocked(true);
  };

  return (
    <main className="flex min-h-screen flex-col">
      {isUnlocked ? (
        <>
          <Navbar dict={dict.nav} locale={locale} />
          <FullMarketingContent dict={dict} />
        </>
      ) : (
        <>
          <WaitlistPage
            dict={dict.waitlist}
            locale={locale}
            onOpenLogin={() => setLoginModalOpen(true)}
          />
          <LoginModal
            dict={dict.waitlist.loginModal}
            onOpenChange={setLoginModalOpen}
            onSuccess={handleLoginSuccess}
            open={loginModalOpen}
          />
        </>
      )}
    </main>
  );
}
