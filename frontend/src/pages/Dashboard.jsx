import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import {
  HERO_IMG, HERO_SMALL_A, HERO_SMALL_B,
  REC_IMGS, ADV_MOUNTAIN, ADV_NIGHT_SKY,
  NEXT_TRIP_THUMB, DEST_IMGS, TRIP_IMGS
} from '../data/images'
import './Dashboard.css'

const RECS = [
  { name: 'Maldives',    tag: 'Paradise on Earth', rating: 4.8, reviews: 320, img: REC_IMGS.maldives },
  { name: 'Switzerland', tag: 'Alpine Wonderland',  rating: 4.9, reviews: 280, img: REC_IMGS.switzerland },
  { name: 'Greece',      tag: 'Timeless Beauty',    rating: 4.7, reviews: 210, img: REC_IMGS.greece },
  { name: 'Bali',        tag: 'Island of Gods',     rating: 4.8, reviews: 420, img: REC_IMGS.bali },
]

const UPCOMING_TRIPS = [
  {
    dest: 'Bali, Indonesia', dates: '20 May — 02 Jun 2024',
    days: 12, people: 2, progress: 60,
    img: TRIP_IMGS.bali,
  },
  {
    dest: 'Switzerland', dates: '05 Jul — 15 Jul 2024',
    days: 10, people: 2, progress: 30,
    img: TRIP_IMGS.switzerland,
  },
  {
    dest: 'Thailand', dates: '18 Aug — 25 Aug 2024',
    days: 7, people: 2, progress: 10,
    img: TRIP_IMGS.thailand,
  },
]

const BLOG = [
  {
    title: 'A Complete Guide to Cappadocia',
    desc: 'Discover the magical land of hot air balloons.',
    date: 'April 20, 2024',
    img: 'https://picsum.photos/seed/cappadocia/240/160',
  },
  {
    title: '10 Most Beautiful Coastal Towns',
    desc: 'Stunning views and relaxing vibes.',
    date: 'May 12, 2024',
    img: 'https://picsum.photos/seed/coast/240/160',
  },
  {
    title: 'Top 7 Hidden Gems in Asia',
    desc: 'Offbeat places you must explore.',
    date: 'April 18, 2024',
    img: 'https://picsum.photos/seed/asia/240/160',
  },
]

function StarFill() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="#F59E0B" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
}
function HeartFilled({ on }) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill={on ? '#EF4444' : 'none'} stroke={on ? '#EF4444' : 'white'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
}

export default function Dashboard() {
  const [mounted, setMounted] = useState(false)
  const [liked, setLiked] = useState({})
  const [notif, setNotif] = useState(true)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => { const t = setTimeout(() => setMounted(true), 40); return () => clearTimeout(t) }, [])

  return (
    <div className={`db ${mounted ? 'db--on' : ''}`}>
      <Sidebar />

      <div className="main">
        {/* ── Top bar ── */}
        <header className="topbar">
          <div className="search-wrap">
            <svg className="search-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input className="search-inp" placeholder="Search destinations, experiences..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="topbar-r">
            <button className="bell-btn" onClick={() => setNotif(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              {notif && <span className="bell-dot" />}
            </button>
            <div className="user-chip">
              <img src="https://picsum.photos/seed/portrait/80/80" className="u-avatar" alt="User" />
              <div><p className="u-hi">Hi, Ananya</p><p className="u-role">Explorer <span>▾</span></p></div>
            </div>
          </div>
        </header>

        <div className="scroll-area">

          {/* ── HERO ── */}
          <div className="hero">
            <img src={HERO_IMG} className="hero-bg" alt="" />
            <div className="hero-grad" />
            <div className="hero-txt">
              <h1 className="hero-h1">EXPLORE<br />MORE<br />LIVE MORE</h1>
              <p className="hero-p">The world is waiting for you</p>
            </div>
            {/* Rotating collect badge */}
            <div className="collect-badge">
              <svg viewBox="0 0 110 110" width="90" height="90" className="collect-ring">
                <defs><path id="arc" d="M55,55 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1-70,0"/></defs>
                <text fontSize="8.5" fill="rgba(255,255,255,0.8)" letterSpacing="2.4" fontFamily="'DM Sans',sans-serif" fontWeight="500">
                  <textPath href="#arc">COLLECT MOMENTS • COLLECT MOMENTS •</textPath>
                </text>
              </svg>
              <div className="collect-cam">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
                </svg>
              </div>
            </div>
            {/* Floating polaroid-style photo stack */}
            <div className="hero-pics">
              <div className="hero-pic-wrap hero-pic-a">
                <img src={HERO_SMALL_A} alt="" />
              </div>
              <div className="hero-pic-wrap hero-pic-b">
                <img src={HERO_SMALL_B} alt="" />
              </div>
            </div>
            <div className="hero-dots">
              {[0,1,2].map(i => <span key={i} className={`hdot ${i===0?'hdot-on':''}`} />)}
            </div>
          </div>

          {/* ── Info strip ── */}
          <div className="info-row">
            <div className="info-card">
              <div className="info-ico">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div><p className="info-lbl">Current Location</p><p className="info-val">Bangalore, India</p></div>
            </div>
            <div className="info-div" />
            <div className="info-card">
              <div className="info-dest-thumb"><img src={NEXT_TRIP_THUMB} alt="Bali" /></div>
              <div><p className="info-lbl">Your Next Trip</p><p className="info-val">Bali, Indonesia</p></div>
            </div>
            <div className="info-div" />
            <div className="info-card">
              <div className="info-ico">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </div>
              <div><p className="info-lbl">Upcoming Trip</p><p className="info-val">12 Days to go</p></div>
            </div>
          </div>

          {/* ── Recommended ── */}
          <section className="sec">
            <div className="sec-hd">
              <h2 className="sec-title">Recommended For You</h2>
              <button className="view-all" onClick={() => navigate('/destinations')}>View All →</button>
            </div>
            <div className="rec-grid">
              {RECS.map((r, i) => (
                <div className="rec-card" key={r.name} style={{ animationDelay: `${i * 0.07}s` }}>
                  <div className="rec-img-wrap">
                    <img src={r.img} alt={r.name} className="rec-img" />
                    <button className={`rec-heart ${liked[i] ? 'rec-heart--on' : ''}`} onClick={() => setLiked(p => ({ ...p, [i]: !p[i] }))}>
                      <HeartFilled on={liked[i]} />
                    </button>
                  </div>
                  <div className="rec-info">
                    <p className="rec-name">{r.name}</p>
                    <p className="rec-tag">{r.tag}</p>
                    <div className="rec-rating"><StarFill /><span className="rec-score">{r.rating}</span><span className="rec-rev">({r.reviews} reviews)</span></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Plan Your Next Adventure ── */}
          <section className="sec">
            <div className="sec-hd">
              <h2 className="sec-title">Plan Your Next Adventure</h2>
              <button className="view-all">View All →</button>
            </div>
            <div className="adv-grid">
              <div className="adv-photo">
                <img src={ADV_MOUNTAIN} alt="Mountain" />
                <div className="adv-caption"><p className="adv-cap-name">Mountain Escape</p><p className="adv-cap-loc">Himachal Pradesh</p></div>
              </div>
              <div className="adv-cta">
                <div className="adv-cta-icons">
                  <div className="adv-cta-icon-row">
                    <div className="adv-mini-ico">📍</div><span>Choose Destination</span>
                    <div className="adv-mini-ico">📅</div><span>Select Dates</span>
                    <div className="adv-mini-ico">✈️</div><span>Travel Style</span>
                  </div>
                </div>
                <h3 className="adv-cta-h">Plan your dream<br />trip today!</h3>
                <p className="adv-cta-p">Tell us your preferences and we'll craft the perfect journey for you.</p>
                <button className="adv-cta-btn" onClick={() => navigate('/trips')}>Let's Plan Your Trip →</button>
              </div>
              <div className="adv-photo">
                <img src={ADV_NIGHT_SKY} alt="Night sky" />
                <div className="adv-caption"><p className="adv-cap-name">Night Sky Retreat</p><p className="adv-cap-loc">Ladakh, India</p></div>
              </div>
            </div>
          </section>

          {/* ── Upcoming Trips list ── */}
          <section className="sec">
            <div className="sec-hd">
              <h2 className="sec-title">Your Upcoming Trips</h2>
              <button className="view-all" onClick={() => navigate('/trips')}>View All →</button>
            </div>
            <div className="ut-layout">
              {/* Featured large card */}
              <div className="ut-main">
                <div className="ut-img-wrap">
                  <img src={UPCOMING_TRIPS[0].img} alt={UPCOMING_TRIPS[0].dest} className="ut-img" />
                  <div className="ut-img-overlay" />
                  <div className="ut-img-info">
                    <p className="ut-dest">{UPCOMING_TRIPS[0].dest}</p>
                    <p className="ut-dates">{UPCOMING_TRIPS[0].dates}</p>
                    <div className="ut-meta">
                      <span>📅 {UPCOMING_TRIPS[0].days} Days Trip</span>
                      <span>👥 {UPCOMING_TRIPS[0].people} People</span>
                    </div>
                    <div className="ut-prog-wrap">
                      <div className="ut-prog-bar">
                        <div className="ut-prog-fill" style={{ width: `${UPCOMING_TRIPS[0].progress}%` }} />
                      </div>
                      <span className="ut-prog-pct">{UPCOMING_TRIPS[0].progress}% Completed</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Side list */}
              <div className="ut-side">
                {UPCOMING_TRIPS.slice(1).map((trip, i) => (
                  <div className="ut-row" key={i}>
                    <img src={trip.img} alt={trip.dest} className="ut-row-img" />
                    <div className="ut-row-info">
                      <p className="ut-row-dest">{trip.dest}</p>
                      <p className="ut-row-dates">{trip.dates}</p>
                      <p className="ut-row-meta">📅 {trip.days} Days Trip &nbsp;·&nbsp; 👥 {trip.people} People</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Travel Inspiration Blog ── */}
          <section className="sec" style={{ marginBottom: 16 }}>
            <div className="sec-hd">
              <h2 className="sec-title">Travel Inspiration</h2>
              <button className="view-all">View All →</button>
            </div>
            <div className="blog-grid">
              {BLOG.map((b, i) => (
                <div className="blog-card" key={i}>
                  <img src={b.img} alt={b.title} className="blog-img" />
                  <div className="blog-body">
                    <p className="blog-title">{b.title}</p>
                    <p className="blog-desc">{b.desc}</p>
                    <div className="blog-footer">
                      <span className="blog-date">{b.date}</span>
                      <button className="blog-arrow">→</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Newsletter ── */}
          <div className="newsletter">
            <div className="newsletter-inner">
              <p className="nl-label">GET TRAVEL UPDATES</p>
              <p className="nl-desc">Subscribe to receive travel tips, exclusive deals and inspiration straight to your inbox.</p>
              <div className="nl-form">
                <input className="nl-input" placeholder="Enter your email" />
                <button className="nl-btn">SUBSCRIBE</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
