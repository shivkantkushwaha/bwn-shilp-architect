'use client';

import Link from 'next/link';
import { siteConfig } from '@/data/site';
import { Wordmark } from '@/components/Wordmark';
import { SheetLabel } from '@/components/SheetLabel';
import {
  PhoneIcon,
  WhatsAppIcon,
  InstagramIcon,
  FacebookIcon,
  MapPinIcon,
  ClockIcon,
  StarIcon,
} from '@/components/icons';

const NAV_LINKS = [
  { href: '/projects', label: 'Projects' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const CURRENT_YEAR = 2026;

export function Footer() {
  return (
    <footer className="w-full border-t border-hairline bg-paper text-ink pb-20 lg:pb-0">
      {/* Top Architectural Title Block Grid */}
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 divide-y divide-hairline border-x border-hairline lg:grid-cols-12 lg:divide-x lg:divide-y-0">
          {/* Col 1: Identity & Hindi Name */}
          <div className="p-6 sm:p-8 lg:col-span-4 flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-4">
              <SheetLabel>FIRM SPECIFICATION // 01</SheetLabel>
              <div className="flex flex-col gap-2">
                <Wordmark size="large" />
                <span className="font-devanagari text-base text-ink-soft tracking-normal mt-1">
                  {siteConfig.nameHindi}
                </span>
              </div>
              <p className="font-body text-sm text-ink-soft leading-relaxed max-w-sm">
                {siteConfig.description}
              </p>
            </div>

            <div className="flex flex-col gap-1 border-t border-hairline pt-4 font-mono text-xs text-ink-soft">
              <span className="font-medium text-ink">{siteConfig.architect}</span>
              <span className="text-[11px] text-ink-soft/80">Architecture & Design Consultancy</span>
            </div>
          </div>

          {/* Col 2: Navigation & Services Index */}
          <div className="p-6 sm:p-8 lg:col-span-3 flex flex-col justify-between gap-6">
            <div>
              <SheetLabel>INDEX // NAVIGATION</SheetLabel>
              <nav className="mt-4 flex flex-col space-y-3" aria-label="Footer Navigation">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-body text-sm uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="border-t border-hairline pt-4">
              <SheetLabel className="block mb-2">AREAS SERVED</SheetLabel>
              <p className="font-mono text-xs text-ink-soft leading-relaxed">
                {siteConfig.areasServed.join(' · ')}
              </p>
            </div>
          </div>

          {/* Col 3: Studio & Location */}
          <div className="p-6 sm:p-8 lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <SheetLabel>STUDIO LOCATION // KANPUR</SheetLabel>

              <div className="flex items-start gap-3">
                <MapPinIcon size={18} className="mt-0.5 shrink-0 text-brass-deep" />
                <address className="not-italic font-body text-sm text-ink-soft leading-relaxed">
                  <span className="text-ink font-medium block">{siteConfig.address.line1}</span>
                  <span>{siteConfig.address.line2}</span>
                  <br />
                  <span>
                    {siteConfig.address.city}, {siteConfig.address.state} — {siteConfig.address.pincode}
                  </span>
                </address>
              </div>

              <div className="flex items-center gap-3 font-mono text-xs text-ink-soft">
                <ClockIcon size={16} className="shrink-0 text-ink-soft" />
                <span>{siteConfig.hours.display}</span>
              </div>

              {/* Google Reviews Badge */}
              <a
                href={siteConfig.google.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-hairline bg-paper-deep px-3 py-2 text-xs transition-colors hover:border-ink w-fit"
              >
                <div className="flex items-center text-brass">
                  <StarIcon size={14} fill="#B98A2E" />
                </div>
                <span className="font-mono font-medium text-ink">{siteConfig.google.rating} / 5.0</span>
                <span className="font-body text-ink-soft">({siteConfig.google.reviews} Google reviews)</span>
              </a>
            </div>

            {/* Communication channels */}
            <div className="border-t border-hairline pt-4 flex flex-col gap-3">
              <SheetLabel>DIRECT INQUIRY</SheetLabel>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-mono">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="inline-flex items-center gap-1.5 text-ink hover:text-brass-deep transition-colors"
                >
                  <PhoneIcon size={14} />
                  <span>{siteConfig.phoneDisplay}</span>
                </a>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-ink hover:text-whatsapp transition-colors"
                >
                  <WhatsAppIcon size={14} />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-1.5 text-ink hover:text-brass-deep transition-colors"
                >
                  <span>{siteConfig.email}</span>
                </a>
              </div>

              <div className="flex items-center gap-4 pt-1">
                <a
                  href={siteConfig.social.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-soft hover:text-ink transition-colors"
                  aria-label={`Instagram ${siteConfig.social.instagram.handle}`}
                >
                  <InstagramIcon size={18} />
                </a>
                <a
                  href={siteConfig.social.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-soft hover:text-ink transition-colors"
                  aria-label={`Facebook ${siteConfig.social.facebook.handle}`}
                >
                  <FacebookIcon size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Title Block Bottom Hairline Strip */}
        <div className="border-x border-b border-hairline py-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px] text-ink-soft">
          <div className="flex flex-wrap items-center gap-3">
            <span>© {CURRENT_YEAR} {siteConfig.name}.</span>
            <span className="hidden sm:inline">|</span>
            <span>All rights reserved.</span>
            {siteConfig.showPreviewBadge && (
              <span className="inline-flex items-center border border-brass/50 bg-brass/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-brass-deep">
                Preview Mode
              </span>
            )}
          </div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft/70">
            KANPUR ARCHITECTURAL REGISTER // REV. 2026
          </div>
        </div>
      </div>
    </footer>
  );
}
