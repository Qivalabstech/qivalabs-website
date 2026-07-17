'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const NAV = [
  { label: 'Dashboard', href: '/admin', icon: '📊' },
  { label: 'Contacts', href: '/admin/contacts', icon: '📬' },
  { label: 'Jobs', href: '/admin/jobs', icon: '💼' },
  { label: 'Portfolio', href: '/admin/portfolio', icon: '🖼️' },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <aside
      className="flex flex-col"
      style={{
        width: '220px',
        minHeight: '100vh',
        backgroundColor: '#0A1628',
        borderRight: '1px solid rgba(11, 155, 170, 0.15)',
        padding: '1.5rem 1rem',
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <Link href="/admin" className="flex items-center gap-2.5 mb-8">
        <div
          style={{
            width: '32px', height: '32px', borderRadius: '8px',
            background: 'linear-gradient(135deg, #0B9BAA, #16C4D6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: '16px', color: '#0A1628',
          }}
        >
          Q
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-space-grotesk)', color: '#ffffff', fontWeight: 700, fontSize: '0.9rem' }}>
            QivaLabs
          </div>
          <div style={{ color: '#8BAFC0', fontSize: '0.65rem' }}>Admin</div>
        </div>
      </Link>

      {/* Nav links */}
      <nav className="flex flex-col gap-1 flex-1">
        {NAV.map(({ label, href, icon }) => {
          const isActive = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
              style={{
                color: isActive ? '#16C4D6' : '#8BAFC0',
                backgroundColor: isActive ? 'rgba(11, 155, 170, 0.12)' : 'transparent',
              }}
            >
              <span>{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        disabled={loggingOut}
        className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium mt-4 w-full"
        style={{ color: '#8BAFC0', cursor: 'pointer' }}
      >
        <span>🚪</span>
        {loggingOut ? 'Signing out…' : 'Sign out'}
      </button>

      {/* Site link */}
      <Link
        href="/"
        target="_blank"
        className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs mt-1"
        style={{ color: '#4A6E80' }}
      >
        <span>↗</span>
        View site
      </Link>
    </aside>
  );
}
