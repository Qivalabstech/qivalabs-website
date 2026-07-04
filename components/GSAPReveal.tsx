'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface GSAPRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
  distance?: number;
}

export default function GSAPReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 36,
}: GSAPRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const fromVars: gsap.TweenVars = {
        opacity: 0,
        ...(direction === 'up' && { y: distance }),
        ...(direction === 'left' && { x: -distance }),
        ...(direction === 'right' && { x: distance }),
        duration: 0.6,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      };
      gsap.from(ref.current, fromVars);
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function GSAPStagger({
  children,
  className = '',
  stagger = 0.1,
  childSelector = ':scope > *',
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  childSelector?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(childSelector, {
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
