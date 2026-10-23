'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProjectImageProps {
  src: string;
  alt: string;
  title?: string;
  aspectRatio?: '4/5' | '3/2' | '16/9' | '1/1';
  priority?: boolean;
  sizes?: string;
  className?: string;
  fill?: boolean;
}

export function ProjectImage({
  src,
  alt,
  title,
  aspectRatio = '3/2',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  className = '',
  fill = false,
}: ProjectImageProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        className={`relative flex items-center justify-center bg-paper-deep border border-hairline overflow-hidden ${className}`}
        style={fill ? { position: 'absolute', inset: 0 } : { aspectRatio }}
      >
        {/* Crosshair lines */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-full h-px bg-hairline" />
          <div className="absolute h-full w-px bg-hairline" />
        </div>
        {/* Project title */}
        {title && (
          <span className="relative z-10 font-mono text-xs uppercase tracking-widest text-ink-soft px-4 text-center">
            {title}
          </span>
        )}
      </div>
    );
  }

  if (fill) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-500 hover:scale-[1.02]"
          onError={() => setError(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden border border-hairline ${className}`}
      style={{ aspectRatio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-500 hover:scale-[1.02]"
        onError={() => setError(true)}
      />
    </div>
  );
}
