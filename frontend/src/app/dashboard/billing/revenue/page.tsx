"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function RevenueDetails() {
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

  const revenueBreakdown = [
    { category: 'Consultations', amount: '₹45,200', count: 312, growth: '+12%', icon: '🩺', color: '#3498db' },
    { category: 'Surgeries', amount: '₹68,400', count: 24, growth: '+5%', icon: '🏥', color: '#9b59b6' },
    { category: 'Laboratory', amount: '₹18,900', count: 580, growth: '+18%', icon: '🔬', color: '#2ecc71' },
    { category: 'Pharmacy', amount: '₹10,000', count: 1240, growth: '-2%', icon: '💊', color: '#f1c40f' },
  ];

  const monthlyData = [
    { month: 'May', revenue: 98000 },
    { month: 'Jun', revenue: 105000 },
    { month: 'Jul', revenue: 112000 },
    { month: 'Aug', revenue: 108000 },
    { month: 'Sep', revenue: 131400 },
    { month: 'Oct', revenue: 142500 },
  ];
  const maxRevenue = Math.max(...monthlyData.map(m => m.revenue));

  const recentTransactions = [
    { id: 'TXN-4081', patient: 'Michael Chang', department: 'Cardiology', type: 'Consultation', amount: '₹1,500', date: 'Oct 24, 2026', method: 'UPI' },
    { id: 'TXN-4082', patient: 'Sarah Jenkins', department: 'Neurology', type: 'Surgery', amount: '₹28,000', date: 'Oct 24, 2026', method: 'Insurance' },
    { id: 'TXN-4083', patient: 'Emma Wilson', department: 'Pediatrics', type: 'Lab Test', amount: '₹3,200', date: 'Oct 23, 2026', method: 'Card' },
    { id: 'TXN-4084', patient: 'James Robert', department: 'Orthopedics', type: 'Surgery', amount: '₹45,000', date: 'Oct 23, 2026', method: 'Insurance' },
    { id: 'TXN-4085', patient: 'Olivia Davis', department: 'Dermatology', type: 'Consultation', amount: '₹800', date: 'Oct 22, 2026', method: 'Cash' },
    { id: 'TXN-4086', patient: 'Raj Patel', department: 'ENT', type: 'Consultation', amount: '₹1,200', date: 'Oct 22, 2026', method: 'UPI' },
  ];

  const departmentRevenue = [
    { name: 'Cardiology', amount: 38500, percent: 27, color: '#e74c3c' },
    { name: 'Neurology', amount: 32000, percent: 22, color: '#3498db' },
    { name: 'Orthopedics', amount: 28400, percent: 20, color: '#2ecc71' },
    { name: 'Pediatrics', amount: 18900, percent: 13, color: '#f39c12' },
    { name: 'Dermatology', amount: 14200, percent: 10, color: '#9b59b6' },
    { name: 'Others', amount: 10500, percent: 8, color: '#95a5a6' },
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

      {/* Main Content */}
      <main style={{ flex: 1, padding: '3rem 4rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', transition: 'all 0.3s ease', overflowY: 'auto' }}>

        {/* Header */}
        <header style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <Link href="/dashboard/billing" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.95rem' }}>
              <span>⬅️</span> Back to Billing
            </Link>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem', letterSpacing: '-1px' }}>💸 Revenue Analysis</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Detailed breakdown of hospital revenue for October 2026.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="btn btn-secondary" style={{ padding: '0.6rem 1.2rem', borderRadius: '50px', display: 'flex', gap: '0.5rem', fontSize: '0.9rem' }}>
              <span>📥</span> Download Report
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'var(--glass-bg)', padding: '0.4rem 1rem', borderRadius: '50px', border: '1px solid var(--glass-border)' }}>
              <span style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '0.9rem' }}>{userEmail}</span>
              <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                {userEmail.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Summary KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', width: '100%', marginBottom: '3rem' }}>
          <div style={{ background: 'var(--glass-bg)', padding: '1.5rem', borderRadius: '20px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, marginBottom: '0.5rem' }}>Total Revenue</p>
            <p style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>₹1,42,500</p>
            <p style={{ color: '#27ae60', fontWeight: 600, fontSize: '0.85rem', marginTop: '0.3rem' }}>↑ 8.4% vs Sep</p>
          </div>
          <div style={{ background: 'var(--glass-bg)', padding: '1.5rem', borderRadius: '20px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, marginBottom: '0.5rem' }}>Avg Per Day</p>
            <p style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>₹5,937</p>
            <p style={{ color: '#3498db', fontWeight: 600, fontSize: '0.85rem', marginTop: '0.3rem' }}>24 days recorded</p>
          </div>
          <div style={{ background: 'var(--glass-bg)', padding: '1.5rem', borderRadius: '20px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, marginBottom: '0.5rem' }}>Total Paid Invoices</p>
            <p style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>2,156</p>
            <p style={{ color: '#27ae60', fontWeight: 600, fontSize: '0.85rem', marginTop: '0.3rem' }}>↑ 15% vs Sep</p>
          </div>
          <div style={{ background: 'var(--glass-bg)', padding: '1.5rem', borderRadius: '20px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, marginBottom: '0.5rem' }}>Collection Rate</p>
            <p style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>87.3%</p>
            <p style={{ color: '#f39c12', fontWeight: 600, fontSize: '0.85rem', marginTop: '0.3rem' }}>Target: 95%</p>
          </div>
        </div>

        {/* Revenue by Category Cards */}
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1.5rem', letterSpacing: '-0.5px' }}>Revenue by Category</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', width: '100%', marginBottom: '3rem' }}>
          {revenueBreakdown.map((item, idx) => (
            <div key={idx} style={{ background: 'var(--glass-bg)', padding: '1.8rem', borderRadius: '20px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)', transition: 'transform 0.2s', cursor: 'pointer', borderLeft: `4px solid ${item.color}` }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h3 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>{item.category}</h3>
                <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
              </div>
              <p style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', margin: '0' }}>{item.amount}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.8rem' }}>
                <p style={{ color: item.growth.startsWith('+') ? '#27ae60' : '#e74c3c', fontWeight: 600, fontSize: '0.85rem', margin: 0 }}>
                  {item.growth.startsWith('+') ? '↑' : '↓'} {item.growth} vs last month
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>{item.count} transactions</p>
              </div>
            </div>
          ))}
        </div>

        {/* Two-column: Monthly Trend + Department Revenue */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem', width: '100%', marginBottom: '3rem' }}>

          {/* Monthly Trend Chart */}
          <div style={{ background: 'var(--glass-bg)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '2rem' }}>Monthly Revenue Trend</h3>
            <div style={{ height: '220px', display: 'flex', alignItems: 'flex-end', gap: '1.5rem', paddingBottom: '1rem' }}>
              {monthlyData.map((m, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-main)' }}>₹{(m.revenue / 1000).toFixed(0)}K</span>
                  <div style={{
                    width: '100%',
                    background: i === monthlyData.length - 1 ? 'linear-gradient(180deg, var(--primary), var(--secondary))' : 'var(--primary)',
                    height: `${(m.revenue / maxRevenue) * 180}px`,
                    borderRadius: '10px 10px 4px 4px',
                    opacity: i === monthlyData.length - 1 ? 1 : 0.5 + (m.revenue / maxRevenue) * 0.5,
                    transition: 'all 0.3s ease',
                    minHeight: '20px'
                  }}></div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem', fontWeight: 600 }}>
              {monthlyData.map((m, i) => <span key={i}>{m.month}</span>)}
            </div>
          </div>

          {/* Department Revenue Breakdown */}
          <div style={{ background: 'var(--glass-bg)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '2rem' }}>By Department</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {departmentRevenue.map((dept, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '0.9rem' }}>{dept.name}</span>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem' }}>₹{dept.amount.toLocaleString()} ({dept.percent}%)</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', borderRadius: '4px', background: 'rgba(0,0,0,0.08)' }}>
                    <div style={{ width: `${dept.percent}%`, height: '100%', borderRadius: '4px', background: dept.color, transition: 'width 0.5s ease' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Transactions Table */}
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1.5rem', letterSpacing: '-0.5px' }}>Recent Revenue Transactions</h2>
        <div style={{ width: '100%', background: 'var(--glass-bg)', borderRadius: '20px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)', overflow: 'hidden', marginBottom: '2rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: 'rgba(0, 0, 0, 0.05)', borderBottom: '1px solid var(--glass-border)' }}>
              <tr>
                <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 700 }}>Txn ID</th>
                <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 700 }}>Patient</th>
                <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 700 }}>Department</th>
                <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 700 }}>Type</th>
                <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 700 }}>Amount</th>
                <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 700 }}>Date</th>
                <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 700 }}>Payment</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((txn, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--glass-border)', transition: 'background 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.02)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '1rem 1.5rem', color: '#94a3b8', fontFamily: 'monospace', fontSize: '0.9rem' }}>{txn.id}</td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--text-main)', fontWeight: 600 }}>{txn.patient}</td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--text-main)' }}>{txn.department}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{
                      background: txn.type === 'Surgery' ? 'rgba(155, 89, 182, 0.2)' : txn.type === 'Lab Test' ? 'rgba(46, 204, 113, 0.2)' : 'rgba(52, 152, 219, 0.2)',
                      color: txn.type === 'Surgery' ? '#9b59b6' : txn.type === 'Lab Test' ? '#27ae60' : '#2980b9',
                      padding: '0.3rem 0.7rem',
                      borderRadius: '50px',
                      fontSize: '0.8rem',
                      fontWeight: 700
                    }}>
                      {txn.type}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--text-main)', fontWeight: 700 }}>{txn.amount}</td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--text-main)', fontSize: '0.9rem' }}>{txn.date}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{
                      background: 'rgba(46, 204, 113, 0.15)',
                      color: '#27ae60',
                      padding: '0.3rem 0.7rem',
                      borderRadius: '50px',
                      fontSize: '0.8rem',
                      fontWeight: 700
                    }}>
                      {txn.method}
                    </span>
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
