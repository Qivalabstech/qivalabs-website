'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface LogoProps {
  className?: string;
  height?: number;
}

export default function Logo({ className = '', height = 36 }: LogoProps) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    // Try SVG first, fall back to PNG
    const svg = '/logo.svg';
    const png = '/logo.png';

    const img = new window.Image();
    img.onload = () => setSrc(svg);
    img.onerror = () => {
      const img2 = new window.Image();
      img2.onload = () => setSrc(png);
      img2.onerror = () => {
        // Neither found
        console.warn(
          '[QivaLabs] Logo file not found. ' +
          'Please add logo.svg (or logo.png) to the /public directory. ' +
          'A placeholder is shown in its place.'
        );
        setSrc(null);
      };
      img2.src = png;
    };
    img.src = svg;
  }, []);

  if (src === null && typeof window !== 'undefined') {
    // Placeholder slot — clearly labelled
    return (
      /* <!-- LOGO PLACEHOLDER: replace by adding /public/logo.svg or /public/logo.png --> */
      <div
        className={`flex items-center gap-2 ${className}`}
        title="Logo placeholder — add /public/logo.svg or /public/logo.png"
        role="img"
        aria-label="QivaLabs logo (placeholder)"
      >
        <div
          className="flex items-center justify-center rounded-lg font-bold text-white text-sm"
          style={{
            width: height,
            height: height,
            background: 'linear-gradient(135deg, #7C5CFF, #22D3EE)',
            fontSize: Math.round(height * 0.44),
            letterSpacing: '-0.03em',
          }}
        >
          Q
        </div>
        <span
          className="font-heading font-bold tracking-tight"
          style={{
            fontSize: Math.round(height * 0.56),
            background: 'linear-gradient(135deg, #F4F4F8, #A0A0B2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          QivaLabs
        </span>
      </div>
    );
  }

  if (src === null) {
    // SSR fallback (hydration-safe)
    return (
      <div className={`flex items-center gap-2 ${className}`} aria-label="QivaLabs">
        <span
          className="font-heading font-bold tracking-tight"
          style={{ fontSize: Math.round(height * 0.56), color: '#F4F4F8' }}
        >
          QivaLabs
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src={src}
        alt="QivaLabs"
        height={height}
        width={height * 4}
        style={{ height, width: 'auto', objectFit: 'contain' }}
        priority
      />
    </div>
  );
}
