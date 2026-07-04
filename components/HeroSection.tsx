'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import GeometricBackground from './GeometricBackground';
import AnimatedCounter from './AnimatedCounter';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const STATS = [
  { value: 5, suffix: '+', label: 'Years experience' },
  { value: 60, suffix: '+', label: 'Projects delivered' },
  { value: 31, suffix: '', label: 'Services offered' },
  { value: 100, suffix: '%', label: 'Client satisfaction' },
];

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-badge', { opacity: 0, y: 14, duration: 0.45, delay: 0.15 })
        .from('.hero-word', { opacity: 0, y: 50, stagger: 0.09, duration: 0.6 }, '-=0.2')
        .from('.hero-grad-line', { opacity: 0, y: 50, duration: 0.6 }, '-=0.15')
        .from('.hero-sub', { opacity: 0, y: 22, duration: 0.5 }, '-=0.25')
        .from('.hero-btn', { opacity: 0, y: 14, stagger: 0.12, duration: 0.45 }, '-=0.25')
        .from('.hero-stats-row', { opacity: 0, y: 16, duration: 0.45 }, '-=0.2');

      gsap.to('.hero-content', {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ backgroundColor: '#0A1628' }}
    >
      <GeometricBackground />

      <div className="hero-content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-4xl">
          <div className="hero-badge">
            <span className="tag mb-6 inline-flex">Udaipur, Rajasthan · India</span>
          </div>

          <h1
            className="font-bold leading-tight mb-6"
            style={{
              fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
              fontSize: 'clamp(2.4rem, 6vw, 4.2rem)',
              color: '#ffffff',
            }}
          >
            <span className="hero-word inline-block" style={{ marginRight: '0.26em' }}>
              End-to-End
            </span>
            <span className="hero-word inline-block" style={{ marginRight: '0.26em' }}>
              Software
            </span>
            <br className="hidden sm:block" />
            <span
              className="hero-grad-line inline-block"
              style={{
                background: 'linear-gradient(135deg, #0B9BAA 0%, #16C4D6 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              &amp; Digital Solutions
            </span>
          </h1>

          <p className="hero-sub text-xl leading-relaxed mb-10 max-w-2xl" style={{ color: '#8BAFC0' }}>
            From custom software and mobile apps to AI automation and digital marketing —
            QivaLabs is your full-service IT partner for building, automating, and scaling
            your business.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/services"
              className="hero-btn inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm btn-glow"
              style={{
                background: 'linear-gradient(135deg, #0B9BAA, #16C4D6)',
                color: '#0A1628',
                boxShadow: '0 0 24px rgba(22, 196, 214, 0.3)',
              }}
            >
              Explore our services
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="hero-btn inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm transition-all"
              style={{
                backgroundColor: 'rgba(11, 155, 170, 0.12)',
                color: '#16C4D6',
                border: '1px solid rgba(11, 155, 170, 0.35)',
              }}
            >
              Get a free quote
            </Link>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div
        className="hero-stats-row relative z-10 w-full"
        style={{ borderTop: '1px solid rgba(11, 155, 170, 0.15)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map(({ value, suffix, label }) => (
              <div key={label} className="text-center">
                <div
                  className="text-3xl font-bold mb-1"
                  style={{
                    fontFamily: 'var(--font-space-grotesk)',
                    background: 'linear-gradient(135deg, #0B9BAA, #16C4D6)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  <AnimatedCounter to={value} suffix={suffix} />
                </div>
                <div className="text-xs uppercase tracking-wider" style={{ color: '#8BAFC0' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
