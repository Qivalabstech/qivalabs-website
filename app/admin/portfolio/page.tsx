'use client';

import { useEffect, useState, useCallback } from 'react';
import AdminNav from '@/components/AdminNav';
import type { PortfolioItem } from '@/lib/supabase';

const cardStyle: React.CSSProperties = {
  backgroundColor: '#0F2742',
  border: '1px solid rgba(11, 155, 170, 0.18)',
  borderRadius: '12px',
};

const inputStyle: React.CSSProperties = {
  backgroundColor: 'rgba(10, 22, 40, 0.7)',
  border: '1px solid rgba(11, 155, 170, 0.2)',
  borderRadius: '8px',
  color: '#C9D6D9',
  padding: '0.6rem 0.875rem',
  fontSize: '0.875rem',
  width: '100%',
  outline: 'none',
};

const EMPTY_FORM = {
  title: '',
  category: '',
  description: '',
  tags: '',
  highlight: '',
  link: '',
  is_external: true,
  icon: '🚀',
  is_visible: true,
};

function PortfolioForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: typeof EMPTY_FORM;
  onSave: (data: typeof EMPTY_FORM) => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const set = (k: keyof typeof EMPTY_FORM, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold mb-1 uppercase tracking-wider" style={{ color: '#8BAFC0' }}>Title *</label>
          <input style={inputStyle} value={form.title} onChange={(e) => set('title', e.target.value)} required />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1 uppercase tracking-wider" style={{ color: '#8BAFC0' }}>Category</label>
          <input style={inputStyle} value={form.category} onChange={(e) => set('category', e.target.value)} placeholder="Web App, Mobile, Automation…" />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1 uppercase tracking-wider" style={{ color: '#8BAFC0' }}>Icon (emoji)</label>
          <input style={inputStyle} value={form.icon} onChange={(e) => set('icon', e.target.value)} placeholder="🚀" />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1 uppercase tracking-wider" style={{ color: '#8BAFC0' }}>Highlight (one-liner stat)</label>
          <input style={inputStyle} value={form.highlight} onChange={(e) => set('highlight', e.target.value)} placeholder="Served 500+ users" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1 uppercase tracking-wider" style={{ color: '#8BAFC0' }}>Description *</label>
        <textarea
          style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1 uppercase tracking-wider" style={{ color: '#8BAFC0' }}>Tags (comma-separated)</label>
        <input style={inputStyle} value={form.tags} onChange={(e) => set('tags', e.target.value)} placeholder="Next.js, Supabase, WhatsApp API" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold mb-1 uppercase tracking-wider" style={{ color: '#8BAFC0' }}>Link URL</label>
          <input style={inputStyle} value={form.link} onChange={(e) => set('link', e.target.value)} placeholder="https://…" type="url" />
        </div>
        <div className="flex items-end gap-6 pb-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.is_external} onChange={(e) => set('is_external', e.target.checked)} />
            <span className="text-sm" style={{ color: '#C9D6D9' }}>External link</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.is_visible} onChange={(e) => set('is_visible', e.target.checked)} />
            <span className="text-sm" style={{ color: '#C9D6D9' }}>Visible on site</span>
          </label>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2 rounded-lg text-sm font-semibold"
          style={{ background: 'linear-gradient(135deg, #0B9BAA, #16C4D6)', color: '#0A1628', opacity: saving ? 0.6 : 1 }}
        >
          {saving ? 'Saving…' : 'Save item'}
        </button>
        <button type="button" onClick={onCancel} className="px-5 py-2 rounded-lg text-sm font-medium" style={{ backgroundColor: 'rgba(11, 155, 170, 0.08)', color: '#8BAFC0' }}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<PortfolioItem | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/admin/portfolio');
    if (res.ok) setItems(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async (form: typeof EMPTY_FORM) => {
    const tags = form.tags.split(',').map((t) => t.trim()).filter(Boolean);
    await fetch('/api/admin/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, tags, link: form.link || null }),
    });
    setShowForm(false);
    load();
  };

  const handleUpdate = async (form: typeof EMPTY_FORM) => {
    if (!editItem) return;
    const tags = form.tags.split(',').map((t) => t.trim()).filter(Boolean);
    await fetch('/api/admin/portfolio', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editItem.id, ...form, tags, link: form.link || null }),
    });
    setEditItem(null);
    load();
  };

  const toggleVisible = async (item: PortfolioItem) => {
    await fetch('/api/admin/portfolio', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: item.id, is_visible: !item.is_visible }),
    });
    setItems((prev) => prev.map((i) => i.id === item.id ? { ...i, is_visible: !i.is_visible } : i));
  };

  const move = async (index: number, direction: 'up' | 'down') => {
    const newItems = [...items];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= newItems.length) return;
    [newItems[index], newItems[swapIndex]] = [newItems[swapIndex], newItems[index]];
    setItems(newItems);

    await Promise.all([
      fetch('/api/admin/portfolio', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: newItems[index].id, display_order: index + 1 }),
      }),
      fetch('/api/admin/portfolio', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: newItems[swapIndex].id, display_order: swapIndex + 1 }),
      }),
    ]);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this portfolio item?')) return;
    setDeleting(id);
    await fetch(`/api/admin/portfolio?id=${id}`, { method: 'DELETE' });
    setItems((prev) => prev.filter((i) => i.id !== id));
    setDeleting(null);
  };

  const editFormInitial = editItem ? {
    title: editItem.title,
    category: editItem.category,
    description: editItem.description,
    tags: (editItem.tags ?? []).join(', '),
    highlight: editItem.highlight ?? '',
    link: editItem.link ?? '',
    is_external: editItem.is_external,
    icon: editItem.icon,
    is_visible: editItem.is_visible,
  } : EMPTY_FORM;

  return (
    <div className="flex" style={{ minHeight: '100vh', backgroundColor: '#070F1C' }}>
      <AdminNav />

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-bold mb-1" style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: '1.6rem', color: '#ffffff' }}>Portfolio</h1>
              <p className="text-sm" style={{ color: '#8BAFC0' }}>Manage and reorder portfolio items shown on the site</p>
            </div>
            {!showForm && !editItem && (
              <button
                onClick={() => setShowForm(true)}
                className="px-4 py-2 rounded-lg text-sm font-semibold"
                style={{ background: 'linear-gradient(135deg, #0B9BAA, #16C4D6)', color: '#0A1628' }}
              >
                + Add item
              </button>
            )}
          </div>

          {(showForm || editItem) && (
            <div className="mb-6 p-6 rounded-2xl" style={{ backgroundColor: '#0F2742', border: '1px solid rgba(11, 155, 170, 0.3)' }}>
              <h2 className="font-semibold mb-5" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#ffffff' }}>
                {editItem ? 'Edit portfolio item' : 'New portfolio item'}
              </h2>
              <PortfolioForm
                initial={editFormInitial}
                onSave={editItem ? handleUpdate : handleCreate}
                onCancel={() => { setShowForm(false); setEditItem(null); }}
              />
            </div>
          )}

          {loading ? (
            <div className="p-12 text-center" style={{ color: '#8BAFC0' }}>Loading…</div>
          ) : items.length === 0 ? (
            <div className="p-12 text-center rounded-2xl" style={{ ...cardStyle, color: '#8BAFC0' }}>No portfolio items yet.</div>
          ) : (
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={item.id} className="p-5 rounded-2xl flex items-start gap-4" style={cardStyle}>
                  {/* Reorder */}
                  <div className="flex flex-col gap-1 flex-shrink-0 pt-0.5">
                    <button
                      onClick={() => move(index, 'up')}
                      disabled={index === 0}
                      className="w-7 h-7 rounded flex items-center justify-center text-xs"
                      style={{ backgroundColor: 'rgba(11, 155, 170, 0.08)', color: index === 0 ? '#2A3F55' : '#8BAFC0' }}
                      title="Move up"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => move(index, 'down')}
                      disabled={index === items.length - 1}
                      className="w-7 h-7 rounded flex items-center justify-center text-xs"
                      style={{ backgroundColor: 'rgba(11, 155, 170, 0.08)', color: index === items.length - 1 ? '#2A3F55' : '#8BAFC0' }}
                      title="Move down"
                    >
                      ↓
                    </button>
                  </div>

                  {/* Icon */}
                  <div
                    className="flex-shrink-0 flex items-center justify-center rounded-xl text-2xl"
                    style={{ width: '52px', height: '52px', backgroundColor: 'rgba(11, 155, 170, 0.1)', border: '1px solid rgba(11, 155, 170, 0.15)' }}
                  >
                    {item.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <span className="font-semibold text-sm" style={{ color: '#ffffff', fontFamily: 'var(--font-space-grotesk)' }}>{item.title}</span>
                      {item.category && (
                        <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(11, 155, 170, 0.1)', color: '#0B9BAA', border: '1px solid rgba(11, 155, 170, 0.2)' }}>
                          {item.category}
                        </span>
                      )}
                      <span
                        className="text-xs px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: item.is_visible ? 'rgba(22, 196, 214, 0.08)' : 'rgba(74, 110, 128, 0.08)',
                          color: item.is_visible ? '#16C4D6' : '#4A6E80',
                          border: `1px solid ${item.is_visible ? 'rgba(22, 196, 214, 0.2)' : 'rgba(74, 110, 128, 0.2)'}`,
                        }}
                      >
                        {item.is_visible ? 'Visible' : 'Hidden'}
                      </span>
                    </div>
                    <p className="text-xs mb-2 leading-relaxed" style={{ color: '#8BAFC0' }}>{item.description.slice(0, 120)}{item.description.length > 120 ? '…' : ''}</p>
                    {(item.tags ?? []).length > 0 && (
                      <div className="flex gap-1.5 flex-wrap">
                        {(item.tags ?? []).slice(0, 4).map((tag) => (
                          <span key={tag} className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(10, 22, 40, 0.5)', color: '#4A6E80', border: '1px solid rgba(11, 155, 170, 0.08)' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => toggleVisible(item)}
                      className="px-3 py-1.5 rounded text-xs font-medium"
                      style={{ backgroundColor: 'rgba(11, 155, 170, 0.06)', color: '#8BAFC0', border: '1px solid rgba(11, 155, 170, 0.1)' }}
                    >
                      {item.is_visible ? 'Hide' : 'Show'}
                    </button>
                    <button
                      onClick={() => { setEditItem(item); setShowForm(false); }}
                      className="px-3 py-1.5 rounded text-xs font-medium"
                      style={{ backgroundColor: 'rgba(11, 155, 170, 0.06)', color: '#8BAFC0', border: '1px solid rgba(11, 155, 170, 0.1)' }}
                    >
                      Edit
                    </button>
                    <button
                      disabled={deleting === item.id}
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-1.5 rounded text-xs font-medium"
                      style={{ backgroundColor: 'rgba(255, 80, 80, 0.06)', color: '#FF7B7B', border: '1px solid rgba(255, 80, 80, 0.2)' }}
                    >
                      {deleting === item.id ? '…' : 'Delete'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
