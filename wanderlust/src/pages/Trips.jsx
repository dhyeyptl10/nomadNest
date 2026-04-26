import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import './Trips.css'

const TABS = ['All', 'Upcoming', 'Ongoing', 'Completed', 'Wishlist']

const TRIPS = [
  {
    id: 1, dest: 'Bali, Indonesia',      status: 'Upcoming',  dates: '20 May — 02 Jun 2024', days: 12,
    daysLeft: 12, progress: 70, budget: '₹55,000', spent: '₹38,500',
    img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80&fit=crop',
    activities: ['Temple Tour', 'Surfing', 'Rice Terraces'], members: 2,
  },
  {
    id: 2, dest: 'Santorini, Greece',    status: 'Upcoming',  dates: '15 Jul — 25 Jul 2024', days: 10,
    daysLeft: 57, progress: 30, budget: '₹95,000', spent: '₹28,000',
    img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80&fit=crop',
    activities: ['Caldera View', 'Wine Tasting', 'Sailing'], members: 2,
  },
  {
    id: 3, dest: 'Kyoto, Japan',         status: 'Wishlist',  dates: 'Sep 2024', days: 9,
    daysLeft: null, progress: 10, budget: '₹1,30,000', spent: '₹0',
    img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80&fit=crop',
    activities: ['Geisha District', 'Tea Ceremony', 'Bamboo Grove'], members: 1,
  },
  {
    id: 4, dest: 'Goa, India',           status: 'Completed', dates: '01 Jan — 07 Jan 2024', days: 7,
    daysLeft: null, progress: 100, budget: '₹25,000', spent: '₹23,400',
    img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80&fit=crop',
    activities: ['Beach Hopping', 'Nightlife', 'Water Sports'], members: 4,
  },
  {
    id: 5, dest: 'Swiss Alps',           status: 'Wishlist',  dates: 'Dec 2024', days: 10,
    daysLeft: null, progress: 5, budget: '₹1,50,000', spent: '₹0',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80&fit=crop',
    activities: ['Skiing', 'Cable Car', 'Fondue'], members: 2,
  },
  {
    id: 6, dest: 'Maldives',             status: 'Completed', dates: '10 Mar — 17 Mar 2024', days: 7,
    daysLeft: null, progress: 100, budget: '₹1,20,000', spent: '₹1,14,000',
    img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80&fit=crop',
    activities: ['Snorkeling', 'Overwater Villa', 'Sunset Cruise'], members: 2,
  },
]

const STATUS_STYLE = {
  'Upcoming':  { bg: 'rgba(212,168,67,0.12)',  color: '#B8860B',  dot: '#D4A843' },
  'Ongoing':   { bg: 'rgba(16,185,129,0.12)',  color: '#059669',  dot: '#10B981' },
  'Completed': { bg: 'rgba(99,102,241,0.12)',  color: '#5B5BD6',  dot: '#6366F1' },
  'Wishlist':  { bg: 'rgba(239,68,68,0.12)',   color: '#DC2626',  dot: '#EF4444' },
}

const SUMMARY = [
  { label: 'Total Trips',     value: '6',    icon: '✈️' },
  { label: 'Countries',       value: '8',    icon: '🌍' },
  { label: 'Days Traveled',   value: '84',   icon: '📅' },
  { label: 'Total Spent',     value: '₹2.4L', icon: '💰' },
]

export default function Trips() {
  const [mounted, setMounted] = useState(false)
  const [tab, setTab] = useState('All')
  const [view, setView] = useState('grid') // grid | list

  useEffect(() => { const t = setTimeout(() => setMounted(true), 40); return () => clearTimeout(t) }, [])

  const filtered = TRIPS.filter(t => tab === 'All' || t.status === tab)

  return (
    <div className={`pg-root ${mounted ? 'pg-on' : ''}`}>
      <Sidebar />
      <div className="pg-main">

        {/* Header */}
        <header className="pg-header">
          <div>
            <h1 className="pg-title">My Trips</h1>
            <p className="pg-sub">All your journeys — past, present, and future</p>
          </div>
          <div className="trips-header-r">
            <div className="view-toggle">
              {['grid','list'].map(v => (
                <button key={v} className={`view-btn ${view===v?'view-btn--on':''}`} onClick={() => setView(v)}>
                  {v === 'grid'
                    ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                    : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                  }
                </button>
              ))}
            </div>
            <button className="new-trip-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              New Trip
            </button>
          </div>
        </header>

        <div className="pg-scroll" style={{ padding: '0 24px 32px' }}>

          {/* Summary cards */}
          <div className="trip-summary" style={{ paddingTop: 20 }}>
            {SUMMARY.map((s, i) => (
              <div className="sum-card" key={s.label} style={{ animationDelay: `${i*0.06}s` }}>
                <span className="sum-icon">{s.icon}</span>
                <p className="sum-val">{s.value}</p>
                <p className="sum-lbl">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="trip-tabs">
            {TABS.map(t => (
              <button key={t} className={`trip-tab ${tab===t?'trip-tab--on':''}`} onClick={() => setTab(t)}>
                {t}
                <span className="trip-tab-count">{t==='All' ? TRIPS.length : TRIPS.filter(x=>x.status===t).length}</span>
              </button>
            ))}
          </div>

          {/* Grid or list */}
          {view === 'grid' ? (
            <div className="trips-grid">
              {filtered.map((trip, i) => {
                const s = STATUS_STYLE[trip.status]
                return (
                  <div className="trip-card" key={trip.id} style={{ animationDelay: `${i*0.07}s` }}>
                    <div className="trip-img-wrap">
                      <img src={trip.img} alt={trip.dest} className="trip-img" />
                      <div className="trip-status-badge" style={{ background: s.bg, color: s.color }}>
                        <span className="trip-dot" style={{ background: s.dot }} />
                        {trip.status}
                      </div>
                      {trip.daysLeft && (
                        <div className="trip-days-chip">{trip.daysLeft} days away</div>
                      )}
                    </div>
                    <div className="trip-body">
                      <p className="trip-dest">{trip.dest}</p>
                      <p className="trip-dates">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        {trip.dates} · {trip.days} days
                      </p>
                      <div className="trip-activities">
                        {trip.activities.map(a => <span key={a} className="act-chip">{a}</span>)}
                      </div>
                      <div className="trip-budget-row">
                        <div>
                          <p className="trip-budget-lbl">Budget</p>
                          <p className="trip-budget-val">{trip.budget}</p>
                        </div>
                        <div>
                          <p className="trip-budget-lbl">Spent</p>
                          <p className="trip-budget-val">{trip.spent}</p>
                        </div>
                        <div>
                          <p className="trip-budget-lbl">Members</p>
                          <p className="trip-budget-val">👥 {trip.members}</p>
                        </div>
                      </div>
                      <div className="trip-progress-wrap">
                        <div className="trip-progress-bar">
                          <div className="trip-progress-fill" style={{ width: `${trip.progress}%` }} />
                        </div>
                        <span className="trip-progress-pct">{trip.progress}%</span>
                      </div>
                      <button className="trip-view-btn">View Details →</button>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="trips-list-view">
              {filtered.map((trip, i) => {
                const s = STATUS_STYLE[trip.status]
                return (
                  <div className="trip-list-row" key={trip.id} style={{ animationDelay: `${i*0.05}s` }}>
                    <img src={trip.img} alt={trip.dest} className="trip-list-img" />
                    <div className="trip-list-info">
                      <p className="trip-dest">{trip.dest}</p>
                      <p className="trip-dates" style={{ marginTop: 3 }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        {trip.dates} · {trip.days} days
                      </p>
                    </div>
                    <div className="trip-list-meta">
                      <span className="trip-status-badge" style={{ background: s.bg, color: s.color }}>
                        <span className="trip-dot" style={{ background: s.dot }} />{trip.status}
                      </span>
                      <p className="trip-budget-val" style={{ marginTop: 6, textAlign:'right' }}>{trip.budget}</p>
                    </div>
                    <div className="trip-list-bar">
                      <div className="trip-progress-bar" style={{ width: 100 }}>
                        <div className="trip-progress-fill" style={{ width: `${trip.progress}%` }} />
                      </div>
                      <span className="trip-progress-pct">{trip.progress}%</span>
                    </div>
                    <button className="trip-view-btn" style={{ marginTop: 0, width:'auto', padding:'8px 16px' }}>View →</button>
                  </div>
                )
              })}
            </div>
          )}

          {filtered.length === 0 && (
            <div className="no-results">
              <span style={{ fontSize: 48 }}>🗺️</span>
              <p>No {tab.toLowerCase()} trips yet</p>
              <button onClick={() => setTab('All')}>View all trips</button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
