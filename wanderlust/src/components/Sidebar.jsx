import { useNavigate, useLocation } from 'react-router-dom'
import './Sidebar.css'

const NAV = [
  { id: 'dashboard',    label: 'Dashboard',    path: '/dashboard',    d: ['M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z','M9 22V12h6v10'] },
  { id: 'destinations', label: 'Destinations', path: '/destinations', d: ['M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z','M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0'] },
  { id: 'trips',        label: 'Trips',        path: '/trips',        d: ['M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z','M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2'] },
  { id: 'bookings',     label: 'Bookings',     path: '/bookings',     d: ['M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z','M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z'] },
  { id: 'experiences',  label: 'Experiences',  path: '/experiences',  d: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
  { id: 'favorites',    label: 'Favorites',    path: '/favorites',    d: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' },
  { id: 'messages',     label: 'Messages',     path: '#',             d: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' },
  { id: 'travel-style', label: 'Travel Style', path: '#',             d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
  { id: 'settings',     label: 'Settings',     path: '#',             d: ['M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z','M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z'] },
]

function NavIcon({ d }) {
  const paths = Array.isArray(d) ? d : [d]
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths.map((p, i) => <path key={i} d={p} />)}
    </svg>
  )
}

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleNav = (path) => {
    if (path !== '#') navigate(path)
  }

  return (
    <aside className="sb">
      {/* Logo */}
      <div className="sb-logo">
        <div className="sb-mark">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="3 18 12 2 21 18"/><path d="M9 18 12 12 15 18"/>
          </svg>
        </div>
        <div>
          <p className="sb-brand">NOMADNEST</p>
          <p className="sb-sub">TRAVEL</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="sb-nav">
        {NAV.map(item => {
          const isActive = location.pathname === item.path
          return (
            <button
              key={item.id}
              className={`sb-item ${isActive ? 'sb-item--on' : ''}`}
              onClick={() => handleNav(item.path)}
            >
              <NavIcon d={item.d} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Quote */}
      <div className="sb-quote">
        <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
          <path d="M0 20V12.4C0 5.47 3.87 1.4 11.6 0l1.4 2.2C9 3.07 6.87 5.07 6.2 8.4H11V20H0zm17 0V12.4C17 5.47 20.87 1.4 28.6 0L30 2.2C25.8 3.07 23.87 5.07 23.2 8.4H28V20H17z" fill="#D4C5A9" opacity=".45"/>
        </svg>
        <p className="sb-quote-txt">The world is meant to be explored, not explained.</p>
        <button className="sb-quote-send" title="Share">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B8A88A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>

      {/* Referral */}
      <div className="sb-ref">
        <p className="sb-ref-title">Get Extra 10% Off</p>
        <p className="sb-ref-desc">Refer a friend and get exciting discounts.</p>
        <button className="sb-ref-btn">Refer Now →</button>
      </div>

      {/* Logout */}
      <button className="sb-logout" onClick={() => navigate('/')}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
        <span>Logout</span>
      </button>
    </aside>
  )
}
