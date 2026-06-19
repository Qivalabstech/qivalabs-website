'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const SERVICES_DROPDOWN = [
  {
    label: 'Mandi WhatsApp Automation',
    href: '/services/mandi-whatsapp-automation',
    tag: 'QIVA',
    desc: 'AI staff for mandi & wholesale businesses',
  },
  {
    label: 'AI CRM Automation',
    href: '/services/ai-crm-automation',
    tag: 'CRM',
    desc: 'AI triage layer on your existing CRM',
  },
  {
    label: 'WaitJI AI',
    href: 'https://waitjiai.in',
    tag: 'NEW',
    desc: "India's first AI ad marketplace in dev tools",
    external: true,
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-2 border-b border-[rgba(124,92,255,0.18)]' : 'py-4'
        }`}
        style={{
          background: scrolled ? 'rgba(11, 11, 18, 0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-violet rounded"
            aria-label="QivaLabs — Home"
          >
            <Logo height={34} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {/* Services with dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Link
                href="/services"
                className={`relative flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                  ${pathname.startsWith('/services') ? 'text-text-primary' : 'text-text-muted hover:text-text-primary'}`}
              >
                Services
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                {pathname.startsWith('/services') && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                    style={{ background: 'linear-gradient(90deg, #7C5CFF, #22D3EE)' }}
                  />
                )}
              </Link>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 mt-1 w-72 rounded-xl overflow-hidden"
                    style={{
                      background: 'rgba(15, 15, 24, 0.96)',
                      border: '1px solid rgba(124, 92, 255, 0.2)',
                      backdropFilter: 'blur(20px)',
                      boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                    }}
                  >
                    {SERVICES_DROPDOWN.map((item) => (
                      item.external ? (
                        <a
                          key={item.href}
                          href={item.href}
                          rel="noopener noreferrer"
                          className="flex items-start gap-3 px-4 py-3 group transition-colors hover:bg-[rgba(124,92,255,0.08)]"
                        >
                          <DropdownItem item={item} />
                        </a>
                      ) : (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-start gap-3 px-4 py-3 group transition-colors hover:bg-[rgba(124,92,255,0.08)]"
                        >
                          <DropdownItem item={item} />
                        </Link>
                      )
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other nav links */}
            {NAV_LINKS.filter(l => l.label !== 'Services').map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                    ${isActive ? 'text-text-primary' : 'text-text-muted hover:text-text-primary'}`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                      style={{ background: 'linear-gradient(90deg, #7C5CFF, #22D3EE)' }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/onboard-crm"
              className="px-4 py-2 text-sm font-medium text-text-muted hover:text-text-primary transition-colors rounded-lg"
            >
              CRM Onboarding
            </Link>
            <Link
              href="/enroll-mandi"
              className="btn-glow px-5 py-2 rounded-full text-sm font-semibold text-white transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #7C5CFF, #22D3EE)' }}
            >
              Enroll for Mandi →
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-surface-light transition-colors"
            onClick={() => setMenuOpen((p) => !p)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <motion.span
              className="block h-0.5 w-6 rounded bg-text-primary origin-center"
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-0.5 w-6 rounded bg-text-primary"
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="block h-0.5 w-6 rounded bg-text-primary origin-center"
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[60px] left-0 right-0 z-40 md:hidden border-b border-[rgba(124,92,255,0.18)]"
            style={{
              background: 'rgba(11, 11, 18, 0.97)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <nav className="flex flex-col px-4 py-4 gap-1" aria-label="Mobile navigation">
              <Link href="/services" className="text-left px-4 py-3 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-light transition-colors font-medium">
                Services Overview
              </Link>
              <Link href="/services/mandi-whatsapp-automation" className="text-left px-4 py-3 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-light transition-colors text-sm pl-8">
                ↳ Mandi WhatsApp Automation
              </Link>
              <Link href="/services/ai-crm-automation" className="text-left px-4 py-3 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-light transition-colors text-sm pl-8">
                ↳ AI CRM Automation
              </Link>
              <a href="https://waitjiai.in" rel="noopener noreferrer" className="text-left px-4 py-3 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-light transition-colors text-sm pl-8 flex items-center gap-2">
                ↳ WaitJI AI
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <Link href="/about" className="text-left px-4 py-3 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-light transition-colors font-medium">
                About
              </Link>
              <Link href="/contact" className="text-left px-4 py-3 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-light transition-colors font-medium">
                Contact
              </Link>
              <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-[rgba(124,92,255,0.15)]">
                <Link
                  href="/onboard-crm"
                  className="text-center px-5 py-3 rounded-full text-sm font-semibold text-text-muted border border-[rgba(124,92,255,0.3)] hover:border-accent-violet hover:text-text-primary transition-colors"
                >
                  CRM Onboarding
                </Link>
                <Link
                  href="/enroll-mandi"
                  className="text-center px-5 py-3 rounded-full text-sm font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #7C5CFF, #22D3EE)' }}
                >
                  Enroll for Mandi →
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function DropdownItem({ item }: { item: typeof SERVICES_DROPDOWN[number] }) {
  return (
    <>
      <span
        className="flex-shrink-0 mt-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded font-mono-accent"
        style={{ background: 'rgba(124,92,255,0.2)', color: '#A78BFA' }}
      >
        {item.tag}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium text-text-primary group-hover:text-accent-cyan transition-colors flex items-center gap-1.5">
          {item.label}
          {item.external && (
            <svg className="w-3 h-3 text-text-muted flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          )}
        </p>
        <p className="text-xs text-text-muted mt-0.5">{item.desc}</p>
      </div>
    </>
  );
}
