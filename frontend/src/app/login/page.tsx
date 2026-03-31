"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setSuccess('Account created successfully! Please log in.');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // MOCK BACKEND FOR VERCEL PREVIEW
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess('Successfully signed in! Redirecting to dashboard...');
      
      // Mock navigation to dashboard
      setTimeout(() => {
         router.push('/');
      }, 1500);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <main>
      <div className="hero-container auth-container">
        <h1>Welcome Back</h1>
        <p className="subtitle">Log in to access your dashboard</p>
        
        {error && <div style={{ color: '#e74c3c', backgroundColor: 'rgba(231, 76, 60, 0.1)', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}
        {success && <div style={{ color: '#2ecc71', backgroundColor: 'rgba(46, 204, 113, 0.1)', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem', fontWeight: 600 }}>{success}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" required placeholder="admin@hospital.com" value={formData.email} onChange={handleChange} disabled={loading} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required placeholder="••••••••" value={formData.password} onChange={handleChange} disabled={loading} />
          </div>
          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? 'Logging In...' : 'Log In'}
          </button>
        </form>
        <p className="auth-footer">
          Don't have an account? <Link href="/signup" className="text-primary">Sign Up</Link>
        </p>
      </div>
    </main>
  );
}
