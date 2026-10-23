'use client';

import { useState, useEffect } from 'react';
import { siteConfig } from '@/data/site';
import { PhoneIcon, WhatsAppIcon } from '@/components/icons';

export function MobileBottomBar() {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    // Detect focus on form fields or visualViewport resize on mobile
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT')
      ) {
        setKeyboardVisible(true);
      }
    };

    const handleFocusOut = () => {
      setKeyboardVisible(false);
    };

    const handleViewportResize = () => {
      if (window.visualViewport) {
        // If visual viewport height is significantly less than window.innerHeight, keyboard is active
        const isShrunk = window.visualViewport.height < window.innerHeight * 0.75;
        setKeyboardVisible(isShrunk);
      }
    };

    window.addEventListener('focusin', handleFocusIn);
    window.addEventListener('focusout', handleFocusOut);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportResize);
    }

    return () => {
      window.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('focusout', handleFocusOut);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleViewportResize);
      }
    };
  }, []);

  // Hide when keyboard is active
  if (keyboardVisible) {
    return null;
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-30 border-t border-hairline bg-paper/95 backdrop-blur-md px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] lg:hidden transition-transform duration-200"
      role="region"
      aria-label="Quick Actions"
    >
      <div className="grid grid-cols-2 gap-2.5">
        <a
          href={`tel:${siteConfig.phone}`}
          className="inline-flex items-center justify-center gap-2 border border-ink bg-paper px-4 py-3 text-xs font-semibold uppercase tracking-wider text-ink transition-all active:scale-[0.98] min-h-[46px] shadow-xs"
          aria-label="Call Ar. Mayank Tiwari"
        >
          <PhoneIcon size={16} />
          <span>Call Us</span>
        </a>
        <a
          href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
            'Hello Bhawanshilp Architect, I would like to inquire about architectural consultancy services.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-whatsapp text-white px-4 py-3 text-xs font-semibold uppercase tracking-wider transition-all active:scale-[0.98] min-h-[46px] shadow-xs"
          aria-label="Chat with Ar. Mayank Tiwari on WhatsApp"
        >
          <WhatsAppIcon size={16} />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
