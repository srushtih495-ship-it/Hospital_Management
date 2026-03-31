"use client";

import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [theme, setTheme] = useState('system');

  useEffect(() => {
    // On load, check if there is a saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    // Current logical theme
    const isCurrentlyDark = 
      document.documentElement.getAttribute('data-theme') === 'dark' || 
      (!document.documentElement.hasAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    const newTheme = isCurrentlyDark ? 'light' : 'dark';
    
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <main>
      <div className="hero-container" style={{ maxWidth: '1000px', width: '90%', position: 'relative' }}>
        
        {/* Toggle Button */}
        <button 
          onClick={toggleTheme}
          style={{ 
            position: 'absolute', 
            top: '20px', 
            right: '20px',
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            color: 'var(--text-main)',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            cursor: 'pointer',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease'
          }}
        >
          {theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>

        <h1>CareSync Dashboard</h1>
        <p className="subtitle">Welcome back! Here is your hospital overview.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.5)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-main)' }}>Total Patients</h3>
            <p style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary)' }}>1,248</p>
          </div>
          <div style={{ background: 'rgba(255, 255, 255, 0.5)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-main)' }}>Today's Appointments</h3>
            <p style={{ fontSize: '3rem', fontWeight: 'bold', color: '#3498db' }}>42</p>
          </div>
          <div style={{ background: 'rgba(255, 255, 255, 0.5)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-main)' }}>Active Doctors</h3>
            <p style={{ fontSize: '3rem', fontWeight: 'bold', color: '#9b59b6' }}>18</p>
          </div>
        </div>
      </div>
    </main>
  );
}
