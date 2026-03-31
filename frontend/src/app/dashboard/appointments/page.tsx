"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AppointmentsDirectory() {
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

  const appointments = [
    { id: 'APT-1004', patient: 'Sarah Jenkins', doctor: 'Dr. Sarah Smith', type: 'Routine Checkup', datetime: 'Today, 09:00 AM', status: 'Completed' },
    { id: 'APT-1005', patient: 'Michael Chang', doctor: 'Dr. John Doe', type: 'Neurology Consult', datetime: 'Today, 11:30 AM', status: 'In Progress' },
    { id: 'APT-1006', patient: 'Emma Wilson', doctor: 'Dr. Emily Chen', type: 'Vaccination', datetime: 'Today, 02:15 PM', status: 'Upcoming' },
    { id: 'APT-1007', patient: 'James Robert', doctor: 'Dr. Michael Brown', type: 'Physical Therapy', datetime: 'Tomorrow, 10:00 AM', status: 'Upcoming' },
    { id: 'APT-1008', patient: 'Olivia Davis', doctor: 'Dr. Lisa Wong', type: 'Dermatology Review', datetime: 'Oct 26, 01:00 PM', status: 'Rescheduled' },
    { id: 'APT-1009', patient: 'Lucas Miller', doctor: 'Dr. James Robert', type: 'General Consult', datetime: 'Oct 27, 09:45 AM', status: 'Cancelled' }
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Completed': return { bg: 'rgba(46, 204, 113, 0.2)', color: '#27ae60' };
      case 'In Progress': return { bg: 'rgba(52, 152, 219, 0.2)', color: '#2980b9' };
      case 'Upcoming': return { bg: 'rgba(241, 196, 15, 0.2)', color: '#f39c12' };
      case 'Rescheduled': return { bg: 'rgba(155, 89, 182, 0.2)', color: '#9b59b6' };
      case 'Cancelled': return { bg: 'rgba(231, 76, 60, 0.2)', color: '#e74c3c' };
      default: return { bg: 'rgba(149, 165, 166, 0.2)', color: '#7f8c8d' };
    }
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
              color: item.name === 'Appointments' ? 'white' : 'var(--text-main)',
              background: item.name === 'Appointments' ? 'var(--primary)' : 'transparent',
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
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem', letterSpacing: '-1px' }}>Appointments Hub</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Manage outpatient schedules and view upcoming visits.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
             <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', fontSize: '1rem', borderRadius: '50px' }}>
               <span>📅</span> Schedule Appointment
             </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'var(--glass-bg)', padding: '0.4rem 1rem', borderRadius: '50px', border: '1px solid var(--glass-border)' }}>
              <span style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '0.9rem' }}>{userEmail}</span>
              <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                {userEmail.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Filters */}
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '2rem', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn-secondary" style={{ padding: '0.6rem 1.2rem', borderRadius: '50px', fontSize: '0.9rem', background: 'var(--primary)', color: 'white', border: 'none' }}>All</button>
            <button className="btn-secondary" style={{ padding: '0.6rem 1.2rem', borderRadius: '50px', fontSize: '0.9rem', background: 'var(--glass-bg)' }}>Today</button>
            <button className="btn-secondary" style={{ padding: '0.6rem 1.2rem', borderRadius: '50px', fontSize: '0.9rem', background: 'var(--glass-bg)' }}>Upcoming</button>
            <button className="btn-secondary" style={{ padding: '0.6rem 1.2rem', borderRadius: '50px', fontSize: '0.9rem', background: 'var(--glass-bg)' }}>Completed</button>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input type="date" style={{ padding: '0.6rem 1rem', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'var(--text-main)', fontFamily: 'inherit' }} />
          </div>
        </div>

        {/* Appointments Table */}
        <div style={{ width: '100%', background: 'var(--glass-bg)', borderRadius: '16px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: 'rgba(0, 0, 0, 0.05)', borderBottom: '1px solid var(--glass-border)' }}>
              <tr>
                <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>Apt ID</th>
                <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>Patient Name</th>
                <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>Doctor</th>
                <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>Type</th>
                <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>Date & Time</th>
                <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>Status</th>
                <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((apt, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--glass-border)', transition: 'background 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.02)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '1.2rem 1.5rem', color: '#94a3b8', fontFamily: 'monospace' }}>{apt.id}</td>
                  <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-main)', fontWeight: 600 }}>{apt.patient}</td>
                  <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-main)' }}>{apt.doctor}</td>
                  <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-main)' }}>{apt.type}</td>
                  <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-main)' }}>{apt.datetime}</td>
                  <td style={{ padding: '1.2rem 1.5rem' }}>
                    <span style={{ 
                      background: getStatusStyle(apt.status).bg, 
                      color: getStatusStyle(apt.status).color, 
                      padding: '0.4rem 0.8rem', 
                      borderRadius: '50px', 
                      fontSize: '0.85rem', 
                      fontWeight: 700,
                      display: 'inline-block',
                      textAlign: 'center',
                      minWidth: '100px'
                    }}>
                      {apt.status}
                    </span>
                  </td>
                  <td style={{ padding: '1.2rem 1.5rem' }}>
                    <button style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '1.2rem' }}>⋮</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
