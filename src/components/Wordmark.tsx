export function Wordmark({
  className = '',
  size = 'default',
}: {
  className?: string;
  size?: 'small' | 'default' | 'large';
}) {
  const sizes = {
    small: { text: 'text-sm', sub: 'text-[9px]', gap: 'gap-0.5' },
    default: { text: 'text-lg', sub: 'text-[10px]', gap: 'gap-1' },
    large: { text: 'text-2xl', sub: 'text-xs', gap: 'gap-1' },
  };
  const s = sizes[size];

  return (
    <div className={`flex flex-col ${s.gap} ${className}`}>
      <span className={`${s.text} font-body font-semibold tracking-[0.25em] uppercase leading-none`}>
        Bhawanshilp
      </span>
      <span className={`${s.sub} font-body font-medium tracking-[0.35em] uppercase leading-none text-ink-soft`}>
        Architect
      </span>
    </div>
  );
}
