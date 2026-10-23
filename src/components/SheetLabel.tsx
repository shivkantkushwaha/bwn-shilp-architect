import type { ReactNode } from 'react';

export function SheetLabel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-ink-soft ${className}`}>
      {children}
    </span>
  );
}
