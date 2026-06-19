'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Field {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  options?: string[];
  rows?: number;
}

interface LeadFormProps {
  fields: Field[];
  endpoint: string;
  submitLabel?: string;
  successMessage?: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function LeadForm({
  fields,
  endpoint,
  submitLabel = 'Submit',
  successMessage = 'Submitted! Our team will contact you shortly.',
}: LeadFormProps) {
  const [form, setForm] = useState<Record<string, string>>(
    Object.fromEntries(fields.map((f) => [f.id, '']))
  );
  const [status, setStatus] = useState<Status>('idle');

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');

    try {
      // Determine the API URL: prefer NEXT_PUBLIC_API_URL if set, else fall back to Next.js route
      const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ?? '';
      const url = base ? `${base}${endpoint}` : `/api${endpoint}`;

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Server error');
      setStatus('success');
      setForm(Object.fromEntries(fields.map((f) => [f.id, ''])));
    } catch {
      setStatus('error');
    }
  }

  const inputBase =
    'w-full px-4 py-3 rounded-xl text-text-primary text-sm outline-none transition-all duration-200 placeholder:text-[rgba(160,160,178,0.4)]';
  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(124, 92, 255, 0.2)',
    color: '#F4F4F8',
  };
  const focusBorder = 'rgba(124, 92, 255, 0.6)';
  const blurBorder = 'rgba(124, 92, 255, 0.2)';

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-2xl p-10 text-center flex flex-col items-center gap-4"
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
          style={{ background: 'rgba(34, 211, 238, 0.15)' }}
        >
          ✓
        </div>
        <h3 className="font-heading font-bold text-text-primary text-xl">You&apos;re enrolled!</h3>
        <p className="text-text-muted text-sm leading-relaxed max-w-sm">{successMessage}</p>
        <a
          href="https://wa.me/917231873730"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white text-sm"
          style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Chat with our team on WhatsApp
        </a>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {fields.map((field) => (
        <div key={field.id}>
          <label htmlFor={field.id} className="block text-sm text-text-muted mb-1.5">
            {field.label}
            {field.required && (
              <span aria-hidden="true" className="text-accent-coral ml-1">*</span>
            )}
          </label>

          {field.type === 'textarea' ? (
            <textarea
              id={field.id}
              name={field.id}
              rows={field.rows ?? 4}
              required={field.required}
              placeholder={field.placeholder}
              value={form[field.id]}
              onChange={handleChange}
              className={`${inputBase} resize-none`}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = focusBorder)}
              onBlur={(e) => (e.target.style.borderColor = blurBorder)}
            />
          ) : field.type === 'select' ? (
            <select
              id={field.id}
              name={field.id}
              required={field.required}
              value={form[field.id]}
              onChange={handleChange}
              className={inputBase}
              style={{ ...inputStyle, appearance: 'none' }}
              onFocus={(e) => (e.target.style.borderColor = focusBorder)}
              onBlur={(e) => (e.target.style.borderColor = blurBorder)}
            >
              <option value="" disabled style={{ background: '#15151F' }}>
                {field.placeholder ?? 'Select…'}
              </option>
              {field.options?.map((opt) => (
                <option key={opt} value={opt} style={{ background: '#15151F' }}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={field.id}
              name={field.id}
              type={field.type}
              required={field.required}
              autoComplete={field.autoComplete}
              placeholder={field.placeholder}
              value={form[field.id]}
              onChange={handleChange}
              className={inputBase}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = focusBorder)}
              onBlur={(e) => (e.target.style.borderColor = blurBorder)}
            />
          )}
        </div>
      ))}

      <motion.button
        type="submit"
        disabled={status === 'loading'}
        className="btn-glow w-full py-4 rounded-xl font-semibold text-white text-base mt-2"
        style={{ background: 'linear-gradient(135deg, #7C5CFF, #22D3EE)' }}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        {status === 'loading' ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Submitting…
          </span>
        ) : (
          submitLabel
        )}
      </motion.button>

      <AnimatePresence>
        {status === 'error' && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center text-sm py-2.5 px-4 rounded-xl"
            style={{ background: 'rgba(255, 120, 73, 0.1)', color: '#FF7849' }}
          >
            Something went wrong. Please{' '}
            <a href="https://wa.me/917231873730" target="_blank" rel="noopener noreferrer" className="underline">
              WhatsApp us
            </a>{' '}
            directly.
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
