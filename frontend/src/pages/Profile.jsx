import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import './Profile.css'

const STATS = [
  { label:'Countries',    value:'24',  icon:'🌍', color:'#6366F1' },
  { label:'Trips Done',   value:'18',  icon:'✈️', color:'#10B981' },
  { label:'Days Traveled',value:'312', icon:'📅', color:'#F59E0B' },
  { label:'Reviews',      value:'43',  icon:'⭐', color:'#EF4444' },
  { label:'Photos',       value:'890', icon:'📸', color:'#8B5CF6' },
  { label:'Wishlist',     value:'12',  icon:'❤️', color:'#EC4899' },
]

const BADGES = [
  { icon:'🌏', label:'World Explorer',   desc:'Visited 20+ countries',   earned:true  },
  { icon:'🏔️', label:'Summit Seeker',    desc:'5 mountain destinations', earned:true  },
  { icon:'🍜', label:'Foodie Traveler',  desc:'Tried 50+ local cuisines', earned:true  },
  { icon:'📸', label:'Photography Pro',  desc:'500+ travel photos',       earned:true  },
  { icon:'✍️', label:'Top Reviewer',     desc:'40+ helpful reviews',      earned:true  },
  { icon:'🚀', label:'Solo Adventurer',  desc:'10 solo trips completed',  earned:false },
  { icon:'🌙', label:'Night Owl',        desc:'5 overnight journeys',     earned:false },
  { icon:'💎', label:'Luxury Nomad',     desc:'3 5-star stays',           earned:false },
]

const TRIPS_DONE = [
  { dest:'Goa, India',       date:'Jan 2024',  days:7,  img:'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=200&q=80&fit=crop', rating:5 },
  { dest:'Maldives',         date:'Mar 2024',  days:7,  img:'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=200&q=80&fit=crop', rating:5 },
  { dest:'Rajasthan, India', date:'Oct 2023',  days:10, img:'https://images.unsplash.com/photo-1477587458883-47145ed31805?w=200&q=80&fit=crop', rating:4 },
  { dest:'Dubai, UAE',       date:'Dec 2022',  days:5,  img:'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=200&q=80&fit=crop', rating:5 },
]

const REVIEWS = [
  { dest:'Maldives', rating:5, text:'Absolutely breathtaking! The overwater villa was pure magic. Every sunset was better than the last. 100% coming back!', date:'Mar 2024', helpful:34 },
  { dest:'Goa, India', rating:4, text:'Perfect beach vibes. The food scene is incredible — don\'t miss the seafood at local shacks. A bit crowded in January but still amazing!', date:'Jan 2024', helpful:21 },
]

const MAP_COUNTRIES = [
  'India','Indonesia','Greece','UAE','France','Italy','Thailand','Singapore','Sri Lanka',
  'Nepal','Bhutan','Malaysia','Turkey','Maldives','Japan','UK','Germany','Spain',
  'Portugal','Switzerland','USA','Canada','Australia','New Zealand'
]

function StarRow({ count }) {
  return (
    <div style={{ display:'flex', gap:2 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={i<=count?'#F59E0B':'none'} stroke="#F59E0B" strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  )
}

export default function Profile() {
  const [mounted, setMounted] = useState(false)
  const [tab, setTab] = useState('overview')
  const [editing, setEditing] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => { const t = setTimeout(() => setMounted(true), 40); return () => clearTimeout(t) }, [])

  const copyLink = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`page-shell ${mounted ? 'mounted' : ''}`}>
      <Sidebar />
      <div className="page-body">
        <Topbar title="My Profile" subtitle="Your travel identity and journey so far" />
        <div className="page-scroll">

          {/* Profile hero */}
          <div className="profile-hero">
            <div className="profile-hero-bg">
              <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=85&fit=crop" alt="Cover" className="profile-cover-img" />
              <div className="profile-cover-overlay" />
            </div>
            <div className="profile-hero-content">
              <div className="profile-avatar-wrap">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&q=80&fit=crop&crop=face" className="profile-avatar" alt="Ananya" />
                <div className="profile-avatar-badge">🌍</div>
              </div>
              <div className="profile-hero-info">
                <div className="profile-name-row">
                  <h1 className="profile-name">Ananya Sharma</h1>
                  <span className="profile-verified">✓ Verified</span>
                </div>
                <p className="profile-tagline">✈️ Explorer · 📍 Bangalore, India · 🗓️ Member since 2022</p>
                <p className="profile-bio">Adventure seeker obsessed with sunsets, street food, and stories from the road. 24 countries down, the whole world to go! 🌏</p>
                <div className="profile-tags">
                  {['🏖️ Beach','🏔️ Mountains','🍜 Foodie','📸 Photography','🧘 Wellness'].map(t => (
                    <span key={t} className="profile-tag">{t}</span>
                  ))}
                </div>
              </div>
              <div className="profile-hero-actions">
                <button className="btn btn-primary" onClick={() => setEditing(p=>!p)}>
                  {editing ? '✓ Save Profile' : '✏️ Edit Profile'}
                </button>
                <button className="btn btn-outline" onClick={copyLink}>
                  {copied ? '✓ Copied!' : '🔗 Share Profile'}
                </button>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="profile-stats">
            {STATS.map((s, i) => (
              <div className="profile-stat-card" key={s.label} style={{ animationDelay:`${i*0.06}s` }}>
                <span className="profile-stat-icon" style={{ background:`${s.color}15`, color:s.color }}>{s.icon}</span>
                <p className="profile-stat-val">{s.value}</p>
                <p className="profile-stat-lbl">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="profile-tabs">
            {[
              { id:'overview',  label:'Overview'   },
              { id:'trips',     label:'Trips'      },
              { id:'reviews',   label:'Reviews'    },
              { id:'badges',    label:'Badges'     },
              { id:'map',       label:'Travel Map' },
            ].map(t => (
              <button key={t.id} className={`profile-tab ${tab===t.id?'profile-tab--active':''}`} onClick={() => setTab(t.id)}>
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="profile-tab-content" key={tab}>

            {tab === 'overview' && (
              <div className="profile-overview">
                {/* About */}
                <div className="card profile-card">
                  <h2 className="sec-title" style={{ marginBottom:14 }}>About Me</h2>
                  {editing ? (
                    <textarea className="form-input" defaultValue="Adventure seeker obsessed with sunsets, street food, and stories from the road. 24 countries down, the whole world to go! 🌏" rows={4} style={{ resize:'vertical' }} />
                  ) : (
                    <p style={{ fontSize:14, color:'var(--text-2)', lineHeight:1.7 }}>Adventure seeker obsessed with sunsets, street food, and stories from the road. 24 countries down, the whole world to go! 🌏</p>
                  )}
                  <div className="profile-detail-grid" style={{ marginTop:16 }}>
                    {[
                      { icon:'📍', label:'Based in', val:'Bangalore, India' },
                      { icon:'🗣️', label:'Languages', val:'English, Hindi, Kannada' },
                      { icon:'🌏', label:'Travel Style', val:'Beach Wanderer' },
                      { icon:'✈️', label:'Next Trip',   val:'Bali — May 20, 2024' },
                    ].map(d => (
                      <div key={d.label} className="profile-detail-item">
                        <span className="profile-detail-icon">{d.icon}</span>
                        <div>
                          <p className="profile-detail-lbl">{d.label}</p>
                          <p className="profile-detail-val">{d.val}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent trips preview */}
                <div className="card profile-card">
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
                    <h2 className="sec-title">Recent Trips</h2>
                    <button className="btn btn-ghost" style={{ fontSize:12.5 }} onClick={() => setTab('trips')}>View All →</button>
                  </div>
                  <div className="profile-trips-preview">
                    {TRIPS_DONE.slice(0,2).map(t => (
                      <div key={t.dest} className="profile-trip-item">
                        <img src={t.img} alt={t.dest} className="profile-trip-img" />
                        <div>
                          <p className="profile-trip-dest">{t.dest}</p>
                          <p className="profile-trip-meta">{t.date} · {t.days} days</p>
                          <StarRow count={t.rating} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top badges preview */}
                <div className="card profile-card">
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
                    <h2 className="sec-title">Badges Earned</h2>
                    <button className="btn btn-ghost" style={{ fontSize:12.5 }} onClick={() => setTab('badges')}>View All →</button>
                  </div>
                  <div className="profile-badges-preview">
                    {BADGES.filter(b=>b.earned).slice(0,5).map(b => (
                      <div key={b.label} className="profile-badge-mini" title={b.label}>
                        <span>{b.icon}</span>
                      </div>
                    ))}
                    <div className="profile-badge-mini profile-badge-more" onClick={() => setTab('badges')}>+{BADGES.filter(b=>!b.earned).length}</div>
                  </div>
                </div>
              </div>
            )}

            {tab === 'trips' && (
              <div className="profile-trips-grid">
                {TRIPS_DONE.map((t, i) => (
                  <div key={t.dest} className="card profile-trip-card" style={{ animationDelay:`${i*0.07}s` }}>
                    <img src={t.img} alt={t.dest} className="profile-trip-card-img" />
                    <div className="profile-trip-card-info">
                      <p className="profile-trip-dest">{t.dest}</p>
                      <p className="profile-trip-meta">{t.date} · {t.days} days</p>
                      <StarRow count={t.rating} />
                      <button className="btn btn-outline" style={{ marginTop:10, fontSize:12, padding:'6px 14px' }}>View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'reviews' && (
              <div className="profile-reviews">
                {REVIEWS.map((r, i) => (
                  <div key={r.dest} className="card profile-review-card" style={{ animationDelay:`${i*0.07}s` }}>
                    <div className="profile-review-header">
                      <div>
                        <p className="profile-review-dest">{r.dest}</p>
                        <p className="profile-review-date">{r.date}</p>
                      </div>
                      <StarRow count={r.rating} />
                    </div>
                    <p className="profile-review-text">"{r.text}"</p>
                    <div className="profile-review-footer">
                      <span style={{ fontSize:12, color:'var(--text-3)' }}>👍 {r.helpful} people found this helpful</span>
                      <button className="btn btn-ghost" style={{ fontSize:12 }}>Edit</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'badges' && (
              <div className="profile-badges-grid">
                {BADGES.map((b, i) => (
                  <div key={b.label} className={`card profile-badge-card ${!b.earned ? 'profile-badge-card--locked' : ''}`} style={{ animationDelay:`${i*0.06}s` }}>
                    <span className="profile-badge-icon">{b.earned ? b.icon : '🔒'}</span>
                    <p className="profile-badge-label">{b.label}</p>
                    <p className="profile-badge-desc">{b.desc}</p>
                    {b.earned
                      ? <span className="badge" style={{ background:'var(--green-bg)', color:'var(--green)', marginTop:6 }}>✓ Earned</span>
                      : <span className="badge" style={{ background:'var(--surface-2)', color:'var(--text-3)', marginTop:6 }}>Locked</span>
                    }
                  </div>
                ))}
              </div>
            )}

            {tab === 'map' && (
              <div className="card" style={{ padding:28, animation:'slideUp 0.4s var(--ease) both' }}>
                <h2 className="sec-title" style={{ marginBottom:6 }}>Countries Visited — 24 / 195</h2>
                <p className="sec-sub" style={{ marginBottom:20 }}>You've explored {((24/195)*100).toFixed(1)}% of the world! Keep going 🌍</p>
                <div className="profile-map-progress">
                  <div className="profile-map-bar">
                    <div className="profile-map-fill" style={{ width:'12.3%' }} />
                  </div>
                  <span style={{ fontSize:13, fontWeight:700, color:'var(--gold)' }}>12.3%</span>
                </div>
                <div className="profile-countries-grid" style={{ marginTop:20 }}>
                  {MAP_COUNTRIES.map((c, i) => (
                    <div key={c} className="profile-country-chip" style={{ animationDelay:`${i*0.03}s` }}>
                      <span style={{ color:'var(--green)' }}>✓</span> {c}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}
