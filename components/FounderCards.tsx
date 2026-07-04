'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Founder {
  name: string;
  role: string;
  description: string;
  initials: string;
}

export default function FounderCards({ founders }: { founders: Founder[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.batch('.founder-card', {
        onEnter: (elements) => {
          gsap.fromTo(
            elements,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              stagger: 0.14,
              ease: 'power3.out',
            }
          );
        },
        start: 'top 85%',
        once: true,
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {founders.map((founder) => (
        <motion.div
          key={founder.name}
          className="founder-card"
          whileHover={{ y: -6 }}
          transition={{ type: 'spring', stiffness: 360, damping: 22 }}
        >
          <div
            className="p-6 rounded-xl card-angular h-full"
            style={{
              backgroundColor: '#0F2742',
              border: '1px solid rgba(11, 155, 170, 0.18)',
              transition: 'border-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(22, 196, 214, 0.4)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(11, 155, 170, 0.18)';
            }}
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold mb-5"
              style={{
                background: 'linear-gradient(135deg, #0B9BAA, #16C4D6)',
                color: '#0A1628',
                fontFamily: 'var(--font-space-grotesk)',
              }}
            >
              {founder.initials}
            </div>
            <h3
              className="font-bold mb-1 text-lg"
              style={{ fontFamily: 'var(--font-space-grotesk)', color: '#ffffff' }}
            >
              {founder.name}
            </h3>
            <p className="text-sm mb-4" style={{ color: '#16C4D6' }}>
              {founder.role}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: '#8BAFC0' }}>
              {founder.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
