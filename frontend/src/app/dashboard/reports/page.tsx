"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function GenerateReport() {
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
    
    // Simulate API call to generate report
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSuccess('Report generated successfully! Download starting...');
    setLoading(false);

    // Redirect back to dashboard after a delay
    setTimeout(() => {
      router.push('/dashboard');
    }, 2500);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', background: 'var(--bg-color)', transition: 'background 0.3s ease', justifyItems: 'center', justifyContent: 'center', padding: '3rem' }}>
      <main style={{ width: '100%', maxWidth: '800px' }}>
        
        {/* Header with Back Button */}
        <header style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <button onClick={() => router.back()} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'var(--text-main)', fontSize: '1.2rem', cursor: 'pointer' }}>
            ←
          </button>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', margin: 0, letterSpacing: '-0.5px' }}>Generate Report</h1>
            <p style={{ color: 'var(--text-muted)' }}>Export hospital analytics, financial summaries, or patient data.</p>
          </div>
        </header>

        {/* Success Message */}
        {success && (
          <div style={{ background: 'rgba(52, 152, 219, 0.1)', color: '#2980b9', padding: '1.2rem', borderRadius: '12px', marginBottom: '2rem', fontWeight: 600, border: '1px solid rgba(52, 152, 219, 0.3)', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <span>✅</span> {success}
          </div>
        )}

        {/* Report Builder Form */}
        <div style={{ background: 'var(--glass-bg)', padding: '2.5rem', borderRadius: '24px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <label style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '1.1rem' }}>Report Type</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.4)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)', cursor: 'pointer' }}>
                  <input type="radio" name="reportType" defaultChecked style={{ width: '18px', height: '18px' }} />
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Patient Demographics</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.4)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)', cursor: 'pointer' }}>
                  <input type="radio" name="reportType" style={{ width: '18px', height: '18px' }} />
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Financial Summary</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.4)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)', cursor: 'pointer' }}>
                  <input type="radio" name="reportType" style={{ width: '18px', height: '18px' }} />
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Appointment History</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.4)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)', cursor: 'pointer' }}>
                  <input type="radio" name="reportType" style={{ width: '18px', height: '18px' }} />
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Staff Capacity</span>
                </label>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 600, color: 'var(--text-main)' }}>Date Range (Start)</label>
                <input type="date" required disabled={loading || !!success} style={{ padding: '0.8rem', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.5)', color: '#1e293b' }} />
              </div>
              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 600, color: 'var(--text-main)' }}>Date Range (End)</label>
                <input type="date" required disabled={loading || !!success} style={{ padding: '0.8rem', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.5)', color: '#1e293b' }} />
              </div>
            </div>

            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: 600, color: 'var(--text-main)' }}>Export Format</label>
              <select required disabled={loading || !!success} style={{ padding: '0.8rem', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.5)', color: '#1e293b', fontFamily: 'inherit' }}>
                <option value="pdf">PDF Document (.pdf)</option>
                <option value="csv">CSV Spreadsheet (.csv)</option>
                <option value="excel">Excel Workbook (.xlsx)</option>
                <option value="json">JSON Data (.json)</option>
              </select>
            </div>

            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: 600, color: 'var(--text-main)' }}>Additional Filters / Notes</label>
              <textarea rows={3} placeholder="E.g. Only include patients with active status..." disabled={loading || !!success} style={{ padding: '0.8rem', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.5)', color: '#1e293b', fontFamily: 'inherit', resize: 'vertical' }}></textarea>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem', borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }}>
              <button type="button" onClick={() => router.back()} disabled={loading || !!success} className="btn" style={{ padding: '0.8rem 2rem', background: 'transparent', border: '1px solid var(--text-muted)', color: 'var(--text-main)', borderRadius: '50px', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
              <button className="btn btn-primary" type="submit" disabled={loading || !!success} style={{ padding: '0.8rem 2rem', borderRadius: '50px', border: 'none', background: 'var(--primary)', color: 'white', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {loading ? 'Compiling Data...' : <><span>⬇️</span> Generate & Download</>}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
