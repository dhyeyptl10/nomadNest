import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const MOUNTAIN_BG = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=85&fit=crop'
const BALI_THUMB = 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=120&q=80&fit=crop'

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
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
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
  const [tab, setTab] = useState('signin')
  const [showPass, setShowPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  })

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/dashboard')
    }, 1500)
  }

  const handleTabChange = (newTab) => {
    setTab(newTab)
    setForm({ email: '', password: '', name: '', confirmPassword: '' })
    setShowPass(false)
    setShowConfirmPass(false)
  }

  return (
    <div className={`flex flex-col md:flex-row min-h-screen w-full bg-cream overflow-hidden transition-opacity duration-700 ease-out ${mounted ? 'opacity-100' : 'opacity-0'}`}>

      {/* LEFT — Hero panel */}
      <div className="relative flex-none md:flex-[0_0_52%] flex flex-col justify-end overflow-hidden h-[44vh] md:h-auto min-h-[280px] md:min-h-0">
        <img
          src={MOUNTAIN_BG}
          alt="Mountain landscape"
          className={`absolute inset-0 w-full h-full object-cover transform transition-all duration-[6000ms] ease-out opacity-0 scale-105 ${imgLoaded ? 'opacity-100 !scale-100' : ''}`}
          onLoad={() => setImgLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1220]/60 via-[#0a1220]/15 to-[#0a1220]/70 pointer-events-none" />

        {/* Logo */}
        <div className="absolute top-[30px] left-[30px] flex items-center gap-[11px] z-10 opacity-0 animate-[fadeDown_0.65s_cubic-bezier(0.16,1,0.3,1)_0.1s_forwards]">
          <div className="w-[42px] h-[42px] rounded-[12px] bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="3 18 12 2 21 18"/>
              <path d="M9 18 12 12 15 18"/>
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-body text-[12.5px] font-bold text-white tracking-[2.5px]">WANDERLUST</span>
            <span className="font-body text-[9.5px] font-normal text-white/60 tracking-[3.5px] mt-[3px]">TRAVEL</span>
          </div>
        </div>

        {/* Hero copy */}
        <div className="relative z-10 px-[44px] pb-[30px] opacity-0 animate-[fadeUp_0.75s_cubic-bezier(0.16,1,0.3,1)_0.25s_forwards]">
          <h1 className="font-display text-[clamp(38px,4.8vw,60px)] font-extrabold text-white leading-[1.08] tracking-[-0.8px] mb-[16px]">
            Explore More
            <br />
            <span className="text-gold-light">Live More</span>
          </h1>
          <p className="text-[14.5px] text-white/80 leading-[1.65] max-w-[380px] mb-[26px] font-light tracking-[0.1px]">
            The world is waiting for you. Start your journey today and collect unforgettable moments.
          </p>
          <ul className="flex flex-col gap-[11px]">
            {['Curated destinations worldwide', 'AI-powered trip planning', 'Exclusive member deals'].map((f, i) => (
              <li key={f} className="flex items-center gap-[11px] text-[14px] text-white/90 font-normal opacity-0 animate-[fadeRight_0.55s_cubic-bezier(0.16,1,0.3,1)_forwards]" style={{ animationDelay: `${0.5 + i * 0.12}s` }}>
                <span className="w-[22px] h-[22px] rounded-full bg-gold flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(201,150,58,0.4)]">
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
        <div className="relative z-10 mx-[24px] mb-[24px] p-[14px_18px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-[18px] flex items-center gap-[15px] opacity-0 animate-[fadeUp_0.65s_cubic-bezier(0.16,1,0.3,1)_0.8s_forwards] transition-all duration-200 hover:bg-white/20 hover:-translate-y-[2px]">
          <img src={BALI_THUMB} alt="Bali" className="w-[48px] h-[48px] rounded-[12px] object-cover shrink-0 border-[1.5px] border-white/20" />
          <div className="flex-1">
            <p className="text-[13.5px] font-semibold text-white mb-[3px]">Next Trip: Bali, Indonesia</p>
            <p className="text-[12px] text-white/60 font-light">20 May — 02 June 2024 · 12 Days</p>
          </div>
          <div className="text-[12px] font-semibold text-gold-light bg-gold/20 border border-gold/30 rounded-full px-[14px] py-[6px] whitespace-nowrap tracking-[0.2px]">12 Days to go</div>
        </div>
      </div>

      {/* RIGHT — Auth panel */}
      <div className="flex-1 md:flex-[0_0_48%] flex items-center justify-center p-[24px_20px_36px] md:p-[36px_40px] bg-cream overflow-y-auto relative z-0">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(ellipse at 70% 20%, rgba(201,150,58,0.06) 0%, transparent 65%), radial-gradient(ellipse at 20% 80%, rgba(26,47,78,0.04) 0%, transparent 65%)' }} />

        <div className="relative w-full max-w-[430px] bg-white rounded-[28px] p-[28px_22px] md:p-[38px_40px] shadow-lg border border-black/5 opacity-0 translate-y-[28px] animate-[fadeUp_0.75s_cubic-bezier(0.16,1,0.3,1)_0.18s_forwards] z-10">
          
          {/* Tabs */}
          <div className="grid grid-cols-2 bg-cream rounded-[14px] p-[4px] mb-[30px] border border-border-light">
            {['signin', 'signup'].map(t => (
              <button
                key={t}
                className={`border-none bg-transparent py-[11px] px-[16px] rounded-[11px] text-[14px] font-medium font-body text-text-mid cursor-pointer transition-all duration-300 tracking-[0.1px] ${tab === t ? 'bg-white !text-text-dark shadow-sm !font-semibold' : ''}`}
                onClick={() => handleTabChange(t)}
                type="button"
              >
                {t === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          {/* Heading */}
          <div className="mb-[26px]">
            <h2 className="font-display text-[24px] font-bold text-text-dark mb-[7px] leading-[1.22] tracking-[-0.3px]">
              {tab === 'signin' ? 'Welcome back, Explorer!' : 'Start your adventure!'}
            </h2>
            <p className="text-[14px] text-text-mid leading-[1.55] font-normal">
              {tab === 'signin'
                ? 'Sign in to continue planning your adventures.'
                : 'Create an account to begin your journey.'}
            </p>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-[15px]" onSubmit={handleSubmit}>
            {tab === 'signup' && (
              <div className="flex flex-col gap-[7px]" key="name-field">
                <label className="text-[13px] font-medium text-text-dark tracking-[0.1px]">Full Name</label>
                <div className="relative flex items-center group">
                  <span className="absolute left-[14px] text-text-light flex pointer-events-none z-10"><UserIcon /></span>
                  <input
                    type="text"
                    className="w-full py-[13px] pr-[46px] pl-[44px] border-[1.5px] border-border rounded-[13px] text-[14px] font-body text-text-dark bg-white transition-all duration-200 outline-none tracking-[0.1px] placeholder:text-text-light placeholder:font-light hover:border-black/20 focus:border-gold focus:ring-[3.5px] focus:ring-gold/10"
                    placeholder="Ananya Sharma"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-[7px]">
              <label className="text-[13px] font-medium text-text-dark tracking-[0.1px]">Email Address</label>
              <div className="relative flex items-center">
                <span className="absolute left-[14px] text-text-light flex pointer-events-none z-10"><MailIcon /></span>
                <input
                  type="email"
                  className="w-full py-[13px] pr-[46px] pl-[44px] border-[1.5px] border-border rounded-[13px] text-[14px] font-body text-text-dark bg-white transition-all duration-200 outline-none tracking-[0.1px] placeholder:text-text-light placeholder:font-light hover:border-black/20 focus:border-gold focus:ring-[3.5px] focus:ring-gold/10"
                  placeholder="ananya@example.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-[7px]">
              <label className="text-[13px] font-medium text-text-dark tracking-[0.1px]">Password</label>
              <div className="relative flex items-center">
                <span className="absolute left-[14px] text-text-light flex pointer-events-none z-10"><LockIcon /></span>
                <input
                  type={showPass ? 'text' : 'password'}
                  className="w-full py-[13px] pr-[46px] pl-[44px] border-[1.5px] border-border rounded-[13px] text-[14px] font-body text-text-dark bg-white transition-all duration-200 outline-none tracking-[0.1px] placeholder:text-text-light placeholder:font-light hover:border-black/20 focus:border-gold focus:ring-[3.5px] focus:ring-gold/10"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="absolute right-[13px] border-none bg-transparent cursor-pointer text-text-light flex p-[5px] rounded-[7px] transition-colors duration-200 hover:text-text-mid hover:bg-cream"
                  onClick={() => setShowPass(v => !v)}
                  tabIndex={-1}
                >
                  <EyeIcon open={showPass} />
                </button>
              </div>
            </div>

            {tab === 'signup' && (
              <div className="flex flex-col gap-[7px]" key="confirm-field">
                <label className="text-[13px] font-medium text-text-dark tracking-[0.1px]">Confirm Password</label>
                <div className="relative flex items-center">
                  <span className="absolute left-[14px] text-text-light flex pointer-events-none z-10"><LockIcon /></span>
                  <input
                    type={showConfirmPass ? 'text' : 'password'}
                    className="w-full py-[13px] pr-[46px] pl-[44px] border-[1.5px] border-border rounded-[13px] text-[14px] font-body text-text-dark bg-white transition-all duration-200 outline-none tracking-[0.1px] placeholder:text-text-light placeholder:font-light hover:border-black/20 focus:border-gold focus:ring-[3.5px] focus:ring-gold/10"
                    placeholder="••••••••"
                    value={form.confirmPassword}
                    onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-[13px] border-none bg-transparent cursor-pointer text-text-light flex p-[5px] rounded-[7px] transition-colors duration-200 hover:text-text-mid hover:bg-cream"
                    onClick={() => setShowConfirmPass(v => !v)}
                    tabIndex={-1}
                  >
                    <EyeIcon open={showConfirmPass} />
                  </button>
                </div>
              </div>
            )}

            {tab === 'signin' && (
              <div className="flex justify-end -mt-[4px]">
                <button type="button" className="border-none bg-transparent text-[13px] text-text-mid cursor-pointer font-body p-0 transition-colors duration-200 font-medium hover:text-gold">Forgot password?</button>
              </div>
            )}

            <button type="submit" className={`relative overflow-hidden flex items-center justify-center gap-[9px] w-full p-[15px] bg-charcoal text-white border-none rounded-[14px] text-[15px] font-semibold font-body cursor-pointer tracking-[0.3px] transition-all duration-200 mt-[4px] min-h-[52px] group disabled:cursor-not-allowed disabled:opacity-85 ${loading ? 'pointer-events-none' : 'hover:bg-charcoal-mid hover:-translate-y-[1px] hover:shadow-[0_8px_28px_rgba(26,31,46,0.35)] active:translate-y-0 active:shadow-none'}`} disabled={loading}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
              {loading ? (
                <span className="w-[20px] h-[20px] border-[2.5px] border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {tab === 'signin' ? 'Sign In' : 'Create Account'}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-[14px] text-text-light text-[13px] font-normal before:content-[''] before:flex-1 before:h-[1px] before:bg-border after:content-[''] after:flex-1 after:h-[1px] after:bg-border">
              <span>or continue with</span>
            </div>

            {/* Social */}
            <div className="grid grid-cols-2 gap-[12px]">
              <button type="button" className="flex items-center justify-center gap-[9px] p-[12px_16px] bg-white border-[1.5px] border-border rounded-[13px] text-[14px] font-medium font-body text-text-dark cursor-pointer transition-all duration-200 tracking-[0.1px] hover:bg-cream hover:border-black/15 hover:-translate-y-[1px] hover:shadow-[0_4px_14px_rgba(0,0,0,0.07)] active:translate-y-0">
                <GoogleIcon />
                <span>Google</span>
              </button>
              <button type="button" className="flex items-center justify-center gap-[9px] p-[12px_16px] bg-white border-[1.5px] border-border rounded-[13px] text-[14px] font-medium font-body text-text-dark cursor-pointer transition-all duration-200 tracking-[0.1px] hover:bg-cream hover:border-black/15 hover:-translate-y-[1px] hover:shadow-[0_4px_14px_rgba(0,0,0,0.07)] active:translate-y-0">
                <AppleIcon />
                <span>Apple</span>
              </button>
            </div>
          </form>

          {/* Footer */}
          <p className="text-center mt-[22px] text-[14px] text-text-mid">
            {tab === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              className="border-none bg-transparent text-[14px] font-semibold font-body text-gold cursor-pointer underline underline-offset-2 decoration-gold/40 p-0 transition-colors duration-200 hover:text-[#a07828] hover:decoration-[#a07828]"
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
