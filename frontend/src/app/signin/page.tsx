import Link from 'next/link';

export default function SignIn() {
  return (
    <main>
      <div className="hero-container auth-container">
        <h1>Welcome Back</h1>
        <p className="subtitle">Sign in to access your dashboard</p>
        <form className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" required placeholder="admin@hospital.com" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required placeholder="••••••••" />
          </div>
          <button type="submit" className="btn btn-primary w-full">Sign In</button>
        </form>
        <p className="auth-footer">
          Don't have an account? <Link href="/signup" className="text-primary">Sign Up</Link>
        </p>
      </div>
    </main>
  );
}
