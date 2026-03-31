"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [theme, setTheme] = useState('system');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', background: 'var(--bg-color)', transition: 'background 0.3s ease' }}>
      
      {/* Sidebar */}
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
        {/* Sidebar Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: isSidebarOpen ? 'space-between' : 'center', marginBottom: '3rem' }}>
          {isSidebarOpen && <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', margin: 0, letterSpacing: '-0.5px' }}>CareSync</h2>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.4rem', borderRadius: '8px', transition: 'background 0.2s' }}>
            {isSidebarOpen ? '⏪' : '☰'}
          </button>
        </div>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 }}>
          {[
            { name: 'Dashboard', icon: '📊' },
            { name: 'Patients', icon: '👥' },
            { name: 'Appointments', icon: '📅' },
            { name: 'Doctors', icon: '🩺' },
            { name: 'Billing', icon: '💳' }
          ].map((item) => (
            <a key={item.name} href="#" style={{
              display: 'flex',
              alignItems: 'center',
              padding: '1rem',
              borderRadius: '12px',
              color: item.name === 'Dashboard' ? 'white' : 'var(--text-main)',
              background: item.name === 'Dashboard' ? 'var(--primary)' : 'transparent',
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'all 0.2s',
              gap: '16px',
              justifyContent: isSidebarOpen ? 'flex-start' : 'center'
            }}>
              <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
              {isSidebarOpen && item.name}
            </a>
          ))}
        </nav>

        {/* Theme Toggle Button */}
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

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '3rem 4rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', transition: 'all 0.3s ease' }}>
        
        {/* Top Header */}
        <header style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem', letterSpacing: '-1px' }}>Overview</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Welcome back, Admin. Here is your hospital summary.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--glass-bg)', padding: '0.6rem 1.2rem', borderRadius: '50px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)' }}>
            <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>Admin User</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              A
            </div>
          </div>
        </header>
        
        {/* KPI Widgets */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', width: '100%' }}>
          <div style={{ background: 'var(--glass-bg)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>Total Patients</h3>
              <span style={{ fontSize: '1.5rem' }}>👥</span>
            </div>
            <p style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--text-main)' }}>1,248</p>
            <p style={{ color: 'var(--primary)', fontWeight: 600, marginTop: '0.5rem', fontSize: '0.9rem' }}>+12% this week</p>
          </div>
          
          <div style={{ background: 'var(--glass-bg)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>Appointments Today</h3>
              <span style={{ fontSize: '1.5rem' }}>📅</span>
            </div>
            <p style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--text-main)' }}>42</p>
            <p style={{ color: '#3498db', fontWeight: 600, marginTop: '0.5rem', fontSize: '0.9rem' }}>8 pending confirmation</p>
          </div>
          
          <div style={{ background: 'var(--glass-bg)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>Active Doctors</h3>
              <span style={{ fontSize: '1.5rem' }}>🩺</span>
            </div>
            <p style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--text-main)' }}>18</p>
            <p style={{ color: '#9b59b6', fontWeight: 600, marginTop: '0.5rem', fontSize: '0.9rem' }}>2 on leave today</p>
          </div>
        </div>
      </main>
    </div>
  );
}
