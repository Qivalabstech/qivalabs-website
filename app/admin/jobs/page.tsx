'use client';

import { useEffect, useState, useCallback } from 'react';
import AdminNav from '@/components/AdminNav';
import type { JobListing, JobApplication, EmploymentType } from '@/lib/supabase';

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

type JobWithCount = JobListing & { application_count: number };

const EMPTY_FORM = {
  title: '',
  department: '',
  location: 'Udaipur, Rajasthan (Remote-friendly)',
  employment_type: 'full-time' as EmploymentType,
  is_commission_based: false,
  description: '',
  requirements: '',
  is_active: true,
};

function JobForm({
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
          <label className="block text-xs font-semibold mb-1 uppercase tracking-wider" style={{ color: '#8BAFC0' }}>Job title *</label>
          <input style={inputStyle} value={form.title} onChange={(e) => set('title', e.target.value)} required />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1 uppercase tracking-wider" style={{ color: '#8BAFC0' }}>Department</label>
          <input style={inputStyle} value={form.department} onChange={(e) => set('department', e.target.value)} placeholder="Sales, Engineering, Design…" />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1 uppercase tracking-wider" style={{ color: '#8BAFC0' }}>Location</label>
          <input style={inputStyle} value={form.location} onChange={(e) => set('location', e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1 uppercase tracking-wider" style={{ color: '#8BAFC0' }}>Employment type</label>
          <select
            style={inputStyle}
            value={form.employment_type}
            onChange={(e) => set('employment_type', e.target.value)}
          >
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="commission">Commission</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1 uppercase tracking-wider" style={{ color: '#8BAFC0' }}>Description *</label>
        <textarea
          style={{ ...inputStyle, minHeight: '140px', resize: 'vertical' }}
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1 uppercase tracking-wider" style={{ color: '#8BAFC0' }}>Requirements (one per line)</label>
        <textarea
          style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
          value={form.requirements}
          onChange={(e) => set('requirements', e.target.value)}
          placeholder="2+ years of sales experience&#10;Strong communication skills"
        />
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.is_commission_based}
            onChange={(e) => set('is_commission_based', e.target.checked)}
          />
          <span className="text-sm" style={{ color: '#C9D6D9' }}>Commission-based</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(e) => set('is_active', e.target.checked)}
          />
          <span className="text-sm" style={{ color: '#C9D6D9' }}>Active (visible on site)</span>
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2 rounded-lg text-sm font-semibold"
          style={{ background: 'linear-gradient(135deg, #0B9BAA, #16C4D6)', color: '#0A1628', opacity: saving ? 0.6 : 1 }}
        >
          {saving ? 'Saving…' : 'Save job'}
        </button>
        <button type="button" onClick={onCancel} className="px-5 py-2 rounded-lg text-sm font-medium" style={{ backgroundColor: 'rgba(11, 155, 170, 0.08)', color: '#8BAFC0' }}>
          Cancel
        </button>
      </div>
    </form>
  );
}

function ApplicationsModal({ job, onClose }: { job: JobWithCount; onClose: () => void }) {
  const [apps, setApps] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/jobs?applications=${job.id}`)
      .then((r) => r.json())
      .then((d) => { setApps(d); setLoading(false); });
  }, [job.id]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }} onClick={onClose}>
      <div
        className="w-full max-w-2xl rounded-2xl p-6"
        style={{ backgroundColor: '#0F2742', border: '1px solid rgba(11, 155, 170, 0.3)', maxHeight: '85vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#ffffff', fontSize: '1.1rem' }}>
            Applications — {job.title}
          </h2>
          <button onClick={onClose} style={{ color: '#4A6E80' }}>✕</button>
        </div>
        {loading ? (
          <p className="text-center py-8" style={{ color: '#8BAFC0' }}>Loading…</p>
        ) : apps.length === 0 ? (
          <p className="text-center py-8" style={{ color: '#8BAFC0' }}>No applications yet.</p>
        ) : (
          <div className="space-y-3">
            {apps.map((app) => (
              <div key={app.id} className="rounded-xl p-4" style={{ backgroundColor: 'rgba(10, 22, 40, 0.5)', border: '1px solid rgba(11, 155, 170, 0.1)' }}>
                <div className="flex items-start justify-between mb-1">
                  <span className="font-semibold text-sm" style={{ color: '#ffffff' }}>{app.applicant_name}</span>
                  <span className="text-xs" style={{ color: '#4A6E80' }}>{new Date(app.created_at).toLocaleDateString('en-IN')}</span>
                </div>
                <p className="text-xs mb-1" style={{ color: '#8BAFC0' }}>{app.email} · {app.phone}</p>
                {app.resume_url && (
                  <a href={app.resume_url} target="_blank" rel="noreferrer" className="text-xs" style={{ color: '#16C4D6' }}>View resume ↗</a>
                )}
                {app.cover_note && (
                  <p className="text-xs mt-2 leading-relaxed" style={{ color: '#C9D6D9' }}>{app.cover_note}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<JobWithCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editJob, setEditJob] = useState<JobWithCount | null>(null);
  const [viewApps, setViewApps] = useState<JobWithCount | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/admin/jobs');
    if (res.ok) setJobs(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async (form: typeof EMPTY_FORM) => {
    const reqs = form.requirements.split('\n').map((r) => r.trim()).filter(Boolean);
    await fetch('/api/admin/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, requirements: reqs }),
    });
    setShowForm(false);
    load();
  };

  const handleUpdate = async (form: typeof EMPTY_FORM) => {
    if (!editJob) return;
    const reqs = form.requirements.split('\n').map((r) => r.trim()).filter(Boolean);
    await fetch('/api/admin/jobs', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editJob.id, ...form, requirements: reqs }),
    });
    setEditJob(null);
    load();
  };

  const toggleActive = async (job: JobWithCount) => {
    await fetch('/api/admin/jobs', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: job.id, is_active: !job.is_active }),
    });
    setJobs((prev) => prev.map((j) => j.id === job.id ? { ...j, is_active: !j.is_active } : j));
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this job listing? Applications will also be removed.')) return;
    setDeleting(id);
    await fetch(`/api/admin/jobs?id=${id}`, { method: 'DELETE' });
    setJobs((prev) => prev.filter((j) => j.id !== id));
    setDeleting(null);
  };

  const editFormInitial = editJob ? {
    title: editJob.title,
    department: editJob.department,
    location: editJob.location,
    employment_type: editJob.employment_type,
    is_commission_based: editJob.is_commission_based,
    description: editJob.description,
    requirements: (editJob.requirements ?? []).join('\n'),
    is_active: editJob.is_active,
  } : EMPTY_FORM;

  return (
    <div className="flex" style={{ minHeight: '100vh', backgroundColor: '#070F1C' }}>
      <AdminNav />
      {viewApps && <ApplicationsModal job={viewApps} onClose={() => setViewApps(null)} />}

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-bold mb-1" style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: '1.6rem', color: '#ffffff' }}>Job listings</h1>
              <p className="text-sm" style={{ color: '#8BAFC0' }}>Manage open roles shown on the career page</p>
            </div>
            {!showForm && !editJob && (
              <button
                onClick={() => setShowForm(true)}
                className="px-4 py-2 rounded-lg text-sm font-semibold"
                style={{ background: 'linear-gradient(135deg, #0B9BAA, #16C4D6)', color: '#0A1628' }}
              >
                + Add job
              </button>
            )}
          </div>

          {(showForm || editJob) && (
            <div className="mb-6 p-6 rounded-2xl" style={{ backgroundColor: '#0F2742', border: '1px solid rgba(11, 155, 170, 0.3)' }}>
              <h2 className="font-semibold mb-5" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#ffffff' }}>
                {editJob ? 'Edit job listing' : 'New job listing'}
              </h2>
              <JobForm
                initial={editFormInitial}
                onSave={editJob ? handleUpdate : handleCreate}
                onCancel={() => { setShowForm(false); setEditJob(null); }}
              />
            </div>
          )}

          {loading ? (
            <div className="p-12 text-center" style={{ color: '#8BAFC0' }}>Loading…</div>
          ) : jobs.length === 0 ? (
            <div className="p-12 text-center rounded-2xl" style={{ ...cardStyle, color: '#8BAFC0' }}>No job listings yet.</div>
          ) : (
            <div className="space-y-3">
              {jobs.map((job) => (
                <div key={job.id} className="p-5 rounded-2xl" style={cardStyle}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <span className="font-semibold" style={{ color: '#ffffff', fontFamily: 'var(--font-space-grotesk)' }}>{job.title}</span>
                        <span
                          className="px-2 py-0.5 rounded text-xs font-semibold"
                          style={{
                            color: job.is_active ? '#16C4D6' : '#4A6E80',
                            backgroundColor: job.is_active ? 'rgba(22, 196, 214, 0.1)' : 'rgba(74, 110, 128, 0.1)',
                            border: `1px solid ${job.is_active ? 'rgba(22, 196, 214, 0.3)' : 'rgba(74, 110, 128, 0.3)'}`,
                          }}
                        >
                          {job.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <p className="text-xs" style={{ color: '#8BAFC0' }}>
                        {[job.department, job.location, job.employment_type].filter(Boolean).join(' · ')}
                        {job.is_commission_based && ' · Commission-based'}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => setViewApps(job)}
                        className="px-3 py-1.5 rounded text-xs font-medium"
                        style={{ backgroundColor: 'rgba(11, 155, 170, 0.08)', color: '#0B9BAA', border: '1px solid rgba(11, 155, 170, 0.2)' }}
                      >
                        {job.application_count} app{job.application_count !== 1 ? 's' : ''}
                      </button>
                      <button
                        onClick={() => toggleActive(job)}
                        className="px-3 py-1.5 rounded text-xs font-medium"
                        style={{ backgroundColor: 'rgba(11, 155, 170, 0.06)', color: '#8BAFC0', border: '1px solid rgba(11, 155, 170, 0.1)' }}
                      >
                        {job.is_active ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => { setEditJob(job); setShowForm(false); }}
                        className="px-3 py-1.5 rounded text-xs font-medium"
                        style={{ backgroundColor: 'rgba(11, 155, 170, 0.06)', color: '#8BAFC0', border: '1px solid rgba(11, 155, 170, 0.1)' }}
                      >
                        Edit
                      </button>
                      <button
                        disabled={deleting === job.id}
                        onClick={() => handleDelete(job.id)}
                        className="px-3 py-1.5 rounded text-xs font-medium"
                        style={{ backgroundColor: 'rgba(255, 80, 80, 0.06)', color: '#FF7B7B', border: '1px solid rgba(255, 80, 80, 0.2)' }}
                      >
                        {deleting === job.id ? '…' : 'Delete'}
                      </button>
                    </div>
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
