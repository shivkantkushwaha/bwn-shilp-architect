'use client';

import { siteConfig } from '@/data/site';
import { WhatsAppIcon } from '@/components/icons';

export function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
        'Hello Bhawanshilp Architect, I would like to inquire about architectural consultancy services.'
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-8 right-8 z-40 hidden lg:inline-flex items-center gap-2.5 bg-whatsapp px-4 py-3 text-xs font-medium uppercase tracking-wider text-white shadow-lg transition-all duration-200 hover:bg-whatsapp-dark hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-whatsapp"
    >
      <WhatsAppIcon size={20} />
      <span>WhatsApp</span>
    </a>
  );
}
