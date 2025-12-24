'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Compass } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="absolute left-0 right-0 top-0 z-50 flex items-center justify-between pl-12 pr-20 py-10 text-white">
      <Link className="flex items-center gap-2" href="/">
        <img
          src="/assets/logos/logo_getrandomtrip_1.png"
          alt="Randomtrip"
          className="h-14"
        />
      </Link>

      <div className="hidden items-center gap-[100px] md:flex">
        <Link className="text-xl transition-colors hover:text-white" href="/">
          Home
        </Link>
        <Link
          className="text-xl transition-colors hover:text-white"
          href="/contact"
        >
          Contact
        </Link>
        <span className="cursor-not-allowed text-xl text-[#607265]">
          Investors Room
        </span>
        <Link
          className="text-xl font-bold transition-colors hover:text-white"
          href="/login"
        >
          Log In
        </Link>
      </div>

      {/* Mobile menu could be added here if needed */}
    </nav>
  );
}
