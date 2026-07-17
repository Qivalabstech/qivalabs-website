import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin — QivaLabs',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#070F1C', fontFamily: 'var(--font-inter)' }}>
      {children}
    </div>
  );
}
