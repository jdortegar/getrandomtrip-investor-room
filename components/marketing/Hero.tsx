'use client';

import BrandingAnimation from './BrandingAnimation';

export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden px-4 md:px-8 xl:px-12 2xl:px-16 mx-auto max-w-7xl xl:max-w-[1600px] 2xl:max-w-[1800px]">
      <div className="relative h-[calc(100vh-2rem)] w-full overflow-hidden rounded-3xl md:h-[calc(100vh-3rem)] md:rounded-[2.5rem] lg:h-[calc(100vh-4rem)]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 hover:scale-105"
          style={{
            backgroundImage: 'url("/images/hero.jpg")',
          }}
        />

        {/* Hero Content */}
        <div className="relative flex h-full flex-col items-center justify-center px-8 xl:px-12 2xl:px-16 text-white">
          <BrandingAnimation />
        </div>
      </div>
    </section>
  );
}
