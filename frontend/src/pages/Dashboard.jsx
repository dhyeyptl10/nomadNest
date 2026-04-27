import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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
    <div className={`flex h-screen w-screen overflow-hidden bg-cream opacity-0 transition-opacity duration-[0.55s] ease-out ${mounted ? 'opacity-100' : ''}`}>

      {/* ── Sidebar ── */}
      <aside className="w-[248px] shrink-0 bg-charcoal flex flex-col p-[26px_16px] h-screen overflow-hidden relative border-r border-white/5 before:content-[''] before:absolute before:-top-[60px] before:-left-[60px] before:w-[220px] before:h-[220px] before:bg-[radial-gradient(circle,rgba(201,150,58,0.09)_0%,transparent_70%)] before:pointer-events-none">
        
        <div className="flex items-center gap-[12px] px-[8px] mb-[38px]">
          <div className="w-[38px] h-[38px] rounded-[10px] bg-gradient-to-br from-gold/25 to-gold/10 border border-gold/35 flex items-center justify-center shadow-[0_2px_10px_rgba(201,150,58,0.15)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="3 18 12 2 21 18"/>
              <path d="M9 18 12 12 15 18"/>
            </svg>
          </div>
          <span className="text-[15px] font-semibold text-white tracking-[0.4px]">Wanderlust</span>
        </div>

        <nav className="flex flex-col gap-[3px] flex-1">
          {[
            { id: 'home',     label: 'Overview',  icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
            { id: 'trips',    label: 'My Trips',  icon: 'M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3m4 13H9a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2z' },
            { id: 'explore',  label: 'Explore',   icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z' },
            { id: 'saved',    label: 'Saved',     icon: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' },
            { id: 'settings', label: 'Settings',  icon: 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' },
          ].map(item => (
            <button
              key={item.id}
              className={`flex items-center gap-[13px] p-[12px_14px] border-none bg-transparent rounded-[11px] text-[14px] font-medium font-body cursor-pointer text-left w-full transition-all duration-200 relative tracking-[0.1px] hover:bg-white/5 hover:text-white/80 hover:pl-[18px] ${activeNav === item.id ? 'bg-gradient-to-br from-gold/20 to-gold/10 text-gold-light border border-gold/15 before:content-[""] before:absolute before:left-0 before:top-[20%] before:bottom-[20%] before:w-[3px] before:bg-gold before:rounded-[0_3px_3px_0]' : 'text-white/45'}`}
              onClick={() => setActiveNav(item.id)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                {item.icon.split(' M').map((d, i) => (
                  <path key={i} d={i === 0 ? d : 'M' + d}/>
                ))}
              </svg>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-[10px] pt-[14px] px-[8px] border-t border-white/5 mt-[16px]">
          <div className="w-[36px] h-[36px] rounded-full bg-gradient-to-br from-gold to-[#e8a830] text-white flex items-center justify-center text-[14px] font-bold shrink-0 shadow-[0_2px_10px_rgba(201,150,58,0.3)]">A</div>
          <div className="flex-1 overflow-hidden">
            <p className="text-[13px] font-semibold text-white whitespace-nowrap overflow-hidden text-ellipsis">Ananya Sharma</p>
            <p className="text-[11px] text-white/40 whitespace-nowrap overflow-hidden text-ellipsis mt-[1px]">ananya@example.com</p>
          </div>
          <button className="border-none bg-transparent text-white/30 cursor-pointer p-[7px] rounded-[8px] flex transition-colors duration-200 hover:text-white/85 hover:bg-white/5" onClick={() => navigate('/')} title="Sign out">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 flex flex-col overflow-hidden min-w-0 bg-cream-mid">

        {/* Header */}
        <header className="flex items-center justify-between p-[28px_36px_0] bg-cream-mid animate-[fadeDown_0.5s_cubic-bezier(0.16,1,0.3,1)_0.1s_both]">
          <div>
            <h1 className="font-display text-[26px] font-bold text-text-dark mb-[4px] tracking-[-0.3px]">
              Good morning, Ananya!{' '}
              <span className="inline-block w-[32px] h-[32px] rounded-full overflow-hidden ml-[8px] align-middle border-[2px] border-gold/25">
                <img
                  src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&q=80&fit=crop&crop=face"
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </span>
            </h1>
            <p className="text-[14px] text-text-mid font-normal">Ready for your next adventure?</p>
          </div>
          <button className="relative overflow-hidden flex items-center gap-[8px] p-[12px_22px] bg-charcoal text-white border-none rounded-[13px] text-[14px] font-semibold font-body cursor-pointer transition-all duration-200 tracking-[0.2px] hover:bg-charcoal-mid hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(26,31,46,0.3)] after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-br after:from-white/10 after:to-transparent after:pointer-events-none">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Plan New Trip
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-[26px_36px_36px] flex flex-col gap-[26px]">

          {/* Stats */}
          <div className="grid grid-cols-4 gap-[16px]">
            {STATS.map((s, i) => (
              <div 
                className="bg-white rounded-[20px] p-[22px] flex flex-col gap-[4px] border border-black/5 animate-[fadeUp_0.5s_cubic-bezier(0.16,1,0.3,1)_both] transition-all duration-200 relative overflow-hidden hover:-translate-y-[4px] hover:shadow-[0_12px_36px_rgba(0,0,0,0.1)] before:content-[''] before:absolute before:top-0 before:right-0 before:w-[80px] before:h-[80px] before:rounded-[0_20px_0_100%] before:opacity-5" 
                key={s.label} 
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {/* Dynamically insert before bg color via inline style or custom tailwind mapped to original */}
                <div className="absolute top-0 right-0 w-[80px] h-[80px] rounded-[0_20px_0_100%] opacity-5 pointer-events-none" style={{ backgroundColor: i===0 ? '#4DB6A9' : i===1 ? '#7B8FD4' : i===2 ? '#E07B7B' : '#C9963A' }}></div>

                <div className="w-[44px] h-[44px] rounded-[12px] overflow-hidden mb-[10px] shrink-0 relative">
                  <img src={s.img} alt={s.label} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">{s.svgIcon}</div>
                </div>
                <p className="font-display text-[28px] font-bold text-text-dark leading-none tracking-[-0.5px]">{s.value}</p>
                <p className="text-[11.5px] text-text-light font-medium uppercase tracking-[0.7px] mt-[2px]">{s.label}</p>
                <p className={`text-[11px] font-semibold mt-[6px] flex items-center gap-[3px] ${s.changeType === 'up' ? 'text-[#2A9D8F]' : 'text-gold'}`}>{s.change}</p>
              </div>
            ))}
          </div>

          {/* Two columns */}
          <div className="grid grid-cols-[1.25fr_0.75fr] gap-[20px] min-h-0">

            {/* My Trips */}
            <section className="bg-white rounded-[22px] p-[24px] border border-black/5 animate-[fadeUp_0.55s_cubic-bezier(0.16,1,0.3,1)_0.2s_both]">
              <div className="flex items-center justify-between mb-[18px]">
                <h2 className="font-display text-[18px] font-bold text-text-dark tracking-[-0.2px]">My Trips</h2>
                <button className="border-none bg-transparent text-[13px] text-gold font-semibold cursor-pointer font-body p-0 transition-opacity duration-200 hover:opacity-70">See all</button>
              </div>
              <div className="flex flex-col gap-[4px]">
                {TRIPS.map((trip, i) => (
                  <div className="flex items-center gap-[14px] p-[13px] rounded-[14px] cursor-pointer transition-all duration-200 animate-[fadeRight_0.45s_cubic-bezier(0.16,1,0.3,1)_both] hover:bg-cream hover:translate-x-[4px]" key={trip.id} style={{ animationDelay: `${0.12 + i * 0.09}s` }}>
                    <img src={trip.img} alt={trip.dest} className="w-[56px] h-[56px] rounded-[14px] object-cover shrink-0 border-[2px] border-black/5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[14.5px] font-semibold text-text-dark mb-[3px] tracking-[-0.1px]">{trip.dest}</p>
                      <p className="text-[12px] text-text-mid font-normal">{trip.dates} · {trip.days} days</p>
                    </div>
                    <div className="flex flex-col items-end gap-[5px] shrink-0">
                      <span className={`text-[11px] font-semibold p-[4px_11px] rounded-full whitespace-nowrap tracking-[0.2px] ${trip.status === 'upcoming' ? 'bg-[#2A9D8F]/10 text-[#1E8A7D] border border-[#2A9D8F]/20' : trip.status === 'planning' ? 'bg-gold/10 text-[#9B7020] border border-gold/20' : 'bg-[#C0605E]/10 text-[#B05250] border border-[#C0605E]/20'}`}>
                        {statusLabel(trip.status)}
                      </span>
                      {trip.daysLeft && (
                        <p className="text-[11px] text-text-light font-medium">{trip.daysLeft}d away</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Explore */}
            <section className="flex flex-col animate-[fadeUp_0.55s_cubic-bezier(0.16,1,0.3,1)_0.28s_both]">
              <div className="flex items-center justify-between mb-[18px]">
                <h2 className="font-display text-[18px] font-bold text-text-dark tracking-[-0.2px]">Explore</h2>
                <button className="border-none bg-transparent text-[13px] text-gold font-semibold cursor-pointer font-body p-0 transition-opacity duration-200 hover:opacity-70">Discover more</button>
              </div>
              <div className="flex flex-col gap-[14px] flex-1">
                {EXPLORE.map((place, i) => (
                  <div className="relative rounded-[18px] overflow-hidden cursor-pointer flex-1 min-h-[90px] animate-[fadeRight_0.45s_cubic-bezier(0.16,1,0.3,1)_both] shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-all duration-300 ease-out hover:-translate-y-[3px] hover:scale-[1.01] hover:shadow-[0_12px_36px_rgba(0,0,0,0.18)] group" key={place.name} style={{ animationDelay: `${0.18 + i * 0.1}s` }}>
                    <img src={place.img} alt={place.name} className="w-full h-full object-cover min-h-[90px] block transition-transform duration-[0.55s] ease-out group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0f1428]/70 via-[#0f1428]/15 to-transparent flex items-center justify-between px-[18px]">
                      <span className="text-[10px] font-bold uppercase tracking-[1.2px] text-gold-light bg-gold/20 p-[4px_10px] rounded-full border border-gold/45 backdrop-blur-md">{place.tag}</span>
                      <div>
                        <p className="text-[14px] font-bold text-white text-right tracking-[-0.2px]">{place.name}</p>
                        <p className="text-[11px] text-white/60 text-right mt-[2px] font-normal">{place.country}</p>
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
