import type { Metadata } from 'next'
import Link from 'next/link'

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
          <Link href="/signup" className="btn btn-primary" id="btn-signup">Sign Up</Link>
          <Link href="/login" className="btn btn-secondary" id="btn-login">Log In</Link>
        </div>
      </div>
    </main>
  )
}
