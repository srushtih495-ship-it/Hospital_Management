"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NewPatient() {
  const router = useRouter();
  const [theme, setTheme] = useState('system');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setTheme(savedTheme);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call to save patient
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update live dashboard stats
    const savedStats = localStorage.getItem('hospitalStats');
    if (savedStats) {
      const statsObj = JSON.parse(savedStats);
      statsObj.patients += 1;
      localStorage.setItem('hospitalStats', JSON.stringify(statsObj));
    }
    
    setSuccess('Patient registered successfully!');
    setLoading(false);

    // Redirect back to dashboard after 2s
    setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', background: 'var(--bg-color)', transition: 'background 0.3s ease', justifyContent: 'center', padding: '3rem' }}>
      <main style={{ width: '100%', maxWidth: '800px' }}>
        
        {/* Header with Back Button */}
        <header style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <Link href="/dashboard" style={{ textDecoration: 'none' }}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'var(--text-main)', fontSize: '1.2rem', cursor: 'pointer' }}>
              ←
            </span>
          </Link>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', margin: 0, letterSpacing: '-0.5px' }}>Register New Patient</h1>
            <p style={{ color: 'var(--text-muted)' }}>Enter the patient details below to add them to the system.</p>
          </div>
        </header>

        {/* Success Message */}
        {success && (
          <div style={{ background: 'rgba(46, 204, 113, 0.1)', color: '#27ae60', padding: '1rem', borderRadius: '12px', marginBottom: '2rem', fontWeight: 600, border: '1px solid rgba(46, 204, 113, 0.3)' }}>
            {success} Redirecting to dashboard...
          </div>
        )}

        {/* Patient Form */}
        <div style={{ background: 'var(--glass-bg)', padding: '2.5rem', borderRadius: '24px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 600, color: 'var(--text-main)' }}>First Name</label>
                <input type="text" required placeholder="Jane" disabled={loading || !!success} style={{ padding: '0.8rem', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.5)', color: '#1e293b' }} />
              </div>
              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 600, color: 'var(--text-main)' }}>Last Name</label>
                <input type="text" required placeholder="Doe" disabled={loading || !!success} style={{ padding: '0.8rem', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.5)', color: '#1e293b' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 600, color: 'var(--text-main)' }}>Date of Birth</label>
                <input type="date" required disabled={loading || !!success} style={{ padding: '0.8rem', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.5)', color: '#1e293b' }} />
              </div>
              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 600, color: 'var(--text-main)' }}>Phone Number</label>
                <input type="tel" required placeholder="(555) 123-4567" disabled={loading || !!success} style={{ padding: '0.8rem', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.5)', color: '#1e293b' }} />
              </div>
            </div>

            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: 600, color: 'var(--text-main)' }}>Email Address</label>
              <input type="email" placeholder="jane.doe@example.com" disabled={loading || !!success} style={{ padding: '0.8rem', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.5)', color: '#1e293b' }} />
            </div>

            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: 600, color: 'var(--text-main)' }}>Medical History / Notes</label>
              <textarea rows={4} placeholder="Any known allergies or existing conditions..." disabled={loading || !!success} style={{ padding: '0.8rem', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.5)', color: '#1e293b', fontFamily: 'inherit', resize: 'vertical' }}></textarea>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
              <Link href="/dashboard" style={{ textDecoration: 'none' }}>
                <div className="btn" style={{ padding: '0.8rem 2rem', background: 'transparent', border: '1px solid var(--text-muted)', color: 'var(--text-main)', borderRadius: '50px', cursor: 'pointer', fontWeight: 600 }}>Cancel</div>
              </Link>
              <button className="btn btn-primary" type="submit" disabled={loading || !!success} style={{ padding: '0.8rem 2rem', borderRadius: '50px', border: 'none', background: 'var(--primary)', color: 'white', fontWeight: 600, cursor: 'pointer' }}>
                {loading ? 'Saving...' : 'Register Patient'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
