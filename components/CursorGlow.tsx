'use client';

import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP);

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  useGSAP(
    () => {
      const el = glowRef.current;
      if (!el) return;

      gsap.ticker.add(() => {
        gsap.to(el, {
          x: pos.current.x - 200,
          y: pos.current.y - 200,
          duration: 0.7,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });
    },
    { scope: glowRef }
  );

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-0"
      style={{
        background: 'radial-gradient(circle, rgba(11, 155, 170, 0.06) 0%, transparent 65%)',
        willChange: 'transform',
      }}
      aria-hidden="true"
    />
  );
}
