import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './LoginPage.css'

const MOUNTAIN_BG = 'https://picsum.photos/seed/mountain/1200/800'
const BALI_THUMB  = 'https://picsum.photos/seed/bali/300/300'

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  )
}

function EyeIcon({ open }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  )
}

function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  )
}

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, register, currentUser } = useAuth()

  const [tab,             setTab]             = useState('signin')
  const [showPass,        setShowPass]        = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)
  const [mounted,         setMounted]         = useState(false)
  const [loading,         setLoading]         = useState(false)
  const [imgLoaded,       setImgLoaded]       = useState(false)
  const [error,           setError]           = useState('')

  const [form, setForm] = useState({ email: '', password: '', name: '', confirmPassword: '' })

  /* Redirect if already logged in */
  useEffect(() => {
    if (currentUser) navigate('/dashboard', { replace: true })
  }, [currentUser, navigate])

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Artificial small delay for UX
    await new Promise(r => setTimeout(r, 600))

    if (tab === 'signin') {
      const result = login(form.email, form.password)
      if (!result.success) {
        setError(result.error)
        setLoading(false)
        return
      }
    } else {
      if (form.password !== form.confirmPassword) {
        setError('Passwords do not match.')
        setLoading(false)
        return
      }
      if (!form.name.trim()) {
        setError('Please enter your full name.')
        setLoading(false)
        return
      }
      const result = register(form.name, form.email, form.password)
      if (!result.success) {
        setError(result.error)
        setLoading(false)
        return
      }
    }

    setLoading(false)
    navigate('/dashboard')
  }

  const handleTabChange = (newTab) => {
    setTab(newTab)
    setError('')
    setForm({ email: '', password: '', name: '', confirmPassword: '' })
    setShowPass(false)
    setShowConfirmPass(false)
  }

  return (
    <div className={`login-root ${mounted ? 'mounted' : ''}`}>

      {/* LEFT — Hero panel */}
      <div className="hero-panel">
        <img
          src={MOUNTAIN_BG}
          alt="Mountain landscape"
          className={`hero-bg ${imgLoaded ? 'loaded' : ''}`}
          onLoad={() => setImgLoaded(true)}
        />
        <div className="hero-overlay" />

        {/* Logo */}
        <div className="logo" style={{ animationDelay: '0.1s' }}>
          <div className="logo-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="3 18 12 2 21 18"/><path d="M9 18 12 12 15 18"/>
            </svg>
          </div>
          <div className="logo-text">
            <span className="logo-name">WANDERLUST</span>
            <span className="logo-sub">TRAVEL</span>
          </div>
        </div>

        {/* Hero copy */}
        <div className="hero-content">
          <h1 className="hero-title" style={{ animationDelay: '0.2s' }}>
            Explore More<br />
            <span className="hero-title-gold">Live More</span>
          </h1>
          <p className="hero-desc" style={{ animationDelay: '0.35s' }}>
            The world is waiting for you. Start your journey today and collect unforgettable moments.
          </p>
          <ul className="hero-features" style={{ animationDelay: '0.5s' }}>
            {['Curated destinations worldwide', 'AI-powered trip planning', 'Exclusive member deals'].map((f, i) => (
              <li key={f} style={{ animationDelay: `${0.5 + i * 0.12}s` }}>
                <span className="check-icon">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Trip card */}
        <div className="trip-card" style={{ animationDelay: '0.75s' }}>
          <img src={BALI_THUMB} alt="Bali" className="trip-thumb" />
          <div className="trip-info">
            <p className="trip-name">Next Trip: Bali, Indonesia</p>
            <p className="trip-dates">20 May — 02 June 2024 · 12 Days</p>
          </div>
          <div className="trip-badge">12 Days to go</div>
        </div>
      </div>

      {/* RIGHT — Auth panel */}
      <div className="auth-panel">
        <div className="auth-card" style={{ animationDelay: '0.15s' }}>

          {/* Tabs */}
          <div className="tabs">
            {['signin', 'signup'].map(t => (
              <button
                key={t}
                className={`tab-btn ${tab === t ? 'active' : ''}`}
                onClick={() => handleTabChange(t)}
                type="button"
              >
                {t === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          {/* Heading */}
          <div className={`auth-heading ${tab}`}>
            <h2 className="auth-title">
              {tab === 'signin' ? 'Welcome back, Explorer!' : 'Start your adventure!'}
            </h2>
            <p className="auth-subtitle">
              {tab === 'signin'
                ? 'Sign in to continue planning your adventures.'
                : 'Create an account to begin your journey.'}
            </p>
          </div>

          {/* Demo hint for sign-in */}
          {tab === 'signin' && (
            <div className="demo-hint">
              <span>🎯 Demo: </span>
              <button type="button" onClick={() => setForm({ ...form, email:'ananya@example.com', password:'password123' })}>
                Use demo account
              </button>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="auth-error">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          {/* Form */}
          <form className="auth-form" onSubmit={handleSubmit}>
            {tab === 'signup' && (
              <div className="field" key="name-field">
                <label className="field-label">Full Name</label>
                <div className="field-wrap">
                  <span className="field-icon"><UserIcon /></span>
                  <input
                    type="text"
                    className="field-input"
                    placeholder="Ananya Sharma"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
              </div>
            )}

            <div className="field">
              <label className="field-label">Email Address</label>
              <div className="field-wrap">
                <span className="field-icon"><MailIcon /></span>
                <input
                  type="email"
                  className="field-input"
                  placeholder="ananya@example.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="field-label">Password</label>
              <div className="field-wrap">
                <span className="field-icon"><LockIcon /></span>
                <input
                  type={showPass ? 'text' : 'password'}
                  className="field-input"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  required
                />
                <button type="button" className="eye-btn" onClick={() => setShowPass(v => !v)} tabIndex={-1}>
                  <EyeIcon open={showPass} />
                </button>
              </div>
            </div>

            {tab === 'signup' && (
              <div className="field" key="confirm-field">
                <label className="field-label">Confirm Password</label>
                <div className="field-wrap">
                  <span className="field-icon"><LockIcon /></span>
                  <input
                    type={showConfirmPass ? 'text' : 'password'}
                    className="field-input"
                    placeholder="••••••••"
                    value={form.confirmPassword}
                    onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                    required
                  />
                  <button type="button" className="eye-btn" onClick={() => setShowConfirmPass(v => !v)} tabIndex={-1}>
                    <EyeIcon open={showConfirmPass} />
                  </button>
                </div>
              </div>
            )}

            {tab === 'signin' && (
              <div className="forgot-row">
                <button type="button" className="forgot-btn">Forgot password?</button>
              </div>
            )}

            <button type="submit" className={`submit-btn ${loading ? 'loading' : ''}`} disabled={loading}>
              {loading ? (
                <span className="spinner" />
              ) : (
                <>
                  {tab === 'signin' ? 'Sign In' : 'Create Account'}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </>
              )}
            </button>

            {/* Divider */}
            <div className="or-divider"><span>or continue with</span></div>

            {/* Social */}
            <div className="social-row">
              <button type="button" className="social-btn"><GoogleIcon /><span>Google</span></button>
              <button type="button" className="social-btn"><AppleIcon /><span>Apple</span></button>
            </div>
          </form>

          {/* Footer */}
          <p className="auth-footer">
            {tab === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              className="footer-link"
              onClick={() => handleTabChange(tab === 'signin' ? 'signup' : 'signin')}
            >
              {tab === 'signin' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
