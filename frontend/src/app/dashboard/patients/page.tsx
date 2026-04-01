"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

const DEFAULT_PATIENTS = [
  { id: 'PT-9042', name: 'Sarah Jenkins', age: 34, gender: 'F', lastVisit: 'Oct 24, 2026', status: 'Active', phone: '9845012345', blood: 'B+' },
  { id: 'PT-8421', name: 'Michael Chang', age: 45, gender: 'M', lastVisit: 'Oct 20, 2026', status: 'In Treatment', phone: '9811234567', blood: 'O+' },
  { id: 'PT-1033', name: 'Emma Wilson', age: 8, gender: 'F', lastVisit: 'Sep 15, 2026', status: 'Active', phone: '9900112233', blood: 'A+' },
  { id: 'PT-4229', name: 'James Robert', age: 62, gender: 'M', lastVisit: 'Jan 04, 2026', status: 'Discharged', phone: '9766554433', blood: 'AB-' },
  { id: 'PT-5501', name: 'Priya Nair', age: 29, gender: 'F', lastVisit: 'Mar 31, 2026', status: 'Active', phone: '9987654321', blood: 'O-' },
  { id: 'PT-6612', name: 'Vikram Singh', age: 55, gender: 'M', lastVisit: 'Mar 28, 2026', status: 'In Treatment', phone: '9870012345', blood: 'A-' },
];

interface Patient {
  id: string; name: string; age: number; gender: string;
  lastVisit: string; status: string; phone: string; blood: string;
}

export default function PatientDirectory() {
  const [theme, setTheme] = useState('system');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userEmail, setUserEmail] = useState('admin@hospital.com');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [patients, setPatients] = useState<Patient[]>(DEFAULT_PATIENTS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [genderFilter, setGenderFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Newest First');
  const [showModal, setShowModal] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [form, setForm] = useState({ name: '', age: '', gender: 'M', phone: '', blood: 'A+', status: 'Active' });
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) setUserEmail(savedEmail);

    const stored = localStorage.getItem('caresync_patients');
    if (stored) {
      setPatients(JSON.parse(stored));
    } else {
      localStorage.setItem('caresync_patients', JSON.stringify(DEFAULT_PATIENTS));
    }
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

  const generatePatientId = () => `PT-${Math.floor(1000 + Math.random() * 8999)}`;

  const handleAddPatient = () => {
    if (!form.name.trim()) { setFormError('Patient name is required.'); return; }
    if (!form.age || isNaN(Number(form.age)) || Number(form.age) < 0 || Number(form.age) > 120) { setFormError('Please enter a valid age (0–120).'); return; }
    if (!form.phone.trim() || form.phone.trim().length < 7) { setFormError('Please enter a valid phone number.'); return; }

    const today = new Date();
    const dateStr = today.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    const newPatient: Patient = {
      id: generatePatientId(), name: form.name.trim(), age: Number(form.age),
      gender: form.gender, phone: form.phone.trim(), blood: form.blood,
      status: form.status, lastVisit: dateStr,
    };
    const updated = [newPatient, ...patients];
    setPatients(updated);
    localStorage.setItem('caresync_patients', JSON.stringify(updated));
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
    setForm({ name: '', age: '', gender: 'M', phone: '', blood: 'A+', status: 'Active' });
    setFormError('');
    setShowModal(false);
  };

  // Filter + sort
  const displayed = patients
    .filter(p => {
      const q = search.toLowerCase();
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.phone.includes(q);
      const matchStatus = statusFilter === 'All' || p.status === statusFilter;
      const matchGender = genderFilter === 'All' || p.gender === (genderFilter === 'Male' ? 'M' : genderFilter === 'Female' ? 'F' : 'O');
      return matchSearch && matchStatus && matchGender;
    })
    .sort((a, b) => {
      if (sortBy === 'Patient Name (A-Z)') return a.name.localeCompare(b.name);
      if (sortBy === 'Patient Name (Z-A)') return b.name.localeCompare(a.name);
      return 0; // Default: Newest First (already ordered by insertion)
    });

  const statusCounts = {
    All: patients.length,
    Active: patients.filter(p => p.status === 'Active').length,
    'In Treatment': patients.filter(p => p.status === 'In Treatment').length,
    Discharged: patients.filter(p => p.status === 'Discharged').length,
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem 1rem', borderRadius: '10px',
    border: '1.5px solid var(--glass-border)', background: 'var(--glass-bg)',
    color: 'var(--text-main)', fontFamily: 'inherit', fontSize: '0.95rem',
    outline: 'none', boxSizing: 'border-box',
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
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
        }} onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div style={{
            background: 'var(--bg-color)', borderRadius: '24px',
            border: '1px solid var(--glass-border)', boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
            padding: '2.5rem', width: '100%', maxWidth: '520px', animation: 'slideIn 0.25s ease-out',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>➕ Add New Patient</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0.3rem 0 0 0' }}>Fill in patient details to register</p>
              </div>
              <button onClick={() => setShowModal(false)} style={{ background: 'rgba(0,0,0,0.1)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Full Name *</label>
                <input style={inputStyle} placeholder="e.g. Riya Sharma" autoFocus value={form.name}
                  onChange={e => { setForm({ ...form, name: e.target.value }); setFormError(''); }} />
              </div>
              <div>
                <label style={labelStyle}>Age *</label>
                <input style={inputStyle} type="number" min="0" max="120" placeholder="e.g. 32" value={form.age}
                  onChange={e => { setForm({ ...form, age: e.target.value }); setFormError(''); }} />
              </div>
              <div>
                <label style={labelStyle}>Gender</label>
                <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="O">Other</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Phone Number *</label>
                <input style={inputStyle} placeholder="e.g. 9876543210" value={form.phone}
                  onChange={e => { setForm({ ...form, phone: e.target.value }); setFormError(''); }} />
              </div>
              <div>
                <label style={labelStyle}>Blood Group</label>
                <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.blood} onChange={e => setForm({ ...form, blood: e.target.value })}>
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <option key={bg}>{bg}</option>)}
                </select>
              </div>
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
        width: isSidebarOpen ? '260px' : '80px', background: 'var(--glass-bg)',
        borderRight: '1px solid var(--glass-border)', backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)', transition: 'all 0.3s ease', display: 'flex',
        flexDirection: 'column', padding: '1.5rem 1rem', boxShadow: 'var(--shadow)', zIndex: 10
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
          ].map(item => (
            <Link key={item.name} href={item.route} style={{
              display: 'flex', alignItems: 'center', padding: '1rem', borderRadius: '12px',
              color: item.name === 'Patients' ? 'white' : 'var(--text-main)',
              background: item.name === 'Patients' ? 'var(--primary)' : 'transparent',
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
      <main style={{ flex: 1, padding: '3rem 4rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', transition: 'all 0.3s ease', overflowY: 'auto' }}>
        <header style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem', letterSpacing: '-1px' }}>Patient Directory</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
              View and manage all registered hospital patients —{' '}
              <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{patients.length} total</span>
              {justAdded && <span style={{ marginLeft: '0.5rem', color: 'var(--primary)', fontWeight: 700, animation: 'pulse 0.5s ease' }}>✨ New patient added!</span>}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => setShowModal(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 1.3rem', fontSize: '1rem', borderRadius: '50px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 700, boxShadow: '0 4px 15px rgba(0,200,83,0.25)', transition: 'transform 0.2s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)')}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)')}>
              <span>➕</span> Add New Patient
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'var(--glass-bg)', padding: '0.4rem 1rem', borderRadius: '50px', border: '1px solid var(--glass-border)' }}>
              <span style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '0.9rem' }}>{userEmail}</span>
              <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                {userEmail.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Stats Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', width: '100%', marginBottom: '1.8rem' }}>
          {[
            { label: 'Total', value: statusCounts.All, color: '#3498db', icon: '👥' },
            { label: 'Active', value: statusCounts.Active, color: '#27ae60', icon: '✅' },
            { label: 'In Treatment', value: statusCounts['In Treatment'], color: '#e67e22', icon: '⚕️' },
            { label: 'Discharged', value: statusCounts.Discharged, color: '#94a3b8', icon: '🏠' },
          ].map((s, i) => (
            <div key={i} onClick={() => setStatusFilter(i === 0 ? 'All' : s.label)}
              style={{ background: 'var(--glass-bg)', padding: '1rem 1.2rem', borderRadius: '14px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)', display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', transition: 'transform 0.15s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)')}
              onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)')}>
              <span style={{ fontSize: '1.4rem' }}>{s.icon}</span>
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700, margin: 0, textTransform: 'uppercase' }}>{s.label}</p>
                <p style={{ fontSize: '1.6rem', fontWeight: 800, color: s.color, margin: 0, lineHeight: 1.1 }}>{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Search + Filter */}
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '1.5rem', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <input type="text" placeholder="🔍  Search by name, ID, or phone..."
              value={search} onChange={e => setSearch(e.target.value)}
              style={{ flex: 1, maxWidth: '400px', padding: '0.8rem 1.2rem', borderRadius: '50px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'var(--text-main)', fontFamily: 'inherit', outline: 'none' }} />
            <button onClick={() => setIsFilterVisible(!isFilterVisible)}
              className="btn btn-secondary"
              style={{ padding: '0.8rem 1.5rem', borderRadius: '12px', display: 'flex', gap: '0.5rem', alignItems: 'center', background: isFilterVisible ? 'var(--primary)' : undefined, color: isFilterVisible ? 'white' : undefined }}>
              <span>⚙️</span> Filter Options {isFilterVisible ? '▲' : '▼'}
            </button>
          </div>

          {isFilterVisible && (
            <div style={{
              background: 'var(--glass-bg)', backdropFilter: 'blur(10px)', padding: '1.5rem',
              borderRadius: '16px', border: '1px solid var(--glass-border)',
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1.5rem', animation: 'slideIn 0.2s ease-out'
            }}>
              <div>
                <label style={labelStyle}>Patient Status</label>
                <select style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'var(--text-main)' }}
                  value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                  <option value="All">All Statuses</option>
                  <option>Active</option><option>In Treatment</option><option>Discharged</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Gender</label>
                <select style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'var(--text-main)' }}
                  value={genderFilter} onChange={e => setGenderFilter(e.target.value)}>
                  <option value="All">All Genders</option><option>Male</option><option>Female</option><option>Other</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Sort By</label>
                <select style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'var(--text-main)' }}
                  value={sortBy} onChange={e => setSortBy(e.target.value)}>
                  <option>Newest First</option><option>Patient Name (A-Z)</option><option>Patient Name (Z-A)</option>
                </select>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
                <button className="btn btn-secondary" style={{ flex: 1, padding: '0.6rem', borderRadius: '8px', fontWeight: 600 }}
                  onClick={() => { setStatusFilter('All'); setGenderFilter('All'); setSortBy('Newest First'); setSearch(''); setIsFilterVisible(false); }}>
                  Reset
                </button>
                <button className="btn btn-primary" style={{ flex: 1, padding: '0.6rem', borderRadius: '8px', fontWeight: 600 }}
                  onClick={() => setIsFilterVisible(false)}>
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results header */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600, margin: 0 }}>
            Showing <span style={{ color: 'var(--text-main)' }}>{displayed.length}</span> of <span style={{ color: 'var(--text-main)' }}>{patients.length}</span> patients
          </p>
        </div>

        {/* Patients Table */}
        <div style={{ width: '100%', background: 'var(--glass-bg)', borderRadius: '20px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: 'rgba(0,0,0,0.05)', borderBottom: '1px solid var(--glass-border)' }}>
              <tr>
                {['Patient ID', 'Name', 'Age / Gender', 'Blood', 'Phone', 'Last Visit', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '1rem 1.2rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayed.length > 0 ? displayed.map((p, i) => (
                <tr key={p.id} style={{
                  borderBottom: '1px solid var(--glass-border)', transition: 'background 0.2s', cursor: 'pointer',
                  background: i === 0 && justAdded ? 'rgba(0,200,83,0.06)' : 'transparent'
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,200,83,0.04)')}
                  onMouseLeave={e => (e.currentTarget.style.background = i === 0 && justAdded ? 'rgba(0,200,83,0.06)' : 'transparent')}>
                  <td style={{ padding: '1rem 1.2rem', color: '#94a3b8', fontFamily: 'monospace', fontSize: '0.85rem' }}>{p.id}</td>
                  <td style={{ padding: '1rem 1.2rem' }}>
                    <span style={{ color: 'var(--text-main)', fontWeight: 700 }}>{p.name}</span>
                    {i === 0 && justAdded && <span style={{ marginLeft: '0.5rem', fontSize: '0.7rem', background: 'rgba(0,200,83,0.15)', color: 'var(--primary)', padding: '0.1rem 0.5rem', borderRadius: '50px', fontWeight: 800 }}>NEW</span>}
                  </td>
                  <td style={{ padding: '1rem 1.2rem', color: 'var(--text-main)' }}>{p.age} / {p.gender === 'M' ? 'Male' : p.gender === 'F' ? 'Female' : 'Other'}</td>
                  <td style={{ padding: '1rem 1.2rem', color: 'var(--text-muted)', fontWeight: 700 }}>{p.blood}</td>
                  <td style={{ padding: '1rem 1.2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>{p.phone}</td>
                  <td style={{ padding: '1rem 1.2rem', color: 'var(--text-main)' }}>{p.lastVisit}</td>
                  <td style={{ padding: '1rem 1.2rem' }}>
                    <span style={{
                      color: p.status === 'Active' ? '#27ae60' : p.status === 'In Treatment' ? '#e67e22' : '#94a3b8',
                      background: p.status === 'Active' ? 'rgba(46,204,113,0.15)' : p.status === 'In Treatment' ? 'rgba(241,196,15,0.15)' : 'rgba(149,165,166,0.15)',
                      padding: '0.3rem 0.8rem', borderRadius: '50px', fontWeight: 700, fontSize: '0.85rem'
                    }}>{p.status}</span>
                  </td>
                  <td style={{ padding: '1rem 1.2rem' }}>
                    <button style={{ color: 'var(--primary)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', padding: 0, marginRight: '0.8rem' }}>View →</button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={8} style={{ padding: '4rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ fontSize: '3rem' }}>🔍</span>
                      <p style={{ color: 'var(--text-main)', fontWeight: 700, fontSize: '1.1rem', margin: 0 }}>No patients found</p>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>Try adjusting your search or filters</p>
                      <button onClick={() => { setSearch(''); setStatusFilter('All'); setGenderFilter('All'); }}
                        style={{ padding: '0.5rem 1.2rem', borderRadius: '50px', background: 'var(--primary)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                        Clear Filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '1rem', textAlign: 'right', width: '100%' }}>
          Total registered patients: {patients.length}
        </p>
      </main>
    </div>
  );
}
