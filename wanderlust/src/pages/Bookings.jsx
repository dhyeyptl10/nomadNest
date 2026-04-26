import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import './Bookings.css'

const TABS = ['All', 'Flights', 'Hotels', 'Activities']

const BOOKINGS = [
  {
    id: 'FL001', type: 'Flights', title: 'BLR → DPS (Bali)',
    detail: 'IndiGo · 6E-1234 · Economy', date: '20 May 2024', time: '06:30 AM',
    status: 'Confirmed', price: '₹18,500', ref: 'IGO-2024-BLR-DPS',
    img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=80&fit=crop',
    icon: '✈️', duration: '5h 15m',
  },
  {
    id: 'HT001', type: 'Hotels', title: 'Komaneka at Bisma',
    detail: 'Ubud, Bali · Deluxe Room · 2 Adults', date: '20 May — 02 Jun 2024', time: 'Check-in 2PM',
    status: 'Confirmed', price: '₹28,000', ref: 'KOM-2024-0520',
    img: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400&q=80&fit=crop',
    icon: '🏨', duration: '12 nights',
  },
  {
    id: 'AC001', type: 'Activities', title: 'Ubud Monkey Forest Tour',
    detail: 'Guided Tour · 4 Hours · Pickup Included', date: '23 May 2024', time: '09:00 AM',
    status: 'Confirmed', price: '₹2,800', ref: 'ACT-2024-0523',
    img: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80&fit=crop',
    icon: '🎯', duration: '4 hours',
  },
  {
    id: 'FL002', type: 'Flights', title: 'BLR → ATH (Athens)',
    detail: 'Air India · AI-9874 · Business', date: '15 Jul 2024', time: '11:45 PM',
    status: 'Pending', price: '₹52,000', ref: 'AIA-2024-BLR-ATH',
    img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=80&fit=crop',
    icon: '✈️', duration: '9h 30m',
  },
  {
    id: 'HT002', type: 'Hotels', title: 'Canaves Oia Epitome',
    detail: 'Santorini · Infinity Pool Suite · 2 Adults', date: '16 Jul — 25 Jul 2024', time: 'Check-in 3PM',
    status: 'Pending', price: '₹68,000', ref: 'CAO-2024-0716',
    img: 'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=400&q=80&fit=crop',
    icon: '🏨', duration: '9 nights',
  },
  {
    id: 'AC002', type: 'Activities', title: 'Sunset Sailing — Santorini',
    detail: 'Private Yacht · Champagne & Dinner · 4h', date: '20 Jul 2024', time: '05:30 PM',
    status: 'Pending', price: '₹12,500', ref: 'SAL-2024-0720',
    img: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=400&q=80&fit=crop',
    icon: '⛵', duration: '4 hours',
  },
]

const STATUS_STYLE = {
  'Confirmed': { bg: 'rgba(16,185,129,0.12)', color: '#059669', dot: '#10B981' },
  'Pending':   { bg: 'rgba(245,158,11,0.12)', color: '#D97706', dot: '#F59E0B' },
  'Cancelled': { bg: 'rgba(239,68,68,0.12)',  color: '#DC2626', dot: '#EF4444' },
}

const TOTAL_SPEND = BOOKINGS.reduce((acc, b) => acc + parseInt(b.price.replace(/[₹,]/g,'')), 0)

export default function Bookings() {
  const [mounted, setMounted] = useState(false)
  const [tab, setTab] = useState('All')
  const [expanded, setExpanded] = useState(null)

  useEffect(() => { const t = setTimeout(() => setMounted(true), 40); return () => clearTimeout(t) }, [])

  const filtered = BOOKINGS.filter(b => tab === 'All' || b.type === tab)

  return (
    <div className={`pg-root ${mounted ? 'pg-on' : ''}`}>
      <Sidebar />
      <div className="pg-main">
        <header className="pg-header">
          <div>
            <h1 className="pg-title">Bookings</h1>
            <p className="pg-sub">Manage all your reservations in one place</p>
          </div>
          <button className="new-trip-btn" style={{ padding:'9px 18px', fontSize:13.5 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            New Booking
          </button>
        </header>

        <div className="pg-scroll" style={{ padding:'0 24px 32px' }}>

          {/* Summary */}
          <div className="bk-summary" style={{ paddingTop:20 }}>
            <div className="bk-sum-card bk-sum-big">
              <p className="bk-sum-label">Total Bookings</p>
              <p className="bk-sum-big-val">{BOOKINGS.length}</p>
              <div className="bk-sum-sub-row">
                <span>✅ {BOOKINGS.filter(b=>b.status==='Confirmed').length} Confirmed</span>
                <span>⏳ {BOOKINGS.filter(b=>b.status==='Pending').length} Pending</span>
              </div>
            </div>
            <div className="bk-sum-card">
              <p className="bk-sum-label">Flights</p>
              <p className="bk-sum-val">✈️ {BOOKINGS.filter(b=>b.type==='Flights').length}</p>
            </div>
            <div className="bk-sum-card">
              <p className="bk-sum-label">Hotels</p>
              <p className="bk-sum-val">🏨 {BOOKINGS.filter(b=>b.type==='Hotels').length}</p>
            </div>
            <div className="bk-sum-card">
              <p className="bk-sum-label">Activities</p>
              <p className="bk-sum-val">🎯 {BOOKINGS.filter(b=>b.type==='Activities').length}</p>
            </div>
            <div className="bk-sum-card bk-sum-gold">
              <p className="bk-sum-label" style={{ color:'rgba(255,255,255,0.7)' }}>Total Spend</p>
              <p className="bk-sum-val" style={{ color:'white', fontSize:18 }}>₹{(TOTAL_SPEND/1000).toFixed(0)}k</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="trip-tabs" style={{ marginBottom:18 }}>
            {TABS.map(t => (
              <button key={t} className={`trip-tab ${tab===t?'trip-tab--on':''}`} onClick={() => setTab(t)}>
                {t}
                <span className="trip-tab-count">{t==='All'?BOOKINGS.length:BOOKINGS.filter(b=>b.type===t).length}</span>
              </button>
            ))}
          </div>

          {/* Booking cards */}
          <div className="bk-list">
            {filtered.map((bk, i) => {
              const s = STATUS_STYLE[bk.status]
              const isOpen = expanded === bk.id
              return (
                <div className={`bk-card ${isOpen?'bk-card--open':''}`} key={bk.id} style={{ animationDelay:`${i*0.06}s` }}>
                  <div className="bk-main-row" onClick={() => setExpanded(isOpen ? null : bk.id)}>
                    <img src={bk.img} alt={bk.title} className="bk-img" />
                    <div className="bk-info">
                      <div className="bk-info-top">
                        <span className="bk-type-chip">{bk.icon} {bk.type}</span>
                        <span className="bk-status" style={{ background:s.bg, color:s.color }}>
                          <span className="trip-dot" style={{ background:s.dot }} />{bk.status}
                        </span>
                      </div>
                      <p className="bk-title">{bk.title}</p>
                      <p className="bk-detail">{bk.detail}</p>
                      <div className="bk-meta">
                        <span>📅 {bk.date}</span>
                        <span>🕐 {bk.time}</span>
                        <span>⏱ {bk.duration}</span>
                      </div>
                    </div>
                    <div className="bk-right">
                      <p className="bk-price">{bk.price}</p>
                      <p className="bk-ref">Ref: {bk.ref}</p>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" style={{ transform: isOpen?'rotate(180deg)':'none', transition:'0.2s', marginTop:8 }}><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                  </div>
                  {isOpen && (
                    <div className="bk-expand">
                      <div className="bk-actions">
                        <button className="bk-action-btn bk-action-primary">📄 Download Voucher</button>
                        <button className="bk-action-btn">✏️ Modify Booking</button>
                        <button className="bk-action-btn bk-action-danger">❌ Cancel</button>
                      </div>
                      <div className="bk-ref-full">
                        <p className="bk-ref-title">Booking Reference</p>
                        <p className="bk-ref-code">{bk.ref}</p>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </div>
  )
}
