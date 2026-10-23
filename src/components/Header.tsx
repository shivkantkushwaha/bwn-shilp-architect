'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/data/site';
import { Wordmark } from '@/components/Wordmark';
import { Button } from '@/components/Button';
import { SheetLabel } from '@/components/SheetLabel';
import {
  MenuIcon,
  CloseIcon,
  PhoneIcon,
  WhatsAppIcon,
  ArrowRightIcon,
} from '@/components/icons';

const NAV_LINKS = [
  { href: '/projects', label: 'Projects', sheet: 'SHEET 02' },
  { href: '/services', label: 'Services', sheet: 'SHEET 03' },
  { href: '/about', label: 'About', sheet: 'SHEET 04' },
  { href: '/contact', label: 'Contact', sheet: 'SHEET 05' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu automatically on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll cleanly without layout jump when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.documentElement.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [mobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-30 w-full bg-paper/95 backdrop-blur-md transition-all duration-200 ${
        scrolled ? 'border-b border-hairline shadow-xs' : 'border-b border-hairline/40'
      }`}
    >
      <div className="mx-auto flex h-14 sm:h-16 lg:h-20 w-full max-w-[1280px] items-center justify-between px-4 sm:px-8 lg:px-12">
        {/* Brand Wordmark (min 44px tap target) */}
        <Link
          href="/"
          className="group inline-flex items-center min-h-[44px] py-1 focus-visible:outline-2 focus-visible:outline-brass-deep"
          aria-label="Bhawanshilp Architect - Home"
          onClick={() => setMobileMenuOpen(false)}
        >
          <Wordmark size="default" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-8" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body text-xs font-medium uppercase tracking-[0.18em] transition-colors duration-150 min-h-[44px] inline-flex items-center ${
                  isActive
                    ? 'text-ink font-semibold border-b-2 border-ink pb-0.5'
                    : 'text-ink-soft hover:text-ink'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex md:items-center md:gap-4">
          <Button variant="primary" href="/contact">
            Book a consultation
          </Button>
        </div>

        {/* Mobile Actions in Header */}
        <div className="flex items-center gap-1.5 md:hidden">
          <a
            href={`tel:${siteConfig.phone}`}
            className="inline-flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center border border-hairline bg-paper text-ink transition-colors active:scale-95 hover:bg-paper-deep"
            aria-label={`Call ${siteConfig.phoneDisplay}`}
          >
            <PhoneIcon size={18} />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center border border-hairline bg-paper text-ink transition-all active:scale-95 hover:bg-paper-deep focus-visible:outline-2 focus-visible:outline-brass-deep"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile App-like Menu Sheet */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          className="fixed inset-x-0 top-14 sm:top-16 bottom-0 z-40 flex flex-col justify-between bg-paper/98 backdrop-blur-xl px-5 pt-6 pb-safe overflow-y-auto border-t border-hairline md:hidden animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between pb-3 border-b border-hairline">
              <SheetLabel>INDEX // DRAWING SHEETS</SheetLabel>
              <span className="font-mono text-[10px] text-ink-soft">KANPUR, UP</span>
            </div>

            {/* Large, touch-first nav links with active state */}
            <nav className="flex flex-col divide-y divide-hairline border-y border-hairline">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between py-4 min-h-[56px] transition-colors active:bg-paper-deep px-1 ${
                      isActive ? 'text-brass-deep font-medium' : 'text-ink'
                    }`}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-brass">{link.sheet}</span>
                      <span className="font-display text-2xl font-light tracking-tight">
                        {link.label}
                      </span>
                    </div>
                    <ArrowRightIcon size={16} className={isActive ? 'text-brass-deep' : 'text-hairline'} />
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Quick Actions & Studio Coordinates */}
          <div className="pt-6 mt-6 border-t border-hairline flex flex-col gap-4">
            <Button
              variant="primary"
              href="/contact"
              className="w-full text-center py-3.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book a consultation
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center justify-center gap-2 border border-hairline bg-paper px-3 py-2.5 font-mono text-xs text-ink min-h-[44px] active:scale-98"
              >
                <PhoneIcon size={14} />
                <span>Call Studio</span>
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-whatsapp text-white px-3 py-2.5 font-mono text-xs min-h-[44px] active:scale-98"
              >
                <WhatsAppIcon size={14} />
                <span>WhatsApp</span>
              </a>
            </div>

            <div className="font-mono text-[11px] text-ink-soft pt-2">
              <span className="font-medium text-ink block">{siteConfig.architect} &bull; Principal</span>
              <span className="block truncate">{siteConfig.address.full}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
