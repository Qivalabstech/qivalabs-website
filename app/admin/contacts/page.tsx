'use client';

import { useEffect, useState, useCallback } from 'react';
import AdminNav from '@/components/AdminNav';
import type { ContactSubmission, ContactStatus } from '@/lib/supabase';

const STATUS_COLORS: Record<ContactStatus, string> = {
  new: '#16C4D6',
  read: '#8BAFC0',
  archived: '#4A6E80',
};

const STATUS_LABELS: Record<ContactStatus, string> = {
  new: 'New',
  read: 'Read',
  archived: 'Archived',
};

const cardStyle: React.CSSProperties = {
  backgroundColor: '#0F2742',
  border: '1px solid rgba(11, 155, 170, 0.18)',
  borderRadius: '12px',
};

function Badge({ status }: { status: ContactStatus }) {
  return (
    <span
      className="px-2 py-0.5 rounded text-xs font-semibold"
      style={{ color: STATUS_COLORS[status], backgroundColor: `${STATUS_COLORS[status]}18`, border: `1px solid ${STATUS_COLORS[status]}44` }}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

function Modal({ contact, onClose, onStatusChange }: {
  contact: ContactSubmission;
  onClose: () => void;
  onStatusChange: (id: string, status: ContactStatus) => void;
}) {
  const [updating, setUpdating] = useState(false);

  const update = async (status: ContactStatus) => {
    setUpdating(true);
    await fetch('/api/admin/contacts', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: contact.id, status }) });
    onStatusChange(contact.id, status);
    setUpdating(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl p-6"
        style={{ backgroundColor: '#0F2742', border: '1px solid rgba(11, 155, 170, 0.3)', maxHeight: '85vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="font-semibold text-lg" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#ffffff' }}>{contact.name}</h2>
            <p className="text-sm" style={{ color: '#8BAFC0' }}>{contact.email} · {contact.phone}</p>
          </div>
          <button onClick={onClose} className="text-lg" style={{ color: '#4A6E80' }}>✕</button>
        </div>

        {contact.company && (
          <p className="text-xs mb-1" style={{ color: '#8BAFC0' }}><strong>Company:</strong> {contact.company}</p>
        )}
        {contact.service && (
          <p className="text-xs mb-3" style={{ color: '#8BAFC0' }}><strong>Service:</strong> {contact.service}</p>
        )}

        <div className="rounded-lg p-4 mb-4 text-sm leading-relaxed" style={{ backgroundColor: 'rgba(10, 22, 40, 0.5)', color: '#C9D6D9', border: '1px solid rgba(11, 155, 170, 0.1)' }}>
          {contact.message}
        </div>

        <div className="flex items-center justify-between">
          <Badge status={contact.status} />
          <div className="flex gap-2">
            {contact.status !== 'read' && (
              <button
                disabled={updating}
                onClick={() => update('read')}
                className="px-3 py-1.5 rounded text-xs font-medium"
                style={{ backgroundColor: 'rgba(11, 155, 170, 0.12)', color: '#16C4D6', border: '1px solid rgba(11, 155, 170, 0.25)' }}
              >
                Mark read
              </button>
            )}
            {contact.status !== 'archived' && (
              <button
                disabled={updating}
                onClick={() => update('archived')}
                className="px-3 py-1.5 rounded text-xs font-medium"
                style={{ backgroundColor: 'rgba(74, 110, 128, 0.1)', color: '#4A6E80', border: '1px solid rgba(74, 110, 128, 0.25)' }}
              >
                Archive
              </button>
            )}
            {contact.status !== 'new' && (
              <button
                disabled={updating}
                onClick={() => update('new')}
                className="px-3 py-1.5 rounded text-xs font-medium"
                style={{ backgroundColor: 'rgba(22, 196, 214, 0.1)', color: '#16C4D6', border: '1px solid rgba(22, 196, 214, 0.25)' }}
              >
                Mark new
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function exportCSV(contacts: ContactSubmission[]) {
  const headers = ['Name', 'Email', 'Phone', 'Company', 'Service', 'Status', 'Date', 'Message'];
  const rows = contacts.map((c) => [
    c.name, c.email, c.phone, c.company, c.service, c.status,
    new Date(c.created_at).toLocaleDateString('en-IN'),
    `"${c.message.replace(/"/g, '""')}"`,
  ]);
  const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `contacts-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

type FilterTab = 'all' | ContactStatus;

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ContactSubmission | null>(null);
  const [filter, setFilter] = useState<FilterTab>('all');

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/admin/contacts');
    if (res.ok) setContacts(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleStatusChange = (id: string, status: ContactStatus) => {
    setContacts((prev) => prev.map((c) => c.id === id ? { ...c, status } : c));
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, status } : null);
  };

  const filtered = filter === 'all' ? contacts : contacts.filter((c) => c.status === filter);

  const counts = {
    all: contacts.length,
    new: contacts.filter((c) => c.status === 'new').length,
    read: contacts.filter((c) => c.status === 'read').length,
    archived: contacts.filter((c) => c.status === 'archived').length,
  };

  const TABS: { key: FilterTab; label: string }[] = [
    { key: 'all', label: `All (${counts.all})` },
    { key: 'new', label: `New (${counts.new})` },
    { key: 'read', label: `Read (${counts.read})` },
    { key: 'archived', label: `Archived (${counts.archived})` },
  ];

  return (
    <div className="flex" style={{ minHeight: '100vh', backgroundColor: '#070F1C' }}>
      <AdminNav />
      {selected && <Modal contact={selected} onClose={() => setSelected(null)} onStatusChange={handleStatusChange} />}

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-bold mb-1" style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: '1.6rem', color: '#ffffff' }}>
                Contact submissions
              </h1>
              <p className="text-sm" style={{ color: '#8BAFC0' }}>All enquiries from the contact form</p>
            </div>
            <button
              onClick={() => exportCSV(filtered)}
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{ backgroundColor: 'rgba(11, 155, 170, 0.1)', color: '#16C4D6', border: '1px solid rgba(11, 155, 170, 0.25)' }}
            >
              Export CSV
            </button>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
                style={{
                  backgroundColor: filter === tab.key ? 'rgba(11, 155, 170, 0.15)' : 'transparent',
                  color: filter === tab.key ? '#16C4D6' : '#8BAFC0',
                  border: `1px solid ${filter === tab.key ? 'rgba(11, 155, 170, 0.4)' : 'rgba(11, 155, 170, 0.12)'}`,
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div style={cardStyle}>
            {loading ? (
              <div className="p-12 text-center" style={{ color: '#8BAFC0' }}>Loading…</div>
            ) : filtered.length === 0 ? (
              <div className="p-12 text-center" style={{ color: '#8BAFC0' }}>No submissions found.</div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(11, 155, 170, 0.1)' }}>
                    {['Name', 'Email', 'Service', 'Date', 'Status', ''].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left font-semibold"
                        style={{ color: '#4A6E80', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c, i) => (
                    <tr
                      key={c.id}
                      style={{
                        borderBottom: i < filtered.length - 1 ? '1px solid rgba(11, 155, 170, 0.06)' : 'none',
                        cursor: 'pointer',
                      }}
                      onClick={() => setSelected(c)}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(11, 155, 170, 0.04)'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
                    >
                      <td className="px-4 py-3 font-medium" style={{ color: c.status === 'new' ? '#ffffff' : '#C9D6D9' }}>{c.name}</td>
                      <td className="px-4 py-3" style={{ color: '#8BAFC0' }}>{c.email}</td>
                      <td className="px-4 py-3" style={{ color: '#8BAFC0' }}>{c.service || '—'}</td>
                      <td className="px-4 py-3 whitespace-nowrap" style={{ color: '#4A6E80', fontSize: '0.78rem' }}>
                        {new Date(c.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-4 py-3"><Badge status={c.status} /></td>
                      <td className="px-4 py-3 text-right" style={{ color: '#4A6E80', fontSize: '0.75rem' }}>View →</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
