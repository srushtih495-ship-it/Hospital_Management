"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AddDoctorPage() {
  const router = useRouter();
  const [theme, setTheme] = useState('system');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userEmail, setUserEmail] = useState('admin@hospital.com');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    name: '',
    specialty: '',
    department: '',
    qualification: '',
    experience: '',
    phone: '',
    email: '',
    gender: 'Male',
    status: 'Available',
    consultationFee: '',
    bio: '',
    avatar: '👨‍⚕️',
  });

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

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Full name is required.';
    if (!form.specialty.trim()) e.specialty = 'Specialty is required.';
    if (!form.department.trim()) e.department = 'Department is required.';
    if (!form.qualification.trim()) e.qualification = 'Qualification is required.';
    if (!form.experience || isNaN(Number(form.experience)) || Number(form.experience) < 0)
      e.experience = 'Valid years of experience required.';
    if (!form.phone.trim() || form.phone.trim().length < 7) e.phone = 'Valid phone number required.';
    if (!form.email.trim() || !form.email.includes('@')) e.email = 'Valid email required.';
    if (!form.consultationFee || isNaN(Number(form.consultationFee)))
      e.consultationFee = 'Valid consultation fee required.';
    return e;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitting(true);

    const newDoctor = {
      id: `DR-${Math.floor(1000 + Math.random() * 8999)}`,
      name: `Dr. ${form.name.trim()}`,
      specialty: form.specialty.trim(),
      department: form.department.trim(),
      qualification: form.qualification.trim(),
      experience: Number(form.experience),
      phone: form.phone.trim(),
      email: form.email.trim(),
      gender: form.gender,
      status: form.status,
      consultationFee: Number(form.consultationFee),
      bio: form.bio.trim(),
      avatar: form.gender === 'Female' ? '👩‍⚕️' : '👨‍⚕️',
      patients: 0,
      rating: 0,
      joinedDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    };

    // Save to localStorage
    const stored = localStorage.getItem('caresync_doctors');
    const existing = stored ? JSON.parse(stored) : [];
    const updated = [newDoctor, ...existing];
    localStorage.setItem('caresync_doctors', JSON.stringify(updated));

    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setTimeout(() => router.push('/dashboard/doctors'), 1800);
    }, 900);
  };

  const specialties = [
    'Cardiologist', 'Neurologist', 'Orthopedics', 'Pediatrician', 'Dermatologist',
    'General Practice', 'Gynecologist', 'Oncologist', 'Psychiatrist', 'Radiologist',
    'Anesthesiologist', 'ENT Specialist', 'Ophthalmologist', 'Urologist', 'Gastroenterologist',
  ];

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.8rem 1rem', borderRadius: '12px',
    border: '1.5px solid var(--glass-border)', background: 'var(--glass-bg)',
    color: 'var(--text-main)', fontFamily: 'inherit', fontSize: '0.95rem',
    outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
  };
  const errorInputStyle: React.CSSProperties = { ...inputStyle, borderColor: '#e74c3c' };
  const labelStyle: React.CSSProperties = {
    display: 'block', color: 'var(--text-muted)', marginBottom: '0.4rem',
    fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.5px',
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', background: 'var(--bg-color)', transition: 'background 0.3s ease' }}>

      {/* Success Overlay */}
      {success && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 2000,
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            background: 'var(--bg-color)', borderRadius: '24px', padding: '3rem 4rem',
            border: '2px solid var(--primary)', boxShadow: '0 0 40px rgba(0,200,83,0.3)',
            textAlign: 'center', animation: 'slideIn 0.3s ease-out',
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              Doctor Registered!
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
              Dr. {form.name} has been added to the directory.
            </p>
            <p style={{ color: 'var(--primary)', fontWeight: 600, marginTop: '1rem', fontSize: '0.9rem' }}>
              Redirecting to Doctors Directory...
            </p>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside style={{
        width: isSidebarOpen ? '260px' : '80px', background: 'var(--glass-bg)',
        borderRight: '1px solid var(--glass-border)', backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)', transition: 'all 0.3s ease', display: 'flex',
        flexDirection: 'column', padding: '1.5rem 1rem', boxShadow: 'var(--shadow)', zIndex: 10,
        flexShrink: 0,
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
              color: item.name === 'Doctors' ? 'white' : 'var(--text-main)',
              background: item.name === 'Doctors' ? 'var(--primary)' : 'transparent',
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
      <main style={{ flex: 1, padding: '3rem 4rem', overflowY: 'auto' }}>

        {/* Header */}
        <header style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
          <div>
            <Link href="/dashboard/doctors" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.95rem' }}>
              ⬅️ Back to Doctors Directory
            </Link>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem', letterSpacing: '-1px' }}>
              🩺 Add New Doctor
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Register a new medical professional to the CareSync system.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'var(--glass-bg)', padding: '0.4rem 1rem', borderRadius: '50px', border: '1px solid var(--glass-border)' }}>
            <span style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '0.9rem' }}>{userEmail}</span>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              {userEmail.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Avatar Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2.5rem', background: 'var(--glass-bg)', padding: '1.5rem 2rem', borderRadius: '20px', border: '1px solid var(--glass-border)' }}>
          <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(0,200,83,0.2), rgba(0,100,200,0.2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem', border: '2px solid var(--glass-border)' }}>
            {form.gender === 'Female' ? '👩‍⚕️' : '👨‍⚕️'}
          </div>
          <div>
            <p style={{ color: 'var(--text-main)', fontWeight: 700, fontSize: '1rem', margin: '0 0 0.3rem 0' }}>Doctor Avatar</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>Avatar is automatically set based on gender selection below.</p>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27ae60' }}></div>
            <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.9rem' }}>New Registration</span>
          </div>
        </div>

        {/* Form Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>

          {/* LEFT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ background: 'var(--glass-bg)', borderRadius: '20px', border: '1px solid var(--glass-border)', padding: '2rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                👤 Personal Information
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <label style={labelStyle}>Full Name (without Dr.) *</label>
                  <input style={errors.name ? errorInputStyle : inputStyle}
                    placeholder="e.g. Anjali Mehta"
                    value={form.name}
                    onChange={e => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: '' }); }} />
                  {errors.name && <p style={{ color: '#e74c3c', fontSize: '0.8rem', margin: '0.3rem 0 0 0' }}>{errors.name}</p>}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle}>Gender</label>
                    <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Status</label>
                    <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                      <option>Available</option>
                      <option>In Surgery</option>
                      <option>Consulting</option>
                      <option>On Leave</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Phone Number *</label>
                  <input style={errors.phone ? errorInputStyle : inputStyle}
                    placeholder="e.g. 9876543210"
                    value={form.phone}
                    onChange={e => { setForm({ ...form, phone: e.target.value }); setErrors({ ...errors, phone: '' }); }} />
                  {errors.phone && <p style={{ color: '#e74c3c', fontSize: '0.8rem', margin: '0.3rem 0 0 0' }}>{errors.phone}</p>}
                </div>
                <div>
                  <label style={labelStyle}>Email Address *</label>
                  <input style={errors.email ? errorInputStyle : inputStyle}
                    type="email" placeholder="e.g. doctor@hospital.com"
                    value={form.email}
                    onChange={e => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: '' }); }} />
                  {errors.email && <p style={{ color: '#e74c3c', fontSize: '0.8rem', margin: '0.3rem 0 0 0' }}>{errors.email}</p>}
                </div>
              </div>
            </div>

            {/* Bio */}
            <div style={{ background: 'var(--glass-bg)', borderRadius: '20px', border: '1px solid var(--glass-border)', padding: '2rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                📝 Short Bio
              </h2>
              <textarea
                rows={4}
                placeholder="Brief description of the doctor's expertise and background..."
                value={form.bio}
                onChange={e => setForm({ ...form, bio: e.target.value })}
                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
              />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ background: 'var(--glass-bg)', borderRadius: '20px', border: '1px solid var(--glass-border)', padding: '2rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                🏥 Professional Details
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <label style={labelStyle}>Specialty *</label>
                  <select style={errors.specialty ? { ...errorInputStyle, cursor: 'pointer' } : { ...inputStyle, cursor: 'pointer' }}
                    value={form.specialty}
                    onChange={e => { setForm({ ...form, specialty: e.target.value }); setErrors({ ...errors, specialty: '' }); }}>
                    <option value="">— Select Specialty —</option>
                    {specialties.map(s => <option key={s}>{s}</option>)}
                  </select>
                  {errors.specialty && <p style={{ color: '#e74c3c', fontSize: '0.8rem', margin: '0.3rem 0 0 0' }}>{errors.specialty}</p>}
                </div>
                <div>
                  <label style={labelStyle}>Department *</label>
                  <input style={errors.department ? errorInputStyle : inputStyle}
                    placeholder="e.g. Cardiology"
                    value={form.department}
                    onChange={e => { setForm({ ...form, department: e.target.value }); setErrors({ ...errors, department: '' }); }} />
                  {errors.department && <p style={{ color: '#e74c3c', fontSize: '0.8rem', margin: '0.3rem 0 0 0' }}>{errors.department}</p>}
                </div>
                <div>
                  <label style={labelStyle}>Qualification *</label>
                  <input style={errors.qualification ? errorInputStyle : inputStyle}
                    placeholder="e.g. MBBS, MD (Cardiology)"
                    value={form.qualification}
                    onChange={e => { setForm({ ...form, qualification: e.target.value }); setErrors({ ...errors, qualification: '' }); }} />
                  {errors.qualification && <p style={{ color: '#e74c3c', fontSize: '0.8rem', margin: '0.3rem 0 0 0' }}>{errors.qualification}</p>}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle}>Years of Experience *</label>
                    <input style={errors.experience ? errorInputStyle : inputStyle}
                      type="number" min="0" placeholder="e.g. 10"
                      value={form.experience}
                      onChange={e => { setForm({ ...form, experience: e.target.value }); setErrors({ ...errors, experience: '' }); }} />
                    {errors.experience && <p style={{ color: '#e74c3c', fontSize: '0.8rem', margin: '0.3rem 0 0 0' }}>{errors.experience}</p>}
                  </div>
                  <div>
                    <label style={labelStyle}>Consultation Fee (₹) *</label>
                    <input style={errors.consultationFee ? errorInputStyle : inputStyle}
                      type="number" min="0" placeholder="e.g. 500"
                      value={form.consultationFee}
                      onChange={e => { setForm({ ...form, consultationFee: e.target.value }); setErrors({ ...errors, consultationFee: '' }); }} />
                    {errors.consultationFee && <p style={{ color: '#e74c3c', fontSize: '0.8rem', margin: '0.3rem 0 0 0' }}>{errors.consultationFee}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Preview */}
            <div style={{ background: 'linear-gradient(135deg, rgba(0,200,83,0.08), rgba(0,100,200,0.08))', borderRadius: '20px', border: '1px solid rgba(0,200,83,0.2)', padding: '2rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                👁️ Preview
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '2.5rem' }}>{form.gender === 'Female' ? '👩‍⚕️' : '👨‍⚕️'}</span>
                <div>
                  <p style={{ fontWeight: 800, color: 'var(--text-main)', margin: 0, fontSize: '1rem' }}>
                    {form.name ? `Dr. ${form.name}` : 'Dr. Full Name'}
                  </p>
                  <p style={{ color: 'var(--primary)', fontWeight: 600, margin: 0, fontSize: '0.85rem' }}>
                    {form.specialty || 'Specialty'}
                  </p>
                </div>
                <span style={{ marginLeft: 'auto', background: form.status === 'Available' ? 'rgba(46,204,113,0.2)' : 'rgba(52,152,219,0.2)', color: form.status === 'Available' ? '#27ae60' : '#2980b9', padding: '0.3rem 0.8rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 700 }}>
                  {form.status}
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', fontSize: '0.85rem' }}>
                {[
                  { l: '🏥 Dept', v: form.department || '—' },
                  { l: '🎓 Qual', v: form.qualification || '—' },
                  { l: '⏱ Exp', v: form.experience ? `${form.experience} yrs` : '—' },
                  { l: '💰 Fee', v: form.consultationFee ? `₹${form.consultationFee}` : '—' },
                  { l: '📞 Phone', v: form.phone || '—' },
                  { l: '📧 Email', v: form.email || '—' },
                ].map((r, i) => (
                  <div key={i}>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{r.l}: </span>
                    <span style={{ color: 'var(--text-main)', fontWeight: 700 }}>{r.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', justifyContent: 'flex-end' }}>
          <Link href="/dashboard/doctors" style={{ textDecoration: 'none' }}>
            <button style={{
              padding: '0.9rem 2rem', borderRadius: '14px',
              border: '1.5px solid var(--glass-border)', background: 'transparent',
              color: 'var(--text-main)', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem',
            }}>
              Cancel
            </button>
          </Link>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            style={{
              padding: '0.9rem 2.5rem', borderRadius: '14px', border: 'none',
              background: submitting ? 'rgba(0,200,83,0.5)' : 'linear-gradient(135deg, var(--primary), var(--secondary))',
              color: 'white', fontWeight: 800, cursor: submitting ? 'not-allowed' : 'pointer',
              fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.6rem',
              boxShadow: '0 4px 20px rgba(0,200,83,0.3)', transition: 'all 0.2s',
            }}
          >
            {submitting ? '⏳ Registering...' : '✅ Register Doctor'}
          </button>
        </div>

      </main>
    </div>
  );
}
