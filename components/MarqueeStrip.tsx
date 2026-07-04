'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SERVICES } from '@/lib/services-data';

gsap.registerPlugin(useGSAP);

export default function MarqueeStrip() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to('.mq-row-1', {
        xPercent: -50,
        ease: 'none',
        repeat: -1,
        duration: 34,
      });
      gsap.to('.mq-row-2', {
        xPercent: -50,
        ease: 'none',
        repeat: -1,
        duration: 24,
      });
    },
    { scope: containerRef }
  );

  const items = SERVICES.map((s) => ({ icon: s.icon, label: s.shortTitle }));
  const items2 = [...items.slice(16), ...items.slice(0, 16)];

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden py-5"
      style={{
        backgroundColor: '#060E1A',
        borderTop: '1px solid rgba(11, 155, 170, 0.1)',
        borderBottom: '1px solid rgba(11, 155, 170, 0.1)',
      }}
    >
      {/* Row 1 — slower */}
      <div
        className="mq-row-1 flex gap-5 mb-3"
        style={{ width: 'max-content', whiteSpace: 'nowrap' }}
      >
        {[...items, ...items].map(({ icon, label }, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium"
            style={{
              color: '#8BAFC0',
              backgroundColor: 'rgba(11, 155, 170, 0.07)',
              border: '1px solid rgba(11, 155, 170, 0.14)',
              flexShrink: 0,
            }}
          >
            <span>{icon}</span>
            {label}
          </span>
        ))}
      </div>

      {/* Row 2 — faster + offset */}
      <div
        className="mq-row-2 flex gap-5"
        style={{ width: 'max-content', whiteSpace: 'nowrap' }}
      >
        {[...items2, ...items2].map(({ icon, label }, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium"
            style={{
              color: '#16C4D6',
              backgroundColor: 'rgba(11, 58, 74, 0.25)',
              border: '1px solid rgba(22, 196, 214, 0.14)',
              flexShrink: 0,
            }}
          >
            <span>{icon}</span>
            {label}
          </span>
        ))}
      </div>

      {/* Fade edges */}
      <div
        className="absolute inset-y-0 left-0 w-20 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #060E1A, transparent)' }}
      />
      <div
        className="absolute inset-y-0 right-0 w-20 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #060E1A, transparent)' }}
      />
    </div>
  );
}
