"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

type AppointmentStatus = 'Completed' | 'In Progress' | 'Upcoming' | 'Rescheduled' | 'Cancelled';

interface Appointment {
  id: string;
  patient: string;
  age: number;
  doctor: string;
  department: string;
  type: string;
  datetime: string;
  status: AppointmentStatus;
  notes?: string;
}

const allAppointments: Appointment[] = [
  // Today
  { id: 'APT-1001', patient: 'Aanya Sharma', age: 28, doctor: 'Dr. Sarah Smith', department: 'General Medicine', type: 'Routine Checkup', datetime: 'Today, 08:00 AM', status: 'Completed', notes: 'Annual health check done.' },
  { id: 'APT-1002', patient: 'Rahul Verma', age: 45, doctor: 'Dr. John Doe', department: 'Cardiology', type: 'ECG & Review', datetime: 'Today, 08:45 AM', status: 'Completed', notes: 'ECG results normal.' },
  { id: 'APT-1003', patient: 'Priya Nair', age: 32, doctor: 'Dr. Emily Chen', department: 'Gynecology', type: 'Prenatal Visit', datetime: 'Today, 09:30 AM', status: 'Completed', notes: 'Week 20 scan completed.' },
  { id: 'APT-1004', patient: 'Sarah Jenkins', age: 38, doctor: 'Dr. Sarah Smith', department: 'General Medicine', type: 'Routine Checkup', datetime: 'Today, 10:00 AM', status: 'Completed', notes: 'Follow-up on blood pressure.' },
  { id: 'APT-1005', patient: 'Michael Chang', age: 52, doctor: 'Dr. John Doe', department: 'Neurology', type: 'Neurology Consult', datetime: 'Today, 11:30 AM', status: 'In Progress', notes: 'MRI results review.' },
  { id: 'APT-1006', patient: 'Emma Wilson', age: 6, doctor: 'Dr. Emily Chen', department: 'Pediatrics', type: 'Vaccination', datetime: 'Today, 02:15 PM', status: 'Upcoming', notes: 'MMR booster due.' },
  { id: 'APT-1007', patient: 'Vikram Singh', age: 60, doctor: 'Dr. James Patel', department: 'Orthopedics', type: 'Post-Surgery Review', datetime: 'Today, 03:00 PM', status: 'Upcoming', notes: 'Knee replacement recovery check.' },
  { id: 'APT-1008', patient: 'Meera Iyer', age: 34, doctor: 'Dr. Lisa Wong', department: 'Dermatology', type: 'Skin Biopsy Review', datetime: 'Today, 04:00 PM', status: 'Upcoming', notes: 'Biopsy report discussion.' },
  // Upcoming (future dates)
  { id: 'APT-1009', patient: 'James Robert', age: 41, doctor: 'Dr. Michael Brown', department: 'Physiotherapy', type: 'Physical Therapy', datetime: 'Tomorrow, 10:00 AM', status: 'Upcoming', notes: 'Session 3 of 6.' },
  { id: 'APT-1010', patient: 'Sunita Patil', age: 55, doctor: 'Dr. John Doe', department: 'Cardiology', type: 'Stress Test', datetime: 'Tomorrow, 11:00 AM', status: 'Upcoming', notes: 'Pre-op cardiac evaluation.' },
  { id: 'APT-1011', patient: 'Arjun Mehta', age: 29, doctor: 'Dr. Emily Chen', department: 'ENT', type: 'Hearing Assessment', datetime: 'Apr 03, 09:00 AM', status: 'Upcoming', notes: 'Audiometry test scheduled.' },
  { id: 'APT-1012', patient: 'Fatima Khan', age: 48, doctor: 'Dr. Sarah Smith', department: 'Oncology', type: 'Chemo Review', datetime: 'Apr 03, 02:00 PM', status: 'Upcoming', notes: 'Cycle 4 assessment.' },
  { id: 'APT-1013', patient: 'David Lee', age: 67, doctor: 'Dr. James Patel', department: 'Urology', type: 'Prostate Screening', datetime: 'Apr 04, 10:30 AM', status: 'Upcoming', notes: 'Routine annual check.' },
  { id: 'APT-1014', patient: 'Nisha Gupta', age: 23, doctor: 'Dr. Lisa Wong', department: 'Ophthalmology', type: 'Vision Test', datetime: 'Apr 05, 03:30 PM', status: 'Rescheduled', notes: 'Rescheduled from Mar 28.' },
  // Completed (past)
  { id: 'APT-1015', patient: 'Olivia Davis', age: 31, doctor: 'Dr. Lisa Wong', department: 'Dermatology', type: 'Acne Treatment', datetime: 'Mar 31, 11:00 AM', status: 'Completed', notes: 'Prescribed retinoid cream.' },
  { id: 'APT-1016', patient: 'Lucas Miller', age: 50, doctor: 'Dr. James Patel', department: 'Orthopedics', type: 'Joint Pain Consult', datetime: 'Mar 31, 01:00 PM', status: 'Completed', notes: 'X-ray taken. Follow-up in 2 weeks.' },
  { id: 'APT-1017', patient: 'Kavita Rao', age: 44, doctor: 'Dr. John Doe', department: 'Cardiology', type: 'Angiography Review', datetime: 'Mar 30, 09:00 AM', status: 'Completed', notes: '70% blockage detected. Stent recommended.' },
  { id: 'APT-1018', patient: 'Sanjay Kumar', age: 37, doctor: 'Dr. Emily Chen', department: 'Gastroenterology', type: 'Endoscopy', datetime: 'Mar 30, 12:00 PM', status: 'Completed', notes: 'H. pylori positive. Medication started.' },
  { id: 'APT-1019', patient: 'Pooja Shah', age: 26, doctor: 'Dr. Sarah Smith', department: 'General Medicine', type: 'Fever & Cold', datetime: 'Mar 29, 10:00 AM', status: 'Completed', notes: 'Viral infection. Rest and fluids.' },
  { id: 'APT-1020', patient: 'Tom Harris', age: 72, doctor: 'Dr. James Patel', department: 'Orthopedics', type: 'Hip Replacement F/U', datetime: 'Mar 28, 09:30 AM', status: 'Completed', notes: 'Recovery on track.' },
  // Cancelled
  { id: 'APT-1021', patient: 'Riya Joshi', age: 19, doctor: 'Dr. Lisa Wong', department: 'Dermatology', type: 'Acne Consult', datetime: 'Oct 27, 09:45 AM', status: 'Cancelled', notes: 'Patient did not show up.' },
];

export default function AppointmentsDirectory() {
  const [theme, setTheme] = useState('system');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userEmail, setUserEmail] = useState('admin@hospital.com');
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [animating, setAnimating] = useState(false);

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

  const handleFilterChange = (filter: string) => {
    setAnimating(true);
    setTimeout(() => {
      setActiveFilter(filter);
      setAnimating(false);
    }, 150);
  };

  const filteredAppointments = allAppointments.filter(apt => {
    const matchesSearch =
      apt.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.id.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Today') return apt.datetime.includes('Today');
    if (activeFilter === 'Upcoming') return apt.status === 'Upcoming' || apt.status === 'Rescheduled';
    if (activeFilter === 'Completed') return apt.status === 'Completed';
    return true;
  });

  const counts = {
    All: allAppointments.length,
    Today: allAppointments.filter(a => a.datetime.includes('Today')).length,
    Upcoming: allAppointments.filter(a => a.status === 'Upcoming' || a.status === 'Rescheduled').length,
    Completed: allAppointments.filter(a => a.status === 'Completed').length,
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Completed': return { bg: 'rgba(46, 204, 113, 0.18)', color: '#27ae60', border: '1px solid rgba(46,204,113,0.3)' };
      case 'In Progress': return { bg: 'rgba(52, 152, 219, 0.18)', color: '#2980b9', border: '1px solid rgba(52,152,219,0.3)' };
      case 'Upcoming': return { bg: 'rgba(241, 196, 15, 0.18)', color: '#e67e22', border: '1px solid rgba(241,196,15,0.3)' };
      case 'Rescheduled': return { bg: 'rgba(155, 89, 182, 0.18)', color: '#8e44ad', border: '1px solid rgba(155,89,182,0.3)' };
      case 'Cancelled': return { bg: 'rgba(231, 76, 60, 0.18)', color: '#c0392b', border: '1px solid rgba(231,76,60,0.3)' };
      default: return { bg: 'rgba(149, 165, 166, 0.18)', color: '#7f8c8d', border: '1px solid rgba(149,165,166,0.3)' };
    }
  };

  const filterMeta: Record<string, { icon: string; color: string; label: string; summary: string }> = {
    All: { icon: '📋', color: '#3498db', label: 'All Appointments', summary: 'Complete appointment registry' },
    Today: { icon: '📅', color: '#27ae60', label: "Today's Appointments", summary: "Scheduled visits for today" },
    Upcoming: { icon: '⏳', color: '#e67e22', label: 'Upcoming Appointments', summary: 'Future scheduled visits' },
    Completed: { icon: '✅', color: '#27ae60', label: 'Completed Appointments', summary: 'Past completed visits' },
  };

  const meta = filterMeta[activeFilter];

  const todayStats = {
    total: allAppointments.filter(a => a.datetime.includes('Today')).length,
    completed: allAppointments.filter(a => a.datetime.includes('Today') && a.status === 'Completed').length,
    inProgress: allAppointments.filter(a => a.datetime.includes('Today') && a.status === 'In Progress').length,
    upcoming: allAppointments.filter(a => a.datetime.includes('Today') && a.status === 'Upcoming').length,
  };

  const upcomingStats = {
    total: allAppointments.filter(a => a.status === 'Upcoming' || a.status === 'Rescheduled').length,
    rescheduled: allAppointments.filter(a => a.status === 'Rescheduled').length,
    tomorrow: allAppointments.filter(a => a.datetime.includes('Tomorrow')).length,
  };

  const completedStats = {
    total: allAppointments.filter(a => a.status === 'Completed').length,
    today: allAppointments.filter(a => a.datetime.includes('Today') && a.status === 'Completed').length,
    yesterday: allAppointments.filter(a => (a.datetime.includes('Mar 31') || a.datetime.includes('Mar 30')) && a.status === 'Completed').length,
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
              color: item.name === 'Appointments' ? 'white' : 'var(--text-main)',
              background: item.name === 'Appointments' ? 'var(--primary)' : 'transparent',
              textDecoration: 'none', fontWeight: 600, transition: 'all 0.2s', gap: '16px',
              justifyContent: isSidebarOpen ? 'flex-start' : 'center'
            }}>
              <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
              {isSidebarOpen && item.name}
            </Link>
          ))}
        </nav>

        <button onClick={toggleTheme} style={{
          background: 'rgba(255, 255, 255, 0.1)', border: '1px solid var(--glass-border)',
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

        {/* Header */}
        <header style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem', letterSpacing: '-1px' }}>Appointments Hub</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Manage outpatient schedules and view upcoming visits.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', fontSize: '1rem', borderRadius: '50px', border: 'none', cursor: 'pointer' }}>
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

        {/* Filter Tabs */}
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '2rem', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {(['All', 'Today', 'Upcoming', 'Completed'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                style={{
                  padding: '0.65rem 1.4rem',
                  borderRadius: '50px',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  background: activeFilter === filter ? 'var(--primary)' : 'var(--glass-bg)',
                  color: activeFilter === filter ? 'white' : 'var(--text-main)',
                  border: activeFilter === filter ? '2px solid var(--primary)' : '1px solid var(--glass-border)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  boxShadow: activeFilter === filter ? '0 4px 15px rgba(0,200,83,0.3)' : 'none',
                  transform: activeFilter === filter ? 'translateY(-1px)' : 'none',
                }}
              >
                {filter === 'All' && '📋'}
                {filter === 'Today' && '📅'}
                {filter === 'Upcoming' && '⏳'}
                {filter === 'Completed' && '✅'}
                {filter}
                <span style={{
                  background: activeFilter === filter ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.08)',
                  borderRadius: '50px', padding: '0.1rem 0.55rem', fontSize: '0.78rem', fontWeight: 800
                }}>
                  {counts[filter as keyof typeof counts]}
                </span>
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="🔍  Search patient, doctor, type..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              padding: '0.65rem 1.2rem', borderRadius: '50px',
              border: '1px solid var(--glass-border)', background: 'var(--glass-bg)',
              color: 'var(--text-main)', fontFamily: 'inherit', fontSize: '0.9rem',
              minWidth: '260px', outline: 'none'
            }}
          />
        </div>

        {/* Context Stats Cards */}
        <div style={{
          width: '100%', marginBottom: '2rem',
          opacity: animating ? 0 : 1,
          transform: animating ? 'translateY(8px)' : 'translateY(0)',
          transition: 'all 0.2s ease'
        }}>
          {activeFilter === 'Today' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.2rem', width: '100%' }}>
              {[
                { label: "Total Today", value: todayStats.total, icon: '📅', color: '#3498db' },
                { label: "Completed", value: todayStats.completed, icon: '✅', color: '#27ae60' },
                { label: "In Progress", value: todayStats.inProgress, icon: '⚡', color: '#2980b9' },
                { label: "Remaining", value: todayStats.upcoming, icon: '⏰', color: '#e67e22' },
              ].map((s, i) => (
                <div key={i} style={{ background: 'var(--glass-bg)', padding: '1.2rem 1.5rem', borderRadius: '16px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.8rem' }}>{s.icon}</span>
                  <div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>{s.label}</p>
                    <p style={{ fontSize: '1.8rem', fontWeight: 800, color: s.color, margin: 0, lineHeight: 1.2 }}>{s.value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeFilter === 'Upcoming' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.2rem', width: '100%' }}>
              {[
                { label: "Total Upcoming", value: upcomingStats.total, icon: '⏳', color: '#e67e22' },
                { label: "Tomorrow", value: upcomingStats.tomorrow, icon: '📆', color: '#3498db' },
                { label: "Rescheduled", value: upcomingStats.rescheduled, icon: '🔄', color: '#8e44ad' },
                { label: "This Week", value: upcomingStats.total - upcomingStats.rescheduled, icon: '📊', color: '#27ae60' },
              ].map((s, i) => (
                <div key={i} style={{ background: 'var(--glass-bg)', padding: '1.2rem 1.5rem', borderRadius: '16px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.8rem' }}>{s.icon}</span>
                  <div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>{s.label}</p>
                    <p style={{ fontSize: '1.8rem', fontWeight: 800, color: s.color, margin: 0, lineHeight: 1.2 }}>{s.value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeFilter === 'Completed' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.2rem', width: '100%' }}>
              {[
                { label: "Total Completed", value: completedStats.total, icon: '✅', color: '#27ae60' },
                { label: "Today", value: completedStats.today, icon: '📅', color: '#2980b9' },
                { label: "Yesterday", value: completedStats.yesterday, icon: '📆', color: '#8e44ad' },
                { label: "Success Rate", value: '95%', icon: '🎯', color: '#27ae60' },
              ].map((s, i) => (
                <div key={i} style={{ background: 'var(--glass-bg)', padding: '1.2rem 1.5rem', borderRadius: '16px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.8rem' }}>{s.icon}</span>
                  <div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>{s.label}</p>
                    <p style={{ fontSize: '1.8rem', fontWeight: 800, color: s.color, margin: 0, lineHeight: 1.2 }}>{s.value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeFilter === 'All' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.2rem', width: '100%' }}>
              {[
                { label: "Total Records", value: allAppointments.length, icon: '📋', color: '#3498db' },
                { label: "Today", value: counts.Today, icon: '📅', color: '#27ae60' },
                { label: "Upcoming", value: counts.Upcoming, icon: '⏳', color: '#e67e22' },
                { label: "Completed", value: counts.Completed, icon: '✅', color: '#27ae60' },
              ].map((s, i) => (
                <div key={i} style={{ background: 'var(--glass-bg)', padding: '1.2rem 1.5rem', borderRadius: '16px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.8rem' }}>{s.icon}</span>
                  <div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>{s.label}</p>
                    <p style={{ fontSize: '1.8rem', fontWeight: 800, color: s.color, margin: 0, lineHeight: 1.2 }}>{s.value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section Title */}
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <span style={{ fontSize: '1.3rem' }}>{meta.icon}</span>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>{meta.label}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>{meta.summary} — {filteredAppointments.length} record{filteredAppointments.length !== 1 ? 's' : ''} found</p>
          </div>
        </div>

        {/* Appointments Table */}
        <div style={{
          width: '100%', background: 'var(--glass-bg)', borderRadius: '20px',
          border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)', overflow: 'hidden',
          opacity: animating ? 0 : 1,
          transform: animating ? 'translateY(8px)' : 'translateY(0)',
          transition: 'all 0.2s ease'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: 'rgba(0, 0, 0, 0.06)', borderBottom: '1px solid var(--glass-border)' }}>
              <tr>
                {['Apt ID', 'Patient', 'Doctor', 'Department', 'Type', 'Date & Time', 'Status', 'Action'].map(h => (
                  <th key={h} style={{ padding: '1rem 1.2rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length > 0 ? filteredAppointments.map((apt, idx) => (
                <tr
                  key={idx}
                  style={{ borderBottom: '1px solid var(--glass-border)', transition: 'background 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,200,83,0.04)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '1rem 1.2rem', color: '#94a3b8', fontFamily: 'monospace', fontSize: '0.85rem' }}>{apt.id}</td>
                  <td style={{ padding: '1rem 1.2rem' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.95rem' }}>{apt.patient}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Age {apt.age}</div>
                  </td>
                  <td style={{ padding: '1rem 1.2rem', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.9rem' }}>{apt.doctor}</td>
                  <td style={{ padding: '1rem 1.2rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{apt.department}</td>
                  <td style={{ padding: '1rem 1.2rem', color: 'var(--text-main)', fontSize: '0.9rem' }}>{apt.type}</td>
                  <td style={{ padding: '1rem 1.2rem', color: 'var(--text-main)', fontSize: '0.88rem', fontWeight: 600, whiteSpace: 'nowrap' }}>{apt.datetime}</td>
                  <td style={{ padding: '1rem 1.2rem' }}>
                    <span style={{
                      background: getStatusStyle(apt.status).bg,
                      color: getStatusStyle(apt.status).color,
                      border: getStatusStyle(apt.status).border,
                      padding: '0.35rem 0.85rem',
                      borderRadius: '50px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      display: 'inline-block',
                      textAlign: 'center',
                      whiteSpace: 'nowrap'
                    }}>
                      {apt.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.2rem' }}>
                    <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                      <button style={{ color: 'var(--primary)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', padding: 0 }}>View</button>
                      <button style={{ color: 'var(--text-muted)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', padding: 0 }}>Edit</button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={8} style={{ padding: '4rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ fontSize: '3rem' }}>🔍</span>
                      <p style={{ color: 'var(--text-main)', fontWeight: 700, fontSize: '1.1rem', margin: 0 }}>No appointments found</p>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
                        {searchQuery ? `No results for "${searchQuery}"` : `No ${activeFilter.toLowerCase()} appointments at the moment.`}
                      </p>
                      {searchQuery && (
                        <button onClick={() => setSearchQuery('')} style={{ marginTop: '0.5rem', padding: '0.5rem 1.2rem', borderRadius: '50px', background: 'var(--primary)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                          Clear Search
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '1rem', textAlign: 'right', width: '100%' }}>
          Showing {filteredAppointments.length} of {allAppointments.length} total appointments
        </p>
      </main>
    </div>
  );
}
