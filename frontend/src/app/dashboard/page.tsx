export default function Dashboard() {
  return (
    <main>
      <div className="hero-container" style={{ maxWidth: '1000px', width: '90%' }}>
        <h1>CareSync Dashboard</h1>
        <p className="subtitle">Welcome back! Here is your hospital overview.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.5)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-main)' }}>Total Patients</h3>
            <p style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary)' }}>1,248</p>
          </div>
          <div style={{ background: 'rgba(255, 255, 255, 0.5)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-main)' }}>Today's Appointments</h3>
            <p style={{ fontSize: '3rem', fontWeight: 'bold', color: '#3498db' }}>42</p>
          </div>
          <div style={{ background: 'rgba(255, 255, 255, 0.5)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-main)' }}>Active Doctors</h3>
            <p style={{ fontSize: '3rem', fontWeight: 'bold', color: '#9b59b6' }}>18</p>
          </div>
        </div>
      </div>
    </main>
  );
}
