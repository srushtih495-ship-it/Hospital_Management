"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PendingPaymentsDetails() {
  const [theme, setTheme] = useState('system');
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

  const pendingInvoices = [
    { id: 'INV-2042', patient: 'Sarah Jenkins', date: 'Oct 24, 2026', amount: '₹1,200.00', status: 'Pending', priority: 'High' },
    { id: 'INV-2046', patient: 'David Smith', date: 'Oct 23, 2026', amount: '₹3,450.00', status: 'Pending', priority: 'Medium' },
    { id: 'INV-2047', patient: 'Linda Garcia', date: 'Oct 22, 2026', amount: '₹890.00', status: 'Pending', priority: 'Low' },
    { id: 'INV-2048', patient: 'Mark Wilson', date: 'Oct 21, 2026', amount: '₹12,800.00', status: 'Pending', priority: 'High' },
  ];

  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: 'var(--bg-color)', padding: '3rem 4rem', transition: 'background 0.3s ease' }}>
      
      <header style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <Link href="/dashboard/billing" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>⬅️</span> Back to Billing
            </Link>
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem', letterSpacing: '-1px' }}>Pending Payments</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Tracking all outstanding invoices that require collection.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'var(--glass-bg)', padding: '0.4rem 1rem', borderRadius: '50px', border: '1px solid var(--glass-border)' }}>
          <span style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '0.9rem' }}>{userEmail}</span>
          <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
            {userEmail.charAt(0).toUpperCase()}
          </div>
        </div>
      </header>

      <div style={{ width: '100%', background: 'var(--glass-bg)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: 'rgba(0, 0, 0, 0.05)', borderBottom: '1px solid var(--glass-border)' }}>
            <tr>
              <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>Invoice ID</th>
              <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>Patient Name</th>
              <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>Date Issued</th>
              <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>Amount</th>
              <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>Priority</th>
              <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingInvoices.map((inv, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--glass-border)', transition: 'background 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.02)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                <td style={{ padding: '1.2rem 1.5rem', color: '#94a3b8', fontFamily: 'monospace' }}>{inv.id}</td>
                <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-main)', fontWeight: 600 }}>{inv.patient}</td>
                <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-main)' }}>{inv.date}</td>
                <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-main)', fontWeight: 700 }}>{inv.amount}</td>
                <td style={{ padding: '1.2rem 1.5rem' }}>
                  <span style={{ 
                    background: inv.priority === 'High' ? 'rgba(231, 76, 60, 0.2)' : inv.priority === 'Medium' ? 'rgba(241, 196, 15, 0.2)' : 'rgba(52, 152, 219, 0.2)', 
                    color: inv.priority === 'High' ? '#e74c3c' : inv.priority === 'Medium' ? '#f39c12' : '#2980b9', 
                    padding: '0.4rem 0.8rem', 
                    borderRadius: '50px', 
                    fontSize: '0.85rem', 
                    fontWeight: 700 
                  }}>
                    {inv.priority}
                  </span>
                </td>
                <td style={{ padding: '1.2rem 1.5rem' }}>
                  <button className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.8rem' }}>Send Reminder</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
