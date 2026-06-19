'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface ServiceCardProps {
  tag: string;
  tagColor?: string;
  title: string;
  description: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
  external?: boolean;
  accentColor?: string;
  glowColor?: string;
  delay?: number;
}

export default function ServiceCard({
  tag,
  tagColor = 'rgba(124,92,255,0.2)',
  title,
  description,
  bullets,
  ctaLabel,
  ctaHref,
  external = false,
  accentColor = '#7C5CFF',
  glowColor = 'rgba(124, 92, 255, 0.15)',
  delay = 0,
}: ServiceCardProps) {
  const cardContent = (
    <motion.div
      className="relative h-full rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: 'rgba(21, 21, 31, 0.7)',
        border: '1px solid rgba(124, 92, 255, 0.18)',
        backdropFilter: 'blur(20px)',
      }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{
        y: -6,
        boxShadow: `0 24px 60px ${glowColor}`,
        borderColor: accentColor + '55',
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
      />

      <div className="p-7 flex flex-col gap-5 flex-1">
        {/* Tag */}
        <span
          className="self-start text-xs font-bold px-3 py-1 rounded-full font-mono-accent uppercase tracking-wider"
          style={{ background: tagColor, color: accentColor }}
        >
          {tag}
        </span>

        {/* Title */}
        <h3
          className="font-heading font-bold text-xl text-text-primary leading-snug"
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-text-muted text-sm leading-relaxed">{description}</p>

        {/* Bullets */}
        <ul className="flex flex-col gap-2 flex-1">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-text-muted">
              <span style={{ color: accentColor }} className="mt-0.5 flex-shrink-0 font-bold">✓</span>
              {b}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-auto pt-2">
          {external ? (
            <a
              href={ctaHref}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors group"
              style={{ color: accentColor }}
            >
              {ctaLabel}
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ) : (
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors group"
              style={{ color: accentColor }}
            >
              {ctaLabel}
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );

  return cardContent;
}
