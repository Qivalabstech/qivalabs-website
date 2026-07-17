import { supabase } from '@/lib/supabase';
import AdminNav from '@/components/AdminNav';
import Link from 'next/link';

async function getDashboardStats() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { newContacts: 0, activeJobs: 0, totalApplications: 0, portfolioItems: 0 };
  }
  const [contactsRes, jobsRes, appsRes, portfolioRes] = await Promise.all([
    supabase.from('contact_submissions').select('id', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('job_listings').select('id', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('job_applications').select('id', { count: 'exact', head: true }),
    supabase.from('portfolio_items').select('id', { count: 'exact', head: true }),
  ]);
  return {
    newContacts: contactsRes.count ?? 0,
    activeJobs: jobsRes.count ?? 0,
    totalApplications: appsRes.count ?? 0,
    portfolioItems: portfolioRes.count ?? 0,
  };
}

const cardStyle: React.CSSProperties = {
  backgroundColor: '#0F2742',
  border: '1px solid rgba(11, 155, 170, 0.18)',
  borderRadius: '12px',
  padding: '1.5rem',
};

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  const CARDS = [
    { label: 'New contacts', value: stats.newContacts, href: '/admin/contacts', icon: '📬', color: '#16C4D6', note: 'Unread submissions' },
    { label: 'Active job listings', value: stats.activeJobs, href: '/admin/jobs', icon: '💼', color: '#0B9BAA', note: 'Currently open' },
    { label: 'Job applications', value: stats.totalApplications, href: '/admin/jobs', icon: '👥', color: '#16C4D6', note: 'Total received' },
    { label: 'Portfolio items', value: stats.portfolioItems, href: '/admin/portfolio', icon: '🖼️', color: '#0B9BAA', note: 'All projects' },
  ];

  return (
    <div className="flex" style={{ minHeight: '100vh', backgroundColor: '#070F1C' }}>
      <AdminNav />

      <main className="flex-1 p-8">
        <div className="max-w-5xl">
          <h1
            className="font-bold mb-2"
            style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: '1.6rem', color: '#ffffff' }}
          >
            Dashboard
          </h1>
          <p className="mb-8 text-sm" style={{ color: '#8BAFC0' }}>
            Welcome back. Here&apos;s what&apos;s happening on qivalabs.com.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {CARDS.map((card) => (
              <Link key={card.label} href={card.href}>
                <div style={{ ...cardStyle, cursor: 'pointer' }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl">{card.icon}</span>
                    <span className="text-xs" style={{ color: '#4A6E80' }}>{card.note}</span>
                  </div>
                  <div
                    className="font-bold mb-1"
                    style={{ fontSize: '2rem', color: card.color, fontFamily: 'var(--font-space-grotesk)' }}
                  >
                    {card.value}
                  </div>
                  <div className="text-xs font-medium" style={{ color: '#8BAFC0' }}>{card.label}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick links */}
          <div style={cardStyle}>
            <h2
              className="font-semibold mb-4"
              style={{ fontFamily: 'var(--font-space-grotesk)', color: '#ffffff', fontSize: '1rem' }}
            >
              Quick actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'View new contacts', href: '/admin/contacts', desc: 'See all unread enquiries' },
                { label: 'Add a job listing', href: '/admin/jobs', desc: 'Post a new open role' },
                { label: 'Add portfolio item', href: '/admin/portfolio', desc: 'Add a new project' },
                { label: 'View all applications', href: '/admin/jobs', desc: 'See who has applied' },
              ].map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center justify-between p-4 rounded-lg transition-colors"
                  style={{
                    backgroundColor: 'rgba(11, 155, 170, 0.06)',
                    border: '1px solid rgba(11, 155, 170, 0.12)',
                  }}
                >
                  <div>
                    <div className="text-sm font-medium" style={{ color: '#C9D6D9' }}>{action.label}</div>
                    <div className="text-xs" style={{ color: '#4A6E80' }}>{action.desc}</div>
                  </div>
                  <span style={{ color: '#16C4D6' }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
