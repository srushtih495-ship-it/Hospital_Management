"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DoctorsDirectory() {
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

  const doctors = [
    { name: 'Dr. Sarah Smith', specialty: 'Cardiologist', status: 'Available', patients: 124, rating: 4.9, avatar: '👩‍⚕️' },
    { name: 'Dr. John Doe', specialty: 'Neurologist', status: 'In Surgery', patients: 86, rating: 4.8, avatar: '👨‍⚕️' },
    { name: 'Dr. Emily Chen', specialty: 'Pediatrician', status: 'On Leave', patients: 210, rating: 5.0, avatar: '👩‍⚕️' },
    { name: 'Dr. Michael Brown', specialty: 'Orthopedics', status: 'Available', patients: 142, rating: 4.7, avatar: '👨‍⚕️' },
    { name: 'Dr. Lisa Wong', specialty: 'Dermatologist', status: 'Available', patients: 305, rating: 4.9, avatar: '👩‍⚕️' },
    { name: 'Dr. James Robert', specialty: 'General Practice', status: 'Consulting', patients: 450, rating: 4.6, avatar: '👨‍⚕️' }
  ];

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
              color: item.name === 'Doctors' ? 'white' : 'var(--text-main)',
              background: item.name === 'Doctors' ? 'var(--primary)' : 'transparent',
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

      {/* Main Content */}
      <main style={{ flex: 1, padding: '3rem 4rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', transition: 'all 0.3s ease' }}>
        <header style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem', letterSpacing: '-1px' }}>Doctors Directory</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Manage medical staff and view schedules.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
             <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', fontSize: '1rem', borderRadius: '50px' }}>
               <span>➕</span> Add Doctor
             </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'var(--glass-bg)', padding: '0.4rem 1rem', borderRadius: '50px', border: '1px solid var(--glass-border)' }}>
              <span style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '0.9rem' }}>{userEmail}</span>
              <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                {userEmail.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Actions Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '2rem', gap: '1rem' }}>
          <input type="text" placeholder="Search by name or specialty..." style={{ flex: 1, maxWidth: '400px', padding: '0.8rem 1.2rem', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'var(--text-main)', fontFamily: 'inherit' }} />
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn-secondary" style={{ padding: '0.8rem 1.5rem', borderRadius: '12px', display: 'flex', gap: '0.5rem' }}><span>📅</span> Schedule Hub</button>
            <button className="btn-secondary" style={{ padding: '0.8rem 1.5rem', borderRadius: '12px', display: 'flex', gap: '0.5rem' }}><span>⚙️</span> Filter</button>
          </div>
        </div>

        {/* Doctors Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem', width: '100%' }}>
          {doctors.map((doc, idx) => (
            <div key={idx} style={{ background: 'var(--glass-bg)', borderRadius: '20px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              
              <div style={{ fontSize: '4rem', marginBottom: '1rem', background: 'rgba(255,255,255,0.2)', width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '2px solid var(--glass-border)' }}>
                {doc.avatar}
              </div>
              
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.2rem' }}>{doc.name}</h3>
              <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '1rem', marginBottom: '1.5rem' }}>{doc.specialty}</p>
              
              <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', marginBottom: '1.5rem', padding: '1rem 0', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)' }}>{doc.patients}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Patients</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)' }}>{doc.rating} ★</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Rating</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <span style={{ 
                  background: doc.status === 'Available' ? 'rgba(46, 204, 113, 0.2)' : doc.status === 'On Leave' ? 'rgba(231, 76, 60, 0.2)' : 'rgba(52, 152, 219, 0.2)', 
                  color: doc.status === 'Available' ? '#27ae60' : doc.status === 'On Leave' ? '#e74c3c' : '#2980b9', 
                  padding: '0.4rem 1rem', 
                  borderRadius: '50px', 
                  fontSize: '0.85rem', 
                  fontWeight: 700 
                }}>
                  {doc.status}
                </span>
                
                <a href="#" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Profile →</a>
              </div>

            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
