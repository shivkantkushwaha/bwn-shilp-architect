import Link from 'next/link';
import type { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'outline' | 'whatsapp' | 'ghost';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

interface ButtonAsButton extends ButtonBaseProps {
  href?: never;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  type?: never;
  disabled?: never;
  external?: boolean;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-brass text-paper hover:bg-brass-deep focus-visible:ring-brass-deep',
  outline:
    'border border-ink text-ink hover:bg-ink hover:text-paper focus-visible:ring-ink',
  whatsapp:
    'bg-whatsapp text-white hover:bg-whatsapp-dark focus-visible:ring-whatsapp',
  ghost:
    'text-ink-soft hover:text-ink focus-visible:ring-ink',
};

export function Button(props: ButtonProps) {
  const { variant = 'primary', children, className = '', onClick } = props;
  const base = `inline-flex items-center justify-center gap-2 rounded-none px-6 py-3 text-sm font-medium tracking-wide uppercase transition-all duration-150 min-h-[44px] min-w-[44px] font-body active:scale-[0.98] select-none ${variantStyles[variant]} ${className}`;

  if ('href' in props && props.href) {
    const { href, external } = props;
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
          className={base}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} onClick={onClick} className={base}>
        {children}
      </Link>
    );
  }

  const { type = 'button', disabled } = props as ButtonAsButton;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
}
