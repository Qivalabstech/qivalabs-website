'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        setError('Invalid password.');
      }
    } catch {
      setError('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: '#0A1628' }}
    >
      <div
        className="w-full max-w-sm p-8 rounded-2xl"
        style={{ backgroundColor: '#0F2742', border: '1px solid rgba(11, 155, 170, 0.2)' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-base"
            style={{ background: 'linear-gradient(135deg, #0B9BAA, #16C4D6)', color: '#0A1628' }}
          >
            Q
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-space-grotesk)', color: '#ffffff', fontWeight: 700, fontSize: '1rem' }}>
              QivaLabs
            </div>
            <div style={{ color: '#8BAFC0', fontSize: '0.72rem' }}>Admin Panel</div>
          </div>
        </div>

        <h1
          className="font-bold mb-6"
          style={{ fontFamily: 'var(--font-space-grotesk)', color: '#ffffff', fontSize: '1.3rem' }}
        >
          Sign in
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold mb-1.5 uppercase tracking-wider"
              style={{ color: '#8BAFC0' }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              className="w-full px-4 py-3 rounded-lg text-sm outline-none"
              style={{
                backgroundColor: 'rgba(10, 22, 40, 0.7)',
                border: '1px solid rgba(11, 155, 170, 0.25)',
                color: '#C9D6D9',
                fontFamily: 'var(--font-inter)',
              }}
            />
          </div>

          {error && (
            <p className="text-sm" style={{ color: '#FF7B7B' }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-sm"
            style={{
              background: loading ? 'rgba(11, 155, 170, 0.4)' : 'linear-gradient(135deg, #0B9BAA, #16C4D6)',
              color: '#0A1628',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Signing in…' : 'Sign in →'}
          </button>
        </form>
      </div>
    </div>
  );
}
