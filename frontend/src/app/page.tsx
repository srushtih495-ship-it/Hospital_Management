import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hospital Management System',
  description: 'Next-generation hospital administration platform',
}

export default function Home() {
  return (
    <main>
      <div className="hero-container">
        <h1>CareSync Platform</h1>
        <p className="subtitle">
          Streamlined hospital administration. Manage patient records, 
          doctor schedules, and billing all in one unified, secure platform.
        </p>
        <div className="action-buttons">
          <button className="btn-primary" id="btn-signup">Sign Up</button>
          <button className="btn-secondary" id="btn-signin">Sign In</button>
        </div>
      </div>
    </main>
  )
}
