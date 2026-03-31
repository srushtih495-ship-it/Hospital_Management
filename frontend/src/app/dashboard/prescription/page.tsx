"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreatePrescription() {
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
    
    // Simulate API call to save prescription
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSuccess('Prescription generated successfully!');
    setLoading(false);

    // Redirect back to dashboard after 2s
    setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
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
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', margin: 0, letterSpacing: '-0.5px' }}>Create Prescription</h1>
            <p style={{ color: 'var(--text-muted)' }}>Generate and detail a new medical prescription for a patient.</p>
          </div>
        </header>

        {/* Success Message */}
        {success && (
          <div style={{ background: 'rgba(46, 204, 113, 0.1)', color: '#27ae60', padding: '1rem', borderRadius: '12px', marginBottom: '2rem', fontWeight: 600, border: '1px solid rgba(46, 204, 113, 0.3)' }}>
            {success} Redirecting back to Dashboard...
          </div>
        )}

        {/* Prescription Form */}
        <div style={{ background: 'var(--glass-bg)', padding: '2.5rem', borderRadius: '24px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 600, color: 'var(--text-main)' }}>Patient Name or ID</label>
                <input type="text" required placeholder="Search for patient..." disabled={loading || !!success} style={{ padding: '0.8rem', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.5)', color: '#1e293b' }} />
              </div>
              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 600, color: 'var(--text-main)' }}>Issuing Doctor</label>
                <select required disabled={loading || !!success} style={{ padding: '0.8rem', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.5)', color: '#1e293b', fontFamily: 'inherit' }}>
                  <option value="" disabled selected>Select prescribing doctor...</option>
                  <option value="dr-smith">Dr. Sarah Smith (Cardiology)</option>
                  <option value="dr-doe">Dr. John Doe (Neurology)</option>
                  <option value="dr-chen">Dr. Emily Chen (Pediatrics)</option>
                  <option value="dr-admin">Admin User (General)</option>
                </select>
              </div>
            </div>

            <div style={{ background: 'var(--bg-color)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--glass-border)', marginTop: '0.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Medication Details</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>Drug Name</label>
                  <input type="text" required placeholder="e.g. Amoxicillin" disabled={loading || !!success} style={{ padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>Dosage</label>
                  <input type="text" required placeholder="e.g. 500mg" disabled={loading || !!success} style={{ padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>Frequency</label>
                  <input type="text" required placeholder="e.g. 2x Daily" disabled={loading || !!success} style={{ padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>Instructions</label>
                <input type="text" placeholder="Take with food..." disabled={loading || !!success} style={{ padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }} />
              </div>
              
              <button type="button" disabled={loading || !!success} style={{ marginTop: '1.5rem', background: 'transparent', border: '1px dashed var(--primary)', color: 'var(--primary)', padding: '0.6rem 1rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, width: '100%' }}>
                + Add Another Medication
              </button>
            </div>

            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: 600, color: 'var(--text-main)' }}>Additional Doctor Notes</label>
              <textarea rows={3} placeholder="Follow up in two weeks if symptoms persist..." disabled={loading || !!success} style={{ padding: '0.8rem', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.5)', color: '#1e293b', fontFamily: 'inherit', resize: 'vertical' }}></textarea>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
              <button type="button" onClick={() => router.back()} disabled={loading || !!success} className="btn" style={{ padding: '0.8rem 2rem', background: 'transparent', border: '1px solid var(--text-muted)', color: 'var(--text-main)', borderRadius: '50px', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
              <button className="btn btn-primary" type="submit" disabled={loading || !!success} style={{ padding: '0.8rem 2rem', borderRadius: '50px', border: 'none', background: 'var(--primary)', color: 'white', fontWeight: 600, cursor: 'pointer' }}>
                {loading ? 'Generating...' : 'Save & Generate Prescription'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
