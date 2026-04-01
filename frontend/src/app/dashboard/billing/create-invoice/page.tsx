"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

export default function CreateInvoicePage() {
  const router = useRouter();
  const [theme, setTheme] = useState('system');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userEmail, setUserEmail] = useState('admin@hospital.com');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    patientName: '',
    patientId: '',
    patientPhone: '',
    patientEmail: '',
    doctorName: '',
    department: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    paymentMethod: 'UPI',
    notes: '',
    taxRate: 18,
    discount: 0,
  });

  const [lineItems, setLineItems] = useState<LineItem[]>([
    { description: '', quantity: 1, unitPrice: 0 },
  ]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) setUserEmail(savedEmail);

    // Auto-set due date (14 days from today)
    const due = new Date();
    due.setDate(due.getDate() + 14);
    setForm(f => ({ ...f, dueDate: due.toISOString().split('T')[0] }));
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

  // ── Calculations ──────────────────────────────────────────────
  const subtotal = lineItems.reduce((s, i) => s + i.quantity * i.unitPrice, 0);
  const discountAmount = (subtotal * form.discount) / 100;
  const taxable = subtotal - discountAmount;
  const taxAmount = (taxable * form.taxRate) / 100;
  const grandTotal = taxable + taxAmount;

  const fmt = (n: number) => `₹${n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // ── Line items helpers ────────────────────────────────────────
  const addLine = () => setLineItems([...lineItems, { description: '', quantity: 1, unitPrice: 0 }]);
  const removeLine = (i: number) => setLineItems(lineItems.filter((_, idx) => idx !== i));
  const updateLine = (i: number, field: keyof LineItem, val: string | number) => {
    const updated = lineItems.map((item, idx) => {
      if (idx !== i) return item;
      return { ...item, [field]: val };
    });
    setLineItems(updated);
  };

  // ── Validation ────────────────────────────────────────────────
  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.patientName.trim()) e.patientName = 'Patient name is required.';
    if (!form.doctorName.trim()) e.doctorName = 'Doctor name is required.';
    if (!form.department.trim()) e.department = 'Department is required.';
    if (!form.dueDate) e.dueDate = 'Due date is required.';
    if (lineItems.every(i => !i.description.trim())) e.lineItems = 'Add at least one service/item.';
    return e;
  };

  // ── Submit ────────────────────────────────────────────────────
  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitting(true);

    const invoiceId = `INV-${Math.floor(2000 + Math.random() * 999)}`;
    const newInvoice = {
      id: invoiceId,
      patient: form.patientName.trim(),
      patientId: form.patientId.trim(),
      doctor: form.doctorName.trim(),
      department: form.department.trim(),
      date: new Date(form.invoiceDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      dueDate: new Date(form.dueDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      amount: fmt(grandTotal),
      subtotal: fmt(subtotal),
      tax: fmt(taxAmount),
      discount: fmt(discountAmount),
      grandTotal,
      paymentMethod: form.paymentMethod,
      status: 'Pending',
      notes: form.notes,
      lineItems,
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    const stored = localStorage.getItem('caresync_invoices');
    const existing = stored ? JSON.parse(stored) : [];
    localStorage.setItem('caresync_invoices', JSON.stringify([newInvoice, ...existing]));

    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setTimeout(() => router.push('/dashboard/billing'), 2000);
    }, 900);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.8rem 1rem', borderRadius: '12px',
    border: '1.5px solid var(--glass-border)', background: 'var(--glass-bg)',
    color: 'var(--text-main)', fontFamily: 'inherit', fontSize: '0.92rem',
    outline: 'none', boxSizing: 'border-box',
  };
  const errStyle: React.CSSProperties = { ...inputStyle, borderColor: '#e74c3c' };
  const labelStyle: React.CSSProperties = {
    display: 'block', color: 'var(--text-muted)', marginBottom: '0.4rem',
    fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px',
  };
  const cardStyle: React.CSSProperties = {
    background: 'var(--glass-bg)', borderRadius: '20px',
    border: '1px solid var(--glass-border)', padding: '2rem',
    boxShadow: 'var(--shadow)', marginBottom: '1.5rem',
  };

  const departments = ['Cardiology','Neurology','Orthopedics','Pediatrics','Dermatology','General Medicine','Gynecology','ENT','Ophthalmology','Radiology','Oncology','Urology'];
  const services = ['Consultation','Surgery','Lab Test','X-Ray','MRI Scan','Physiotherapy','Vaccination','ICU Charges','Medicine','Nursing Care','Room Charges','ECG'];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', background: 'var(--bg-color)', transition: 'background 0.3s ease' }}>

      {/* ── Success Overlay ───────────────────────────────────── */}
      {success && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'var(--bg-color)', borderRadius: '24px', padding: '3rem 4rem', border: '2px solid var(--primary)', boxShadow: '0 0 50px rgba(0,200,83,0.3)', textAlign: 'center', animation: 'slideIn 0.3s ease-out' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🧾</div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>Invoice Created!</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Invoice for <strong>{form.patientName}</strong> — {fmt(grandTotal)}</p>
            <p style={{ color: 'var(--primary)', fontWeight: 600, marginTop: '1rem', fontSize: '0.9rem' }}>Redirecting to Billing Dashboard...</p>
          </div>
        </div>
      )}

      {/* ── Sidebar ───────────────────────────────────────────── */}
      <aside style={{ width: isSidebarOpen ? '260px' : '80px', background: 'var(--glass-bg)', borderRight: '1px solid var(--glass-border)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column', padding: '1.5rem 1rem', boxShadow: 'var(--shadow)', zIndex: 10, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: isSidebarOpen ? 'space-between' : 'center', marginBottom: '3rem' }}>
          {isSidebarOpen && <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>CareSync</h2>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer', fontSize: '1.5rem', padding: '0.4rem', borderRadius: '8px' }}>
            {isSidebarOpen ? '⏪' : '☰'}
          </button>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 }}>
          {[
            { name: 'Dashboard', icon: '📊', route: '/dashboard' },
            { name: 'Patients', icon: '👥', route: '/dashboard/patients' },
            { name: 'Appointments', icon: '📅', route: '/dashboard/appointments' },
            { name: 'Doctors', icon: '🩺', route: '/dashboard/doctors' },
            { name: 'Billing', icon: '💳', route: '/dashboard/billing' },
          ].map(item => (
            <Link key={item.name} href={item.route} style={{ display: 'flex', alignItems: 'center', padding: '1rem', borderRadius: '12px', color: item.name === 'Billing' ? 'white' : 'var(--text-main)', background: item.name === 'Billing' ? 'var(--primary)' : 'transparent', textDecoration: 'none', fontWeight: 600, gap: '16px', justifyContent: isSidebarOpen ? 'flex-start' : 'center', transition: 'all 0.2s' }}>
              <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
              {isSidebarOpen && item.name}
            </Link>
          ))}
        </nav>
        <button onClick={toggleTheme} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', padding: '1rem', borderRadius: '12px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: isSidebarOpen ? 'flex-start' : 'center', gap: '12px', marginTop: 'auto', transition: 'all 0.3s ease' }}>
          <span style={{ fontSize: '1.3rem' }}>{theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) ? '☀️' : '🌙'}</span>
          {isSidebarOpen && (theme === 'dark' ? 'Light Mode' : 'Dark Mode')}
        </button>
      </aside>

      {/* ── Main ─────────────────────────────────────────────── */}
      <main style={{ flex: 1, padding: '3rem 4rem', overflowY: 'auto' }}>

        {/* Header */}
        <header style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
          <div>
            <Link href="/dashboard/billing" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.95rem' }}>
              ⬅️ Back to Billing &amp; Invoices
            </Link>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.4rem', letterSpacing: '-1px' }}>🧾 Create Invoice</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Generate a new invoice for hospital services and treatments.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'var(--glass-bg)', padding: '0.4rem 1rem', borderRadius: '50px', border: '1px solid var(--glass-border)', flexShrink: 0 }}>
            <span style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '0.9rem' }}>{userEmail}</span>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              {userEmail.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2rem', alignItems: 'start' }}>

          {/* ── LEFT ─────────────────────────────────────── */}
          <div>

            {/* Patient Info */}
            <div style={cardStyle}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.5rem' }}>👤 Patient Information</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.1rem' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Patient Name *</label>
                  <input style={errors.patientName ? errStyle : inputStyle} placeholder="e.g. Riya Sharma" value={form.patientName}
                    onChange={e => { setForm({ ...form, patientName: e.target.value }); setErrors({ ...errors, patientName: '' }); }} />
                  {errors.patientName && <p style={{ color: '#e74c3c', fontSize: '0.78rem', margin: '0.3rem 0 0 0' }}>{errors.patientName}</p>}
                </div>
                <div>
                  <label style={labelStyle}>Patient ID</label>
                  <input style={inputStyle} placeholder="e.g. PT-9042" value={form.patientId} onChange={e => setForm({ ...form, patientId: e.target.value })} />
                </div>
                <div>
                  <label style={labelStyle}>Phone</label>
                  <input style={inputStyle} placeholder="e.g. 9876543210" value={form.patientPhone} onChange={e => setForm({ ...form, patientPhone: e.target.value })} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Email</label>
                  <input style={inputStyle} type="email" placeholder="patient@email.com" value={form.patientEmail} onChange={e => setForm({ ...form, patientEmail: e.target.value })} />
                </div>
              </div>
            </div>

            {/* Doctor / Department */}
            <div style={cardStyle}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.5rem' }}>🏥 Service Details</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.1rem' }}>
                <div>
                  <label style={labelStyle}>Doctor Name *</label>
                  <input style={errors.doctorName ? errStyle : inputStyle} placeholder="e.g. Dr. Sarah Smith" value={form.doctorName}
                    onChange={e => { setForm({ ...form, doctorName: e.target.value }); setErrors({ ...errors, doctorName: '' }); }} />
                  {errors.doctorName && <p style={{ color: '#e74c3c', fontSize: '0.78rem', margin: '0.3rem 0 0 0' }}>{errors.doctorName}</p>}
                </div>
                <div>
                  <label style={labelStyle}>Department *</label>
                  <select style={errors.department ? { ...errStyle, cursor: 'pointer' } : { ...inputStyle, cursor: 'pointer' }}
                    value={form.department} onChange={e => { setForm({ ...form, department: e.target.value }); setErrors({ ...errors, department: '' }); }}>
                    <option value="">— Select —</option>
                    {departments.map(d => <option key={d}>{d}</option>)}
                  </select>
                  {errors.department && <p style={{ color: '#e74c3c', fontSize: '0.78rem', margin: '0.3rem 0 0 0' }}>{errors.department}</p>}
                </div>
                <div>
                  <label style={labelStyle}>Invoice Date</label>
                  <input style={inputStyle} type="date" value={form.invoiceDate} onChange={e => setForm({ ...form, invoiceDate: e.target.value })} />
                </div>
                <div>
                  <label style={labelStyle}>Due Date *</label>
                  <input style={errors.dueDate ? errStyle : inputStyle} type="date" value={form.dueDate}
                    onChange={e => { setForm({ ...form, dueDate: e.target.value }); setErrors({ ...errors, dueDate: '' }); }} />
                  {errors.dueDate && <p style={{ color: '#e74c3c', fontSize: '0.78rem', margin: '0.3rem 0 0 0' }}>{errors.dueDate}</p>}
                </div>
                <div>
                  <label style={labelStyle}>Payment Method</label>
                  <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.paymentMethod} onChange={e => setForm({ ...form, paymentMethod: e.target.value })}>
                    {['UPI', 'Cash', 'Card', 'Net Banking', 'Insurance', 'Cheque'].map(m => <option key={m}>{m}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>📋 Services / Items *</h2>
                <button onClick={addLine} style={{ padding: '0.45rem 1rem', borderRadius: '50px', background: 'rgba(0,200,83,0.15)', border: '1px solid rgba(0,200,83,0.3)', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  ➕ Add Line
                </button>
              </div>
              {errors.lineItems && <p style={{ color: '#e74c3c', fontSize: '0.82rem', marginBottom: '0.8rem' }}>{errors.lineItems}</p>}

              {/* Header row */}
              <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 0.8fr 1fr 0.5fr', gap: '0.6rem', marginBottom: '0.5rem' }}>
                {['Description', 'Qty', 'Unit Price (₹)', ''].map(h => (
                  <span key={h} style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</span>
                ))}
              </div>

              {lineItems.map((item, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '2.5fr 0.8fr 1fr 0.5fr', gap: '0.6rem', marginBottom: '0.6rem', alignItems: 'center' }}>
                  <div style={{ position: 'relative' }}>
                    <input list={`services-${i}`} style={inputStyle} placeholder="Service / item name" value={item.description}
                      onChange={e => { updateLine(i, 'description', e.target.value); setErrors({ ...errors, lineItems: '' }); }} />
                    <datalist id={`services-${i}`}>
                      {services.map(s => <option key={s} value={s} />)}
                    </datalist>
                  </div>
                  <input style={{ ...inputStyle, textAlign: 'center' }} type="number" min="1" value={item.quantity}
                    onChange={e => updateLine(i, 'quantity', Number(e.target.value))} />
                  <input style={inputStyle} type="number" min="0" placeholder="0.00" value={item.unitPrice || ''}
                    onChange={e => updateLine(i, 'unitPrice', Number(e.target.value))} />
                  <button onClick={() => removeLine(i)} disabled={lineItems.length === 1}
                    style={{ background: 'rgba(231,76,60,0.15)', border: '1px solid rgba(231,76,60,0.3)', color: '#e74c3c', borderRadius: '8px', cursor: lineItems.length === 1 ? 'not-allowed' : 'pointer', opacity: lineItems.length === 1 ? 0.4 : 1, padding: '0.5rem', fontWeight: 700, fontSize: '0.9rem' }}>
                    🗑
                  </button>
                </div>
              ))}
            </div>

            {/* Notes */}
            <div style={cardStyle}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.2rem' }}>📝 Notes</h2>
              <textarea rows={3} placeholder="Additional notes or instructions for the patient..." value={form.notes}
                onChange={e => setForm({ ...form, notes: e.target.value })}
                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
            </div>
          </div>

          {/* ── RIGHT ────────────────────────────────────── */}
          <div style={{ position: 'sticky', top: '2rem' }}>

            {/* Tax & Discount */}
            <div style={cardStyle}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.5rem' }}>⚙️ Tax &amp; Discount</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Discount (%)</label>
                  <input style={inputStyle} type="number" min="0" max="100" value={form.discount}
                    onChange={e => setForm({ ...form, discount: Math.min(100, Number(e.target.value)) })} />
                </div>
                <div>
                  <label style={labelStyle}>GST / Tax Rate (%)</label>
                  <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.taxRate}
                    onChange={e => setForm({ ...form, taxRate: Number(e.target.value) })}>
                    <option value={0}>0% (Exempt)</option>
                    <option value={5}>5%</option>
                    <option value={12}>12%</option>
                    <option value={18}>18% (Standard GST)</option>
                    <option value={28}>28%</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Invoice Summary */}
            <div style={{ ...cardStyle, background: 'linear-gradient(135deg, rgba(0,200,83,0.06), rgba(0,100,200,0.06))', border: '1px solid rgba(0,200,83,0.2)' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                🧮 Invoice Summary
              </h2>

              {/* Line item totals */}
              <div style={{ marginBottom: '1rem' }}>
                {lineItems.filter(i => i.description && i.quantity && i.unitPrice).map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{item.description} × {item.quantity}</span>
                    <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{fmt(item.quantity * item.unitPrice)}</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
                {[
                  { label: 'Subtotal', value: fmt(subtotal), color: 'var(--text-main)' },
                  form.discount > 0 && { label: `Discount (${form.discount}%)`, value: `−${fmt(discountAmount)}`, color: '#27ae60' },
                  form.taxRate > 0 && { label: `GST (${form.taxRate}%)`, value: `+${fmt(taxAmount)}`, color: '#e67e22' },
                ].filter(Boolean).map((row: unknown, i) => {
                  const r = row as { label: string; value: string; color: string };
                  return (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                      <span style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.9rem' }}>{r.label}</span>
                      <span style={{ color: r.color, fontWeight: 700, fontSize: '0.9rem' }}>{r.value}</span>
                    </div>
                  );
                })}
              </div>

              {/* Grand Total */}
              <div style={{ borderTop: '2px solid rgba(0,200,83,0.3)', marginTop: '0.8rem', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>Grand Total</span>
                <span style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--primary)' }}>{fmt(grandTotal)}</span>
              </div>
            </div>

            {/* Invoice Preview card */}
            <div style={{ ...cardStyle, fontSize: '0.85rem' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>👁️ Quick Preview</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  { l: '👤 Patient', v: form.patientName || '—' },
                  { l: '🩺 Doctor', v: form.doctorName || '—' },
                  { l: '🏥 Dept', v: form.department || '—' },
                  { l: '💳 Payment', v: form.paymentMethod },
                  { l: '📅 Due', v: form.dueDate ? new Date(form.dueDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—' },
                  { l: '📦 Items', v: `${lineItems.filter(i => i.description.trim()).length} line(s)` },
                ].map((r, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{r.l}</span>
                    <span style={{ color: 'var(--text-main)', fontWeight: 700, textAlign: 'right', maxWidth: '55%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <button onClick={handleSubmit} disabled={submitting}
                style={{ width: '100%', padding: '1rem', borderRadius: '14px', border: 'none', background: submitting ? 'rgba(0,200,83,0.5)' : 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white', fontWeight: 800, cursor: submitting ? 'not-allowed' : 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', boxShadow: '0 4px 20px rgba(0,200,83,0.3)', transition: 'all 0.2s' }}>
                {submitting ? '⏳ Generating Invoice...' : '✅ Generate Invoice'}
              </button>
              <Link href="/dashboard/billing" style={{ textDecoration: 'none' }}>
                <button style={{ width: '100%', padding: '0.9rem', borderRadius: '14px', border: '1.5px solid var(--glass-border)', background: 'transparent', color: 'var(--text-main)', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}>
                  Cancel
                </button>
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
