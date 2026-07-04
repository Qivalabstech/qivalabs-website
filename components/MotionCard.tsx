'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface MotionCardProps {
  href: string;
  icon: string;
  title: string;
  tagline: string;
  index?: number;
}

export default function MotionCard({ href, icon, title, tagline, index = 0 }: MotionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.52,
        delay: (index % 3) * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -7,
        transition: { type: 'spring', stiffness: 380, damping: 22 },
      }}
      whileTap={{ scale: 0.97 }}
      style={{ willChange: 'transform' }}
    >
      <Link
        href={href}
        className="block p-6 rounded-xl card-angular h-full"
        style={{
          backgroundColor: '#0F2742',
          border: '1px solid rgba(11, 155, 170, 0.18)',
          transition: 'border-color 0.2s ease, box-shadow 0.25s ease',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.borderColor = 'rgba(22, 196, 214, 0.45)';
          el.style.boxShadow = '0 12px 40px rgba(11, 155, 170, 0.18)';
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.borderColor = 'rgba(11, 155, 170, 0.18)';
          el.style.boxShadow = 'none';
        }}
      >
        <span className="text-3xl mb-4 block">{icon}</span>
        <h3
          className="text-lg font-semibold mb-2"
          style={{ fontFamily: 'var(--font-space-grotesk)', color: '#ffffff' }}
        >
          {title}
        </h3>
        <p className="text-sm leading-relaxed mb-4" style={{ color: '#8BAFC0' }}>
          {tagline}
        </p>
        <span
          className="inline-flex items-center gap-1 text-sm font-medium"
          style={{ color: '#0B9BAA' }}
        >
          Learn more
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </Link>
    </motion.div>
  );
}
