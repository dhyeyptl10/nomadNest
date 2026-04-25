import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

/* ── Icons ────────────────────────────────────────────── */
const Ic = ({ d, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {(Array.isArray(d) ? d : [d]).map((p, i) => <path key={i} d={p} />)}
  </svg>
)
const Circle = ({ cx, cy, r }) => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx={cx} cy={cy} r={r} /><path d="M16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88z" />
  </svg>
)

function StarFill() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="#F59E0B" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
}
function HeartFilled({ on }) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill={on ? '#EF4444' : 'none'} stroke={on ? '#EF4444' : 'white'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
}

const NAV = [
  { id: 'dashboard',    label: 'Dashboard',    d: ['M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'M9 22V12h6v10'] },
  { id: 'destinations', label: 'Destinations', d: ['M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z', 'M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0'] },
  { id: 'trips',        label: 'Trips',        d: ['M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z', 'M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2'] },
  { id: 'bookings',     label: 'Bookings',     d: ['M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z', 'M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z'] },
  { id: 'experiences',  label: 'Experiences',  d: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
  { id: 'favorites',    label: 'Favorites',    d: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' },
  { id: 'messages',     label: 'Messages',     d: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' },
  { id: 'travel-style', label: 'Travel Style', d: ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'] },
  { id: 'settings',     label: 'Settings',     d: ['M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z'] },
]

const RECS = [
  { name: 'Maldives',    tag: 'Paradise on Earth', rating: 4.8, reviews: 320, img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80&fit=crop' },
  { name: 'Switzerland', tag: 'Alpine Wonderland',  rating: 4.9, reviews: 280, img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80&fit=crop' },
  { name: 'Greece',      tag: 'Timeless Beauty',    rating: 4.7, reviews: 210, img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80&fit=crop' },
  { name: 'Bali',        tag: 'Island of Gods',     rating: 4.8, reviews: 420, img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80&fit=crop' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [active, setActive] = useState('dashboard')
  const [mounted, setMounted] = useState(false)
  const [liked, setLiked] = useState({})
  const [notif, setNotif] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => { const t = setTimeout(() => setMounted(true), 40); return () => clearTimeout(t) }, [])

  return (
    <div className={`db ${mounted ? 'db--on' : ''}`}>

      {/* ═══ SIDEBAR ═══════════════════════════════════ */}
      <aside className="sb">

        <div className="sb-logo">
          <div className="sb-mark">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="3 18 12 2 21 18"/><path d="M9 18 12 12 15 18"/>
            </svg>
          </div>
          <div>
            <p className="sb-brand">WANDERLUST</p>
            <p className="sb-sub">TRAVEL</p>
          </div>
        </div>

        <nav className="sb-nav">
          {NAV.map(item => (
            <button
              key={item.id}
              className={`sb-item ${active === item.id ? 'sb-item--on' : ''}`}
              onClick={() => setActive(item.id)}
            >
              <Ic d={item.d} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Quote box */}
        <div className="sb-quote">
          <svg width="30" height="22" viewBox="0 0 30 22" fill="none">
            <path d="M0 22V13.2C0 5.87 4.2 1.47 12.6 0l1.4 2.2C9.8 3.13 7.53 5.27 6.8 8.6H12V22H0zm18 0V13.2C18 5.87 22.2 1.47 30.6 0L32 2.2C27.8 3.13 25.53 5.27 24.8 8.6H30V22H18z" fill="#D4C5A9" opacity=".5"/>
          </svg>
          <p className="sb-quote-txt">The world is meant to be explored, not explained.</p>
          <button className="sb-quote-send">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B8A88A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>

        {/* Referral */}
        <div className="sb-ref">
          <p className="sb-ref-title">Get Extra 10% Off</p>
          <p className="sb-ref-desc">Refer a friend and get exciting discounts.</p>
          <button className="sb-ref-btn">Refer Now</button>
        </div>

        {/* Logout */}
        <button className="sb-logout" onClick={() => navigate('/')}>
          <Ic d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9" size={16} />
          <span>Logout</span>
        </button>
      </aside>

      {/* ═══ MAIN ══════════════════════════════════════ */}
      <div className="main">

        {/* Top bar */}
        <header className="topbar">
          <div className="search-wrap">
            <svg className="search-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              className="search-inp"
              placeholder="Search destinations, experiences..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button className="search-plus">+</button>
          </div>

          <div className="topbar-r">
            <button className="bell-btn" onClick={() => setNotif(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              {notif && <span className="bell-dot" />}
            </button>
            <div className="user-chip">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80&fit=crop&crop=face" className="u-avatar" alt="User" />
              <div>
                <p className="u-hi">Hi, Ananya</p>
                <p className="u-role">Explorer <span>▾</span></p>
              </div>
            </div>
          </div>
        </header>

        {/* Scroll area */}
        <div className="scroll-area">

          {/* ── Hero ─────────────────────── */}
          <div className="hero">
            <img
              src="https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=1400&q=85&fit=crop"
              className="hero-bg"
              alt=""
            />
            <div className="hero-grad" />

            <div className="hero-txt">
              <h1 className="hero-h1">EXPLORE<br />MORE<br />LIVE MORE</h1>
              <p className="hero-p">The world is waiting for you</p>
            </div>

            {/* Spinning text badge */}
            <div className="collect-badge">
              <svg viewBox="0 0 110 110" width="90" height="90" className="collect-ring">
                <defs>
                  <path id="arc" d="M55,55 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1-70,0"/>
                </defs>
                <text fontSize="8.5" fill="rgba(255,255,255,0.8)" letterSpacing="2.4" fontFamily="'DM Sans',sans-serif" fontWeight="500">
                  <textPath href="#arc">COLLECT MOMENTS • COLLECT MOMENTS •</textPath>
                </text>
              </svg>
              <div className="collect-cam">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
              </div>
            </div>

            {/* Floating photos */}
            <div className="hero-pics">
              <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300&q=80&fit=crop" className="hero-pic hero-pic-a" alt="" />
              <img src="https://images.unsplash.com/photo-1568454537842-d933259bb258?w=300&q=80&fit=crop" className="hero-pic hero-pic-b" alt="" />
            </div>

            {/* Slider dots */}
            <div className="hero-dots">
              {[0,1,2].map(i => <span key={i} className={`hdot ${i===0?'hdot-on':''}`} />)}
            </div>
          </div>

          {/* ── Info row ─────────────────── */}
          <div className="info-row">
            <div className="info-card">
              <div className="info-ico">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <p className="info-lbl">Current Location</p>
                <p className="info-val">Bangalore, India</p>
              </div>
            </div>
            <div className="info-div" />
            <div className="info-card">
              <div className="info-dest-thumb">
                <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=80&q=80&fit=crop" alt="Bali" />
              </div>
              <div>
                <p className="info-lbl">Your Next Trip</p>
                <p className="info-val">Bali, Indonesia</p>
              </div>
            </div>
            <div className="info-div" />
            <div className="info-card">
              <div className="info-ico">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </div>
              <div>
                <p className="info-lbl">Upcoming Trip</p>
                <p className="info-val">12 Days to go</p>
              </div>
            </div>
          </div>

          {/* ── Recommended ──────────────── */}
          <section className="sec">
            <div className="sec-hd">
              <h2 className="sec-title">Recommended For You</h2>
              <button className="view-all">View All →</button>
            </div>
            <div className="rec-grid">
              {RECS.map((r, i) => (
                <div className="rec-card" key={r.name} style={{ animationDelay: `${i * 0.07}s` }}>
                  <div className="rec-img-wrap">
                    <img src={r.img} alt={r.name} className="rec-img" />
                    <button
                      className={`rec-heart ${liked[i] ? 'rec-heart--on' : ''}`}
                      onClick={() => setLiked(p => ({ ...p, [i]: !p[i] }))}
                    >
                      <HeartFilled on={liked[i]} />
                    </button>
                  </div>
                  <div className="rec-info">
                    <p className="rec-name">{r.name}</p>
                    <p className="rec-tag">{r.tag}</p>
                    <div className="rec-rating">
                      <StarFill />
                      <span className="rec-score">{r.rating}</span>
                      <span className="rec-rev">({r.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Plan Adventure ────────────── */}
          <section className="sec" style={{ marginBottom: 32 }}>
            <div className="sec-hd">
              <h2 className="sec-title">Plan Your Next Adventure</h2>
              <button className="view-all">View All →</button>
            </div>
            <div className="adv-grid">
              <div className="adv-photo">
                <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700&q=80&fit=crop" alt="Mountain" />
                <div className="adv-caption">
                  <p className="adv-cap-name">Mountain Escape</p>
                  <p className="adv-cap-loc">Himachal Pradesh</p>
                </div>
              </div>
              <div className="adv-cta">
                <span className="adv-plane">✈️</span>
                <h3 className="adv-cta-h">Plan your dream trip today!</h3>
                <p className="adv-cta-p">Tell us your preferences and we'll craft the perfect journey</p>
                <button className="adv-cta-btn">+ Start Planning</button>
              </div>
              <div className="adv-photo">
                <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=700&q=80&fit=crop" alt="Night sky" />
                <div className="adv-caption">
                  <p className="adv-cap-name">Night Sky Retreat</p>
                  <p className="adv-cap-loc">Ladakh, India</p>
                </div>
              </div>
            </div>
          </section>

        </div>{/* /scroll */}
      </div>{/* /main */}
    </div>
  )
}
