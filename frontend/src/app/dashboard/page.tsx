"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const DEFAULT_PATIENTS = [
  { id: 'PT-9042', name: 'Sarah Jenkins', age: 34, gender: 'F', lastVisit: 'Oct 24, 2026', status: 'Active', phone: '9845012345', blood: 'B+' },
  { id: 'PT-8421', name: 'Michael Chang', age: 45, gender: 'M', lastVisit: 'Oct 20, 2026', status: 'In Treatment', phone: '9811234567', blood: 'O+' },
  { id: 'PT-1033', name: 'Emma Wilson', age: 8, gender: 'F', lastVisit: 'Sep 15, 2026', status: 'Active', phone: '9900112233', blood: 'A+' },
  { id: 'PT-4229', name: 'James Robert', age: 62, gender: 'M', lastVisit: 'Jan 04, 2026', status: 'Discharged', phone: '9766554433', blood: 'AB-' },
  { id: 'PT-5501', name: 'Priya Nair', age: 29, gender: 'F', lastVisit: 'Mar 31, 2026', status: 'Active', phone: '9987654321', blood: 'O-' },
  { id: 'PT-6612', name: 'Vikram Singh', age: 55, gender: 'M', lastVisit: 'Mar 28, 2026', status: 'In Treatment', phone: '9870012345', blood: 'A-' },
];

export default function Dashboard() {
  const [theme, setTheme] = useState('system');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userEmail, setUserEmail] = useState('admin@hospital.com');
  const [showAllCards, setShowAllCards] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [patients, setPatients] = useState(DEFAULT_PATIENTS);
  const [justAdded, setJustAdded] = useState(false);
  const [form, setForm] = useState({ name: '', age: '', gender: 'M', phone: '', blood: 'A+', status: 'Active' });
  const [formError, setFormError] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) setUserEmail(savedEmail);

    // Load patients list from localStorage (shared with patients page)
    const stored = localStorage.getItem('caresync_patients');
    if (stored) {
      setPatients(JSON.parse(stored));
    } else {
      localStorage.setItem('caresync_patients', JSON.stringify(DEFAULT_PATIENTS));
    }
  }, []);

  useEffect(() => {
    if (showModal && nameRef.current) {
      setTimeout(() => nameRef.current?.focus(), 100);
    }
  }, [showModal]);

  const totalPatients = patients.length;

  const toggleTheme = () => {
    const isCurrentlyDark =
      document.documentElement.getAttribute('data-theme') === 'dark' ||
      (!document.documentElement.hasAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const newTheme = isCurrentlyDark ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const generatePatientId = () => {
    const num = Math.floor(1000 + Math.random() * 8999);
    return `PT-${num}`;
  };

  const handleAddPatient = () => {
    if (!form.name.trim()) { setFormError('Patient name is required.'); return; }
    if (!form.age || isNaN(Number(form.age)) || Number(form.age) < 0 || Number(form.age) > 120) { setFormError('Please enter a valid age (0–120).'); return; }
    if (!form.phone.trim() || form.phone.trim().length < 7) { setFormError('Please enter a valid phone number.'); return; }

    const today = new Date();
    const dateStr = today.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    const newPatient = {
      id: generatePatientId(),
      name: form.name.trim(),
      age: Number(form.age),
      gender: form.gender,
      phone: form.phone.trim(),
      blood: form.blood,
      status: form.status,
      lastVisit: dateStr,
    };
    const updated = [newPatient, ...patients];
    setPatients(updated);
    localStorage.setItem('caresync_patients', JSON.stringify(updated));

    // Flash the counter
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);

    // Reset form and close modal
    setForm({ name: '', age: '', gender: 'M', phone: '', blood: 'A+', status: 'Active' });
    setFormError('');
    setShowModal(false);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem 1rem', borderRadius: '10px',
    border: '1.5px solid var(--glass-border)', background: 'var(--glass-bg)',
    color: 'var(--text-main)', fontFamily: 'inherit', fontSize: '0.95rem',
    outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
  };
  const labelStyle: React.CSSProperties = {
    display: 'block', color: 'var(--text-muted)', marginBottom: '0.4rem',
    fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.5px',
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', background: 'var(--bg-color)', transition: 'background 0.3s ease' }}>

      {/* Add Patient Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1rem',
        }} onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div style={{
            background: 'var(--bg-color)', borderRadius: '24px',
            border: '1px solid var(--glass-border)', boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
            padding: '2.5rem', width: '100%', maxWidth: '520px',
            animation: 'slideIn 0.25s ease-out',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>➕ Add New Patient</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0.3rem 0 0 0' }}>Fill in patient details to register</p>
              </div>
              <button onClick={() => setShowModal(false)} style={{ background: 'rgba(0,0,0,0.1)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)' }}>✕</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
              {/* Full Name */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Full Name *</label>
                <input ref={nameRef} style={inputStyle} placeholder="e.g. Riya Sharma" value={form.name}
                  onChange={e => { setForm({ ...form, name: e.target.value }); setFormError(''); }} />
              </div>
              {/* Age */}
              <div>
                <label style={labelStyle}>Age *</label>
                <input style={inputStyle} type="number" min="0" max="120" placeholder="e.g. 32" value={form.age}
                  onChange={e => { setForm({ ...form, age: e.target.value }); setFormError(''); }} />
              </div>
              {/* Gender */}
              <div>
                <label style={labelStyle}>Gender</label>
                <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="O">Other</option>
                </select>
              </div>
              {/* Phone */}
              <div>
                <label style={labelStyle}>Phone Number *</label>
                <input style={inputStyle} placeholder="e.g. 9876543210" value={form.phone}
                  onChange={e => { setForm({ ...form, phone: e.target.value }); setFormError(''); }} />
              </div>
              {/* Blood Group */}
              <div>
                <label style={labelStyle}>Blood Group</label>
                <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.blood} onChange={e => setForm({ ...form, blood: e.target.value })}>
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <option key={bg}>{bg}</option>)}
                </select>
              </div>
              {/* Status */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Status</label>
                <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                  <option>Active</option>
                  <option>In Treatment</option>
                  <option>Discharged</option>
                </select>
              </div>
            </div>

            {formError && (
              <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(231,76,60,0.15)', color: '#e74c3c', fontWeight: 600, fontSize: '0.9rem', border: '1px solid rgba(231,76,60,0.3)' }}>
                ⚠️ {formError}
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.8rem' }}>
              <button onClick={() => { setShowModal(false); setFormError(''); }}
                style={{ flex: 1, padding: '0.85rem', borderRadius: '12px', border: '1.5px solid var(--glass-border)', background: 'transparent', color: 'var(--text-main)', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}>
                Cancel
              </button>
              <button onClick={handleAddPatient}
                style={{ flex: 2, padding: '0.85rem', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white', fontWeight: 800, cursor: 'pointer', fontSize: '0.95rem', boxShadow: '0 4px 15px rgba(0,200,83,0.3)' }}>
                ✅ Register Patient
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside style={{
        width: isSidebarOpen ? '260px' : '80px',
        background: 'var(--glass-bg)', borderRight: '1px solid var(--glass-border)',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column',
        padding: '1.5rem 1rem', boxShadow: 'var(--shadow)', zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: isSidebarOpen ? 'space-between' : 'center', marginBottom: '3rem' }}>
          {isSidebarOpen && <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', margin: 0, letterSpacing: '-0.5px' }}>CareSync</h2>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.4rem', borderRadius: '8px' }}>
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
              display: 'flex', alignItems: 'center', padding: '1rem', borderRadius: '12px',
              color: item.name === 'Dashboard' ? 'white' : 'var(--text-main)',
              background: item.name === 'Dashboard' ? 'var(--primary)' : 'transparent',
              textDecoration: 'none', fontWeight: 600, transition: 'all 0.2s', gap: '16px',
              justifyContent: isSidebarOpen ? 'flex-start' : 'center'
            }}>
              <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
              {isSidebarOpen && item.name}
            </Link>
          ))}
        </nav>

        <button onClick={toggleTheme} style={{
          background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)',
          color: 'var(--text-main)', padding: '1rem', borderRadius: '12px', cursor: 'pointer',
          fontWeight: 600, display: 'flex', alignItems: 'center',
          justifyContent: isSidebarOpen ? 'flex-start' : 'center',
          gap: '12px', marginTop: 'auto', transition: 'all 0.3s ease'
        }}>
          <span style={{ fontSize: '1.3rem' }}>
            {theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) ? '☀️' : '🌙'}
          </span>
          {isSidebarOpen && (theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'Light Mode' : 'Dark Mode')}
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '3rem 4rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', transition: 'all 0.3s ease' }}>

        {/* Header */}
        <header style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem', letterSpacing: '-1px' }}>Overview</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Welcome back, Admin. Here is your hospital summary.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--glass-bg)', padding: '0.6rem 1.2rem', borderRadius: '50px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)' }}>
            <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{userEmail}</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              {userEmail.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* KPI Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', letterSpacing: '-0.5px' }}>Key Metrics</h2>
          <button onClick={() => setShowAllCards(!showAllCards)} className="btn btn-secondary"
            style={{ padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 600 }}>
            {showAllCards ? 'Show Summary' : 'View All Metrics'}
          </button>
        </div>

        {/* KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', width: '100%', marginBottom: '4rem' }}>
          {/* Total Patients Card — live count */}
          <Link href="/dashboard/patients" style={{ textDecoration: 'none', display: 'block' }}>
            <div style={{
              background: 'var(--glass-bg)', padding: '2rem', borderRadius: '24px',
              border: justAdded ? '2px solid var(--primary)' : '1px solid var(--glass-border)',
              boxShadow: justAdded ? '0 0 20px rgba(0,200,83,0.3)' : 'var(--shadow)',
              transition: 'transform 0.2s, border 0.3s, box-shadow 0.3s', cursor: 'pointer', height: '100%'
            }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-5px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>Total Patients</h3>
                <span style={{ fontSize: '1.5rem' }}>👥</span>
              </div>
              <p style={{
                fontSize: '3.5rem', fontWeight: 800, margin: '0',
                color: justAdded ? 'var(--primary)' : 'var(--text-main)',
                transition: 'color 0.4s ease',
              }}>{totalPatients.toLocaleString()}</p>
              <p style={{ color: 'var(--primary)', fontWeight: 600, marginTop: '0.5rem', fontSize: '0.9rem' }}>
                {justAdded ? '🎉 New patient registered!' : '+12% this week'}
              </p>
            </div>
          </Link>

          <Link href="/dashboard/appointments" style={{ textDecoration: 'none', display: 'block' }}>
            <div style={{ background: 'var(--glass-bg)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)', transition: 'transform 0.2s', cursor: 'pointer', height: '100%' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-5px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>Appointments Today</h3>
                <span style={{ fontSize: '1.5rem' }}>📅</span>
              </div>
              <p style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--text-main)', margin: '0' }}>8</p>
              <p style={{ color: '#3498db', fontWeight: 600, marginTop: '0.5rem', fontSize: '0.9rem' }}>8 pending confirmation</p>
            </div>
          </Link>

          <Link href="/dashboard/doctors" style={{ textDecoration: 'none', display: 'block' }}>
            <div style={{ background: 'var(--glass-bg)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)', transition: 'transform 0.2s', cursor: 'pointer', height: '100%' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-5px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>Active Doctors</h3>
                <span style={{ fontSize: '1.5rem' }}>🩺</span>
              </div>
              <p style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--text-main)', margin: '0' }}>6</p>
              <p style={{ color: '#9b59b6', fontWeight: 600, marginTop: '0.5rem', fontSize: '0.9rem' }}>2 on leave today</p>
            </div>
          </Link>

          {showAllCards && (
            <>
              <Link href="/dashboard/billing" style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{ background: 'var(--glass-bg)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)', transition: 'transform 0.2s', cursor: 'pointer', height: '100%' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-5px)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>Total Revenue</h3>
                    <span style={{ fontSize: '1.5rem' }}>💰</span>
                  </div>
                  <p style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--text-main)', margin: '0' }}>₹1,42,500</p>
                  <p style={{ color: '#27ae60', fontWeight: 600, marginTop: '0.5rem', fontSize: '0.9rem' }}>Monthly goal: 85%</p>
                </div>
              </Link>
            </>
          )}
        </div>

        {/* Quick Actions */}
        <div style={{ width: '100%' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1.5rem', letterSpacing: '-0.5px' }}>Quick Actions</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {/* Triggers modal instead of navigating */}
            <button onClick={() => setShowModal(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 1.5rem', fontSize: '1rem', borderRadius: '12px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 700, boxShadow: '0 4px 15px rgba(0,200,83,0.25)', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 25px rgba(0,200,83,0.4)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 15px rgba(0,200,83,0.25)'; }}>
              <span>➕</span> Add New Patient
            </button>
            <Link href="/dashboard/appointments" style={{ textDecoration: 'none' }}>
              <div className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 1.5rem', fontSize: '1rem', background: 'var(--glass-bg)', borderRadius: '12px', cursor: 'pointer' }}>
                <span>📅</span> Schedule Appointment
              </div>
            </Link>
            <Link href="/dashboard/billing" style={{ textDecoration: 'none' }}>
              <div className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 1.5rem', fontSize: '1rem', background: 'var(--glass-bg)', borderRadius: '12px', cursor: 'pointer' }}>
                <span>📝</span> Create Prescription
              </div>
            </Link>
            <Link href="/dashboard/billing/revenue" style={{ textDecoration: 'none' }}>
              <div className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 1.5rem', fontSize: '1rem', background: 'var(--glass-bg)', borderRadius: '12px', cursor: 'pointer' }}>
                <span>📊</span> Generate Report
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Appointments */}
        <div style={{ width: '100%', marginTop: '4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', letterSpacing: '-0.5px' }}>Recent Appointments</h2>
            <Link href="/dashboard/appointments">
              <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', borderRadius: '8px', cursor: 'pointer' }}>View All</button>
            </Link>
          </div>
          <div style={{ background: 'var(--glass-bg)', borderRadius: '16px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead style={{ background: 'rgba(0, 0, 0, 0.05)', borderBottom: '1px solid var(--glass-border)' }}>
                <tr>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Patient Name</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Doctor</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Date & Time</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Sarah Jenkins', doc: 'Dr. Smith (Cardiology)', time: 'Oct 24, 09:00 AM', status: 'Confirmed', color: '#27ae60', bg: 'rgba(46,204,113,0.2)' },
                  { name: 'Michael Chang', doc: 'Dr. Doe (Neurology)', time: 'Oct 24, 11:30 AM', status: 'In Progress', color: '#2980b9', bg: 'rgba(52,152,219,0.2)' },
                  { name: 'Emma Wilson', doc: 'Dr. Adams (Pediatrics)', time: 'Oct 24, 02:15 PM', status: 'Pending', color: '#f39c12', bg: 'rgba(241,196,15,0.2)' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--glass-border)', transition: 'background 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.02)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <td style={{ padding: '1rem', color: 'var(--text-main)', fontWeight: 600 }}>{row.name}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-main)' }}>{row.doc}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-main)' }}>{row.time}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ background: row.bg, color: row.color, padding: '0.4rem 0.8rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 700 }}>{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recently Added Patients Preview */}
        {patients.length > 0 && (
          <div style={{ width: '100%', marginTop: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
                Patient Registry <span style={{ fontSize: '1rem', color: 'var(--primary)', fontWeight: 700, background: 'rgba(0,200,83,0.12)', padding: '0.2rem 0.7rem', borderRadius: '50px' }}>{totalPatients} total</span>
              </h2>
              <Link href="/dashboard/patients">
                <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', borderRadius: '8px', cursor: 'pointer' }}>View All Patients</button>
              </Link>
            </div>
            <div style={{ background: 'var(--glass-bg)', borderRadius: '16px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead style={{ background: 'rgba(0,0,0,0.05)', borderBottom: '1px solid var(--glass-border)' }}>
                  <tr>
                    {['ID', 'Name', 'Age/Gender', 'Blood', 'Last Visit', 'Status'].map(h => (
                      <th key={h} style={{ padding: '0.9rem 1rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 700 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {patients.slice(0, 5).map((p, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--glass-border)', transition: 'background 0.2s', background: i === 0 && justAdded ? 'rgba(0,200,83,0.06)' : 'transparent' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.02)')}
                      onMouseLeave={e => (e.currentTarget.style.background = i === 0 && justAdded ? 'rgba(0,200,83,0.06)' : 'transparent')}>
                      <td style={{ padding: '0.9rem 1rem', color: '#94a3b8', fontFamily: 'monospace', fontSize: '0.85rem' }}>{p.id}</td>
                      <td style={{ padding: '0.9rem 1rem', color: 'var(--text-main)', fontWeight: 700 }}>{p.name} {i === 0 && justAdded && <span style={{ fontSize: '0.7rem', background: 'rgba(0,200,83,0.15)', color: 'var(--primary)', padding: '0.1rem 0.5rem', borderRadius: '50px', marginLeft: '0.4rem' }}>NEW</span>}</td>
                      <td style={{ padding: '0.9rem 1rem', color: 'var(--text-main)' }}>{p.age} / {p.gender}</td>
                      <td style={{ padding: '0.9rem 1rem', color: 'var(--text-muted)', fontWeight: 700 }}>{p.blood}</td>
                      <td style={{ padding: '0.9rem 1rem', color: 'var(--text-main)' }}>{p.lastVisit}</td>
                      <td style={{ padding: '0.9rem 1rem' }}>
                        <span style={{ color: p.status === 'Active' ? '#27ae60' : p.status === 'In Treatment' ? '#f39c12' : '#94a3b8', fontWeight: 700 }}>{p.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
