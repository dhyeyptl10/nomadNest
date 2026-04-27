import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

const TRIPS = [
  {
    id: 1,
    dest: 'Bali, Indonesia',
    dates: '20 May — 02 Jun 2024',
    days: 12,
    status: 'upcoming',
    daysLeft: 12,
    img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80&fit=crop',
    color: '#4DB6A9',
  },
  {
    id: 2,
    dest: 'Santorini, Greece',
    dates: '15 Jul — 25 Jul 2024',
    days: 10,
    status: 'planning',
    daysLeft: 57,
    img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80&fit=crop',
    color: '#7B8FD4',
  },
  {
    id: 3,
    dest: 'Kyoto, Japan',
    dates: '03 Sep — 12 Sep 2024',
    days: 9,
    status: 'planning',
    daysLeft: 107,
    img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80&fit=crop',
    color: '#E07B7B',
  },
  {
    id: 4,
    dest: 'Patagonia, Argentina',
    dates: 'Nov 2024',
    days: 14,
    status: 'wishlist',
    daysLeft: null,
    img: 'https://images.unsplash.com/photo-1531761535209-180857e963b9?w=600&q=80&fit=crop',
    color: '#82C485',
  },
]

/* Stat cards — image URLs from Unsplash replacing emoji */
const STATS = [
  {
    label: 'Countries Visited',
    value: '24',
    img: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=120&q=80&fit=crop',
    svgIcon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    change: '+3 this year',
    changeType: 'up',
  },
  {
    label: 'Trips Completed',
    value: '18',
    img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=120&q=80&fit=crop',
    svgIcon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/>
        <rect x="9" y="11" width="14" height="10" rx="2"/>
      </svg>
    ),
    change: '+5 this year',
    changeType: 'up',
  },
  {
    label: 'Days Traveled',
    value: '312',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=120&q=80&fit=crop',
    svgIcon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    change: '28 days left',
    changeType: 'neutral',
  },
  {
    label: 'Miles Covered',
    value: '84k',
    img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=120&q=80&fit=crop',
    svgIcon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 11 22 2 13 21 11 13 3 11"/>
      </svg>
    ),
    change: '+12k this year',
    changeType: 'up',
  },
]

const EXPLORE = [
  { name: 'Amalfi Coast', country: 'Italy', img: 'https://images.unsplash.com/photo-1568454537842-d933259bb258?w=500&q=80&fit=crop', tag: 'Trending' },
  { name: 'Machu Picchu', country: 'Peru', img: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=500&q=80&fit=crop', tag: 'Bucket list' },
  { name: 'Maldives', country: 'South Asia', img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=500&q=80&fit=crop', tag: 'Popular' },
]

/* Status badge labels — text only, no emoji */
function statusLabel(status) {
  if (status === 'upcoming') return 'Upcoming'
  if (status === 'planning') return 'Planning'
  return 'Wishlist'
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [mounted, setMounted] = useState(false)
  const [activeNav, setActiveNav] = useState('home')

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={`dash-root ${mounted ? 'mounted' : ''}`}>

      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="3 18 12 2 21 18"/>
              <path d="M9 18 12 12 15 18"/>
            </svg>
          </div>
          <span className="sidebar-logo-name">Wanderlust</span>
        </div>

        <nav className="sidebar-nav">
          {[
            { id: 'home',     label: 'Overview',  icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
            { id: 'trips',    label: 'My Trips',  icon: 'M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3m4 13H9a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2z' },
            { id: 'explore',  label: 'Explore',   icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z' },
            { id: 'saved',    label: 'Saved',     icon: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' },
            { id: 'settings', label: 'Settings',  icon: 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' },
          ].map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeNav === item.id ? 'active' : ''}`}
              onClick={() => setActiveNav(item.id)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                {item.icon.split(' M').map((d, i) => (
                  <path key={i} d={i === 0 ? d : 'M' + d}/>
                ))}
              </svg>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-avatar">A</div>
          <div className="sidebar-user">
            <p className="sidebar-user-name">Ananya Sharma</p>
            <p className="sidebar-user-email">ananya@example.com</p>
          </div>
          <button className="logout-btn" onClick={() => navigate('/')} title="Sign out">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="dash-main">

        {/* Header */}
        <header className="dash-header">
          <div>
            <h1 className="dash-greeting">
              Good morning, Ananya!{' '}
              <span className="dash-greeting-wave">
                <img
                  src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&q=80&fit=crop&crop=face"
                  alt="User avatar"
                />
              </span>
            </h1>
            <p className="dash-sub">Ready for your next adventure?</p>
          </div>
          <button className="new-trip-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Plan New Trip
          </button>
        </header>

        <div className="dash-content">

          {/* Stats */}
          <div className="stats-grid">
            {STATS.map((s, i) => (
              <div className="stat-card" key={s.label} style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="stat-icon-wrap">
                  <img src={s.img} alt={s.label} />
                  <div className="stat-icon-overlay">{s.svgIcon}</div>
                </div>
                <p className="stat-value">{s.value}</p>
                <p className="stat-label">{s.label}</p>
                <p className={`stat-change ${s.changeType}`}>{s.change}</p>
              </div>
            ))}
          </div>

          {/* Two columns */}
          <div className="dash-columns">

            {/* My Trips */}
            <section className="trips-section">
              <div className="section-header">
                <h2 className="section-title">My Trips</h2>
                <button className="see-all">See all</button>
              </div>
              <div className="trips-list">
                {TRIPS.map((trip, i) => (
                  <div className="trip-row" key={trip.id} style={{ animationDelay: `${0.12 + i * 0.09}s` }}>
                    <img src={trip.img} alt={trip.dest} className="trip-row-img" />
                    <div className="trip-row-info">
                      <p className="trip-row-dest">{trip.dest}</p>
                      <p className="trip-row-dates">{trip.dates} · {trip.days} days</p>
                    </div>
                    <div className="trip-row-right">
                      <span className={`trip-status-badge ${trip.status}`}>
                        {statusLabel(trip.status)}
                      </span>
                      {trip.daysLeft && (
                        <p className="trip-days-left">{trip.daysLeft}d away</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Explore */}
            <section className="explore-section">
              <div className="section-header">
                <h2 className="section-title">Explore</h2>
                <button className="see-all">Discover more</button>
              </div>
              <div className="explore-cards">
                {EXPLORE.map((place, i) => (
                  <div className="explore-card" key={place.name} style={{ animationDelay: `${0.18 + i * 0.1}s` }}>
                    <img src={place.img} alt={place.name} className="explore-img" />
                    <div className="explore-overlay">
                      <span className="explore-tag">{place.tag}</span>
                      <div>
                        <p className="explore-name">{place.name}</p>
                        <p className="explore-country">{place.country}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  )
}
