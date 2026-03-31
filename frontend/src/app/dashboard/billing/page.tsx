"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BillingDirectory() {
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

  const invoices = [
    { id: 'INV-2041', patient: 'Michael Chang', date: 'Oct 24, 2026', amount: '$450.00', status: 'Paid' },
    { id: 'INV-2042', patient: 'Sarah Jenkins', date: 'Oct 24, 2026', amount: '$1,200.00', status: 'Pending' },
    { id: 'INV-2043', patient: 'Emma Wilson', date: 'Oct 23, 2026', amount: '$150.00', status: 'Paid' },
    { id: 'INV-2044', patient: 'James Robert', date: 'Oct 21, 2026', amount: '$3,400.00', status: 'Overdue' },
    { id: 'INV-2045', patient: 'Olivia Davis', date: 'Oct 20, 2026', amount: '$85.00', status: 'Paid' },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Paid': return { bg: 'rgba(46, 204, 113, 0.2)', color: '#27ae60' };
      case 'Pending': return { bg: 'rgba(241, 196, 15, 0.2)', color: '#f39c12' };
      case 'Overdue': return { bg: 'rgba(231, 76, 60, 0.2)', color: '#e74c3c' };
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
              color: item.name === 'Billing' ? 'white' : 'var(--text-main)',
              background: item.name === 'Billing' ? 'var(--primary)' : 'transparent',
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

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '3rem 4rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', transition: 'all 0.3s ease' }}>
        
        {/* Top Header */}
        <header style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem', letterSpacing: '-1px' }}>Billing & Invoices</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Manage hospital revenue, patient balances, and process payments.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
             <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', fontSize: '1rem', borderRadius: '50px' }}>
               <span>➕</span> Create Invoice
             </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'var(--glass-bg)', padding: '0.4rem 1rem', borderRadius: '50px', border: '1px solid var(--glass-border)' }}>
              <span style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '0.9rem' }}>{userEmail}</span>
              <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                {userEmail.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Financial KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', width: '100%', marginBottom: '4rem' }}>
          <div style={{ background: 'var(--glass-bg)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>Revenue (Oct)</h3>
              <span style={{ fontSize: '1.5rem' }}>💸</span>
            </div>
            <p style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-main)' }}>$142,500</p>
            <p style={{ color: 'var(--primary)', fontWeight: 600, marginTop: '0.5rem', fontSize: '0.9rem' }}>+8.4% vs last month</p>
          </div>
          
          <div style={{ background: 'var(--glass-bg)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>Pending Payments</h3>
              <span style={{ fontSize: '1.5rem' }}>⏳</span>
            </div>
            <p style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-main)' }}>$18,400</p>
            <p style={{ color: '#f39c12', fontWeight: 600, marginTop: '0.5rem', fontSize: '0.9rem' }}>42 invoices await payment</p>
          </div>
          
          <div style={{ background: 'var(--glass-bg)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>Overdue Accounts</h3>
              <span style={{ fontSize: '1.5rem' }}>⚠️</span>
            </div>
            <p style={{ fontSize: '3rem', fontWeight: 800, color: '#e74c3c' }}>$5,200</p>
            <p style={{ color: '#e74c3c', fontWeight: 600, marginTop: '0.5rem', fontSize: '0.9rem' }}>8 accounts require action</p>
          </div>
        </div>
        
        {/* Actions Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '1.5rem', gap: '1rem' }}>
          <input type="text" placeholder="Search invoices by ID or Patient Name..." style={{ flex: 1, maxWidth: '400px', padding: '0.8rem 1.2rem', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'var(--text-main)', fontFamily: 'inherit' }} />
          <button className="btn-secondary" style={{ padding: '0.8rem 1.5rem', borderRadius: '12px', display: 'flex', gap: '0.5rem' }}><span>⬇️</span> Export CSV</button>
        </div>

        {/* Invoices Table */}
        <div style={{ width: '100%', background: 'var(--glass-bg)', borderRadius: '16px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: 'rgba(0, 0, 0, 0.05)', borderBottom: '1px solid var(--glass-border)' }}>
              <tr>
                <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>Invoice ID</th>
                <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>Patient Name</th>
                <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>Date Issued</th>
                <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>Amount</th>
                <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>Status</th>
                <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--glass-border)', transition: 'background 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.02)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '1.2rem 1.5rem', color: '#94a3b8', fontFamily: 'monospace' }}>{inv.id}</td>
                  <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-main)', fontWeight: 600 }}>{inv.patient}</td>
                  <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-main)' }}>{inv.date}</td>
                  <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-main)', fontWeight: 700 }}>{inv.amount}</td>
                  <td style={{ padding: '1.2rem 1.5rem' }}>
                    <span style={{ 
                      background: getStatusStyle(inv.status).bg, 
                      color: getStatusStyle(inv.status).color, 
                      padding: '0.4rem 0.8rem', 
                      borderRadius: '50px', 
                      fontSize: '0.85rem', 
                      fontWeight: 700,
                      display: 'inline-block',
                      textAlign: 'center',
                      minWidth: '80px'
                    }}>
                      {inv.status}
                    </span>
                  </td>
                  <td style={{ padding: '1.2rem 1.5rem' }}>
                    <a href="#" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none', marginRight: '1rem' }}>View</a>
                    <a href="#" style={{ color: 'var(--text-muted)', fontWeight: 600, textDecoration: 'none' }}>Email</a>
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
