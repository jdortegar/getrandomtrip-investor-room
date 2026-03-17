'use client';

import { useEffect, useRef, useState } from 'react';

import { Volume2, VolumeX } from 'lucide-react';

import BrandingAnimation from './BrandingAnimation';

const MOBILE_MEDIA = '(max-width: 768px)';

interface HeroProps {
  hero: { videoSrc: string; videoSrcMobile?: string };
}

export function Hero({ hero }: HeroProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_MEDIA);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  const videoSrc =
    isMobile && hero.videoSrcMobile ? hero.videoSrcMobile : hero.videoSrc;

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    if (videoRef.current) videoRef.current.muted = next;
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden px-4 md:px-8 xl:px-12 2xl:px-16 mx-auto max-w-7xl xl:max-w-[1600px] 2xl:max-w-[1800px]">
      <div className="relative h-[calc(100vh-2rem)] w-full overflow-hidden rounded-3xl md:h-[calc(100vh-3rem)] md:rounded-[2.5rem] lg:h-[calc(100vh-4rem)]">
        {/* Fallback background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/images/hero.jpg")',
          }}
        />

        {/* Video background: src by viewport (9x16 mobile, landscape desktop) */}
        <video
          ref={videoRef}
          autoPlay
          className="absolute inset-0 h-full w-full object-cover"
          loop
          muted={isMuted}
          playsInline
          poster="/images/hero.jpg"
          src={videoSrc}
        />

        {/* Unmute button: bottom-right */}
        <button
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          className="cursor-pointer absolute bottom-4 right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
          onClick={handleToggleMute}
          type="button"
        >
          {isMuted ? (
            <VolumeX className="h-6 w-6" />
          ) : (
            <Volume2 className="h-6 w-6" />
          )}
        </button>

        {/* Hero Content */}
        {/* <div className="relative flex h-full flex-col items-center justify-center px-8 xl:px-12 2xl:px-16 text-white">
          <BrandingAnimation />
        </div> */}
      </div>
    </section>
  );
}
