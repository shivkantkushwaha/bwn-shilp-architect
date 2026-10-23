'use client';

import type { ReactNode } from 'react';
import { useReveal } from '@/hooks/useReveal';

interface SectionProps {
  children: ReactNode;
  dark?: boolean;
  className?: string;
  id?: string;
  noPadding?: boolean;
}

export function Section({
  children,
  dark = false,
  className = '',
  id,
  noPadding = false,
}: SectionProps) {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id={id}
      className={`reveal ${
        dark ? 'bg-ink text-paper' : 'bg-paper text-ink'
      } ${noPadding ? '' : 'py-16 sm:py-20 lg:py-28'} ${className}`}
    >
      {children}
    </section>
  );
}
