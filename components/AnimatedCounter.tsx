'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function AnimatedCounter({
  from = 0,
  to,
  duration = 1.6,
  prefix = '',
  suffix = '',
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const counterRef = useRef({ val: from });

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      gsap.to(counterRef.current, {
        val: to,
        duration,
        ease: 'power2.out',
        roundProps: 'val',
        onUpdate: () => {
          el.textContent = `${prefix}${counterRef.current.val.toLocaleString('en-IN')}${suffix}`;
        },
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
          once: true,
        },
      });
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={className}>
      {prefix}{from.toLocaleString('en-IN')}{suffix}
    </span>
  );
}
