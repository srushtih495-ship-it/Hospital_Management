"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PatientDirectory() {
  const [theme, setTheme] = useState('system');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userEmail, setUserEmail] = useState('admin@hospital.com');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) setUserEmail(savedEmail);
  }, []);

  const toggleTheme = () => {
    const isCurrentlyDark = 
      document.documentElement.getAttribute('data-theme') === 'dark' || 
      (!document.documentElement.hasAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const newTheme = isCurrentlyDark ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', background: 'var(--bg-color)', transition: 'background 0.3s ease' }}>
      
      {/* Sidebar copied exactly from Dashboard */}
      <aside style={{
        width: isSidebarOpen ? '260px' : '80px',
        background: 'var(--glass-bg)',
        borderRight: '1px solid var(--glass-border)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        padding: '1.5rem 1rem',
        boxShadow: 'var(--shadow)',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: isSidebarOpen ? 'space-between' : 'center', marginBottom: '3rem' }}>
          {isSidebarOpen && <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', margin: 0, letterSpacing: '-0.5px' }}>CareSync</h2>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.4rem', borderRadius: '8px', transition: 'background 0.2s' }}>
            {isSidebarOpen ? '⏪' : '☰'}
          </button>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 }}>
          {[
            { name: 'Dashboard', icon: '📊', route: '/dashboard' },
            { name: 'Patients', icon: '👥', route: '/dashboard/patients' },
            { name: 'Appointments', icon: '📅', route: '/dashboard/appointments' },
            { name: 'Doctors', icon: '🩺', route: '/dashboard/doctors' },
            { name: 'Billing', icon: '💳', route: '/dashboard/billing' }
          ].map((item) => (
            <Link key={item.name} href={item.route} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '1rem',
              borderRadius: '12px',
              color: item.name === 'Patients' ? 'white' : 'var(--text-main)',
              background: item.name === 'Patients' ? 'var(--primary)' : 'transparent',
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'all 0.2s',
              gap: '16px',
              justifyContent: isSidebarOpen ? 'flex-start' : 'center'
            }}>
              <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
              {isSidebarOpen && item.name}
            </Link>
          ))}
        </nav>

        <button 
          onClick={toggleTheme}
          style={{ 
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid var(--glass-border)',
            color: 'var(--text-main)',
            padding: '1rem',
            borderRadius: '12px',
            cursor: 'pointer',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: isSidebarOpen ? 'flex-start' : 'center',
            gap: '12px',
            marginTop: 'auto',
            transition: 'all 0.3s ease'
          }}
        >
          <span style={{ fontSize: '1.3rem' }}>
            {theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) ? '☀️' : '🌙'}
          </span>
          {isSidebarOpen && (theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'Light Mode' : 'Dark Mode')}
        </button>
      </aside>

      {/* Main Patient Directory */}
      <main style={{ flex: 1, padding: '3rem 4rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', transition: 'all 0.3s ease' }}>
        <header style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem', letterSpacing: '-1px' }}>Patient Directory</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>View and manage all registered hospital patients.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
             <Link href="/dashboard/new-patient" style={{ textDecoration: 'none' }}>
              <div className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', fontSize: '1rem', borderRadius: '50px' }}>
                <span>➕</span> Add New Patient
              </div>
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'var(--glass-bg)', padding: '0.4rem 1rem', borderRadius: '50px', border: '1px solid var(--glass-border)' }}>
              <span style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '0.9rem' }}>{userEmail}</span>
              <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                {userEmail.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Actions Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '1.5rem', gap: '1rem' }}>
          <input type="text" placeholder="Search patients by name, ID, or phone..." style={{ flex: 1, maxWidth: '400px', padding: '0.8rem 1.2rem', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'var(--text-main)', fontFamily: 'inherit' }} />
          <button className="btn-secondary" style={{ padding: '0.8rem 1.5rem', borderRadius: '12px', display: 'flex', gap: '0.5rem' }}><span>⚙️</span> Filter Options</button>
        </div>

        {/* Patients Table */}
        <div style={{ width: '100%', background: 'var(--glass-bg)', borderRadius: '16px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: 'rgba(0, 0, 0, 0.05)', borderBottom: '1px solid var(--glass-border)' }}>
              <tr>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Patient ID</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Name</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Age / Gender</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Last Visit</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Status</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <td style={{ padding: '1rem', color: '#94a3b8', fontFamily: 'monospace' }}>PT-9042</td>
                <td style={{ padding: '1rem', color: 'var(--text-main)', fontWeight: 600 }}>Sarah Jenkins</td>
                <td style={{ padding: '1rem', color: 'var(--text-main)' }}>34 / F</td>
                <td style={{ padding: '1rem', color: 'var(--text-main)' }}>Oct 24, 2026</td>
                <td style={{ padding: '1rem' }}><span style={{ color: '#27ae60', fontWeight: 600 }}>Active</span></td>
                <td style={{ padding: '1rem' }}><a href="#" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>View File →</a></td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <td style={{ padding: '1rem', color: '#94a3b8', fontFamily: 'monospace' }}>PT-8421</td>
                <td style={{ padding: '1rem', color: 'var(--text-main)', fontWeight: 600 }}>Michael Chang</td>
                <td style={{ padding: '1rem', color: 'var(--text-main)' }}>45 / M</td>
                <td style={{ padding: '1rem', color: 'var(--text-main)' }}>Oct 20, 2026</td>
                <td style={{ padding: '1rem' }}><span style={{ color: '#f39c12', fontWeight: 600 }}>In Treatment</span></td>
                <td style={{ padding: '1rem' }}><a href="#" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>View File →</a></td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <td style={{ padding: '1rem', color: '#94a3b8', fontFamily: 'monospace' }}>PT-1033</td>
                <td style={{ padding: '1rem', color: 'var(--text-main)', fontWeight: 600 }}>Emma Wilson</td>
                <td style={{ padding: '1rem', color: 'var(--text-main)' }}>8 / F</td>
                <td style={{ padding: '1rem', color: 'var(--text-main)' }}>Sep 15, 2026</td>
                <td style={{ padding: '1rem' }}><span style={{ color: '#27ae60', fontWeight: 600 }}>Active</span></td>
                <td style={{ padding: '1rem' }}><a href="#" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>View File →</a></td>
              </tr>
              <tr>
                <td style={{ padding: '1rem', color: '#94a3b8', fontFamily: 'monospace' }}>PT-4229</td>
                <td style={{ padding: '1rem', color: 'var(--text-main)', fontWeight: 600 }}>James Robert</td>
                <td style={{ padding: '1rem', color: 'var(--text-main)' }}>62 / M</td>
                <td style={{ padding: '1rem', color: 'var(--text-main)' }}>Jan 04, 2026</td>
                <td style={{ padding: '1rem' }}><span style={{ color: '#94a3b8', fontWeight: 600 }}>Discharged</span></td>
                <td style={{ padding: '1rem' }}><a href="#" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>View File →</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
