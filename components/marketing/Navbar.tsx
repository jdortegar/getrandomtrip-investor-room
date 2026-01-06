'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="absolute left-0 right-0 top-0 z-50 w-full">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-8 text-white md:px-12 md:py-10">
          <Link
            className="flex items-center gap-2"
            href="/"
            onClick={closeMobileMenu}
          >
            <img
              alt="Randomtrip"
              className="h-10 md:h-14"
              src="/assets/logos/logo_getrandomtrip_1.png"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-[100px] md:flex">
            <Link
              className="text-xl transition-colors hover:text-white"
              href="/"
            >
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

          {/* Mobile Hamburger Menu Button */}
          <button
            aria-label="Toggle menu"
            className="flex items-center justify-center md:hidden"
            onClick={toggleMobileMenu}
            type="button"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/80 transition-opacity duration-300 md:hidden',
          isMobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={closeMobileMenu}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={cn(
          'fixed right-0 top-0 z-50 h-full w-80 p-8 transition-transform duration-300 md:hidden',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        style={{ backgroundColor: '#0F2D37' }}
      >
        <div className="flex flex-col gap-6 pt-16">
          <Link
            className="text-xl text-white transition-colors hover:text-white/80"
            href="/"
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          <Link
            className="text-xl text-white transition-colors hover:text-white/80"
            href="/contact"
            onClick={closeMobileMenu}
          >
            Contact
          </Link>
          <span className="cursor-not-allowed text-xl text-white/60">
            Investors Room
          </span>
          <Link
            className="text-xl font-bold text-white transition-colors hover:text-white/80"
            href="/login"
            onClick={closeMobileMenu}
          >
            Log In
          </Link>
        </div>
      </div>
    </>
  );
}
