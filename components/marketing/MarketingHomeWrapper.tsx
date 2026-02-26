'use client';

import { useState } from 'react';

import { FullMarketingContent } from '@/components/marketing/FullMarketingContent';
import { LoginModal } from '@/components/marketing/LoginModal';
import { Navbar } from '@/components/marketing/Navbar';
import { WaitlistPage } from '@/components/marketing/WaitlistPage';
import { LocaleSwitcher } from '@/components/navigation/LocaleSwitcher';
import type { MarketingDictionary } from '@/lib/types/dictionary';
import type { Locale } from '@/lib/i18n/config';

interface MarketingHomeWrapperProps {
  dict: MarketingDictionary;
  hasSession: boolean;
  locale: Locale;
}

export function MarketingHomeWrapper({
  dict,
  hasSession,
  locale,
}: MarketingHomeWrapperProps) {
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const openLoginModal = () => setLoginModalOpen(true);

  return (
    <main className="flex min-h-screen flex-col">
      {hasSession && (
        <Navbar dict={dict.nav} locale={locale} />
      )}
      <div className="absolute right-4 top-4 z-50 md:right-8 md:top-8">
        <LocaleSwitcher locale={locale} />
      </div>
      {hasSession ? (
        <FullMarketingContent dict={dict} />
      ) : (
        <>
          <WaitlistPage
            dict={dict.waitlist}
            locale={locale}
            onOpenLogin={openLoginModal}
          />
          <LoginModal
            dict={dict.waitlist.loginModal}
            locale={locale}
            onOpenChange={setLoginModalOpen}
            open={loginModalOpen}
          />
        </>
      )}
    </main>
  );
}
