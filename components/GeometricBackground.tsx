'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP);

const DOTS = [
  { left: '14%', top: '22%', size: 3, color: '#0B9BAA' },
  { left: '82%', top: '12%', size: 2, color: '#16C4D6' },
  { left: '65%', top: '68%', size: 4, color: '#0B9BAA' },
  { left: '92%', top: '55%', size: 2, color: '#16C4D6' },
  { left: '30%', top: '80%', size: 3, color: '#0B9BAA' },
  { left: '72%', top: '28%', size: 2, color: '#16C4D6' },
  { left: '18%', top: '58%', size: 2, color: '#0B9BAA' },
  { left: '50%', top: '42%', size: 2, color: '#16C4D6' },
];

export default function GeometricBackground() {
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to('.geo-tri-1', {
        rotation: 360,
        duration: 80,
        ease: 'none',
        repeat: -1,
        transformOrigin: 'center center',
      });
      gsap.to('.geo-tri-2', {
        rotation: -360,
        duration: 120,
        ease: 'none',
        repeat: -1,
        transformOrigin: 'center center',
      });

      DOTS.forEach((_, i) => {
        gsap.to(`.geo-dot-${i}`, {
          y: gsap.utils.random(-18, 18),
          x: gsap.utils.random(-12, 12),
          duration: gsap.utils.random(3.5, 6.5),
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 0.45,
        });
      });
    },
    { scope: bgRef }
  );

  return (
    <div
      ref={bgRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      {/* Aurora blobs */}
      <div className="teal-blob teal-blob-1" />
      <div className="teal-blob teal-blob-2" />
      <div className="teal-blob teal-blob-3" />

      {/* Background polygon geometry */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <polygon points="1440,0 900,0 1440,500" fill="rgba(11, 155, 170, 0.035)" />
        <polygon points="0,900 400,900 0,500" fill="rgba(11, 58, 74, 0.08)" />
        <polygon points="1100,200 1440,400 1100,600" fill="rgba(22, 196, 214, 0.04)" />
        <polygon points="0,300 180,200 180,400" fill="rgba(11, 155, 170, 0.06)" />
        <polygon points="700,50 820,150 700,250 580,150" fill="rgba(22, 196, 214, 0.03)" />
      </svg>

      {/* Subtle grid */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03]"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 130} y1="0" x2={i * 130} y2="900" stroke="#0B9BAA" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 130} x2="1440" y2={i * 130} stroke="#0B9BAA" strokeWidth="0.5" />
        ))}
      </svg>

      {/* GSAP-rotating logo-echo triangles */}
      <div className="geo-tri-1 absolute right-[8%] top-[15%] opacity-[0.07]">
        <svg width="320" height="384" viewBox="0 0 40 48" fill="none">
          <polygon points="0,0 40,24 0,24" fill="#0B9BAA" />
          <polygon points="0,24 40,24 0,48" fill="#0B3A4A" />
          <polygon points="0,4 30,22 0,20" fill="#E8EEF0" opacity="0.3" />
        </svg>
      </div>
      <div className="geo-tri-2 absolute left-[5%] bottom-[20%] opacity-[0.06]">
        <svg width="120" height="144" viewBox="0 0 40 48" fill="none">
          <polygon points="0,0 40,24 0,24" fill="#16C4D6" />
          <polygon points="0,24 40,24 0,48" fill="#0B3A4A" />
        </svg>
      </div>

      {/* Floating dots */}
      {DOTS.map((d, i) => (
        <div
          key={i}
          className={`geo-dot-${i} absolute rounded-full`}
          style={{
            left: d.left,
            top: d.top,
            width: `${d.size}px`,
            height: `${d.size}px`,
            backgroundColor: d.color,
            opacity: 0.22,
          }}
        />
      ))}
    </div>
  );
}
