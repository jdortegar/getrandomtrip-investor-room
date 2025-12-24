'use client';

import BrandingAnimation from './BrandingAnimation';

export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div className="relative h-[calc(100vh-2rem)] w-full overflow-hidden rounded-[2.5rem] md:h-[calc(100vh-3rem)] lg:h-[calc(100vh-4rem)]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 hover:scale-105"
          style={{
            backgroundImage: 'url("/images/hero.jpg")',
            // filter: 'brightness(0.7)',
          }}
        />

        {/* Dark Overlay for better text readability */}
        {/* <div className="absolute inset-0 bg-black/20" /> */}

        {/* Hero Content */}
        <div className="relative flex h-full flex-col items-center justify-center text-white">
          <BrandingAnimation />
        </div>
      </div>
    </section>
  );
}
