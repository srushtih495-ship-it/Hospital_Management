"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ScheduleAppointment() {
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
    
    // Simulate API call to schedule appointment
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update live dashboard stats
    const savedStats = localStorage.getItem('hospitalStatsV2');
    if (savedStats) {
      const statsObj = JSON.parse(savedStats);
      statsObj.appointments += 1;
      localStorage.setItem('hospitalStatsV2', JSON.stringify(statsObj));
    }
    
    setSuccess('Appointment perfectly scheduled!');
    setLoading(false);

    // Redirect back to dashboard after 2s
    setTimeout(() => {
      router.push('/dashboard/appointments');
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', background: 'var(--bg-color)', transition: 'background 0.3s ease', justifyContent: 'center', padding: '3rem' }}>
      <main style={{ width: '100%', maxWidth: '800px' }}>
        
        {/* Header with Back Button */}
        <header style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <button onClick={() => router.back()} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'var(--text-main)', fontSize: '1.2rem', cursor: 'pointer' }}>
            ←
          </button>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', margin: 0, letterSpacing: '-0.5px' }}>Schedule Appointment</h1>
            <p style={{ color: 'var(--text-muted)' }}>Book a new outpatient visit for an existing patient.</p>
          </div>
        </header>

        {/* Success Message */}
        {success && (
          <div style={{ background: 'rgba(46, 204, 113, 0.1)', color: '#27ae60', padding: '1rem', borderRadius: '12px', marginBottom: '2rem', fontWeight: 600, border: '1px solid rgba(46, 204, 113, 0.3)' }}>
            {success} Redirecting to Appointments Hub...
          </div>
        )}

        {/* Scheduling Form */}
        <div style={{ background: 'var(--glass-bg)', padding: '2.5rem', borderRadius: '24px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: 600, color: 'var(--text-main)' }}>Patient Name or ID</label>
              <input type="text" required placeholder="Search for patient..." disabled={loading || !!success} style={{ padding: '0.8rem', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.5)', color: '#1e293b' }} />
            </div>
            
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: 600, color: 'var(--text-main)' }}>Assign Doctor</label>
              <select required disabled={loading || !!success} style={{ padding: '0.8rem', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.5)', color: '#1e293b', fontFamily: 'inherit' }}>
                <option value="" disabled selected>Select a doctor...</option>
                <option value="dr-smith">Dr. Sarah Smith (Cardiology)</option>
                <option value="dr-doe">Dr. John Doe (Neurology)</option>
                <option value="dr-chen">Dr. Emily Chen (Pediatrics)</option>
                <option value="dr-brown">Dr. Michael Brown (Orthopedics)</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 600, color: 'var(--text-main)' }}>Date</label>
                <input type="date" required disabled={loading || !!success} style={{ padding: '0.8rem', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.5)', color: '#1e293b' }} />
              </div>
              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 600, color: 'var(--text-main)' }}>Time</label>
                <input type="time" required disabled={loading || !!success} style={{ padding: '0.8rem', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.5)', color: '#1e293b' }} />
              </div>
            </div>

            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: 600, color: 'var(--text-main)' }}>Appointment Type</label>
              <select required disabled={loading || !!success} style={{ padding: '0.8rem', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.5)', color: '#1e293b', fontFamily: 'inherit' }}>
                <option value="routine">Routine Checkup</option>
                <option value="specialist">Specialist Consultation</option>
                <option value="followup">Follow-up Visit</option>
                <option value="vaccine">Vaccination</option>
                <option value="therapy">Physical Therapy</option>
              </select>
            </div>

            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: 600, color: 'var(--text-main)' }}>Reason for Visit (Notes)</label>
              <textarea rows={3} placeholder="Patient reports mild chest pain and shortness of breath..." disabled={loading || !!success} style={{ padding: '0.8rem', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.5)', color: '#1e293b', fontFamily: 'inherit', resize: 'vertical' }}></textarea>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
              <button type="button" onClick={() => router.back()} disabled={loading || !!success} className="btn" style={{ padding: '0.8rem 2rem', background: 'transparent', border: '1px solid var(--text-muted)', color: 'var(--text-main)', borderRadius: '50px', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
              <button className="btn btn-primary" type="submit" disabled={loading || !!success} style={{ padding: '0.8rem 2rem', borderRadius: '50px', border: 'none', background: 'var(--primary)', color: 'white', fontWeight: 600, cursor: 'pointer' }}>
                {loading ? 'Confirming...' : 'Schedule Now'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
