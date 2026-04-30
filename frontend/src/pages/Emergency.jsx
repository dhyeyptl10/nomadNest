import { useState, useEffect, useRef, useMemo } from 'react'
import L from 'leaflet'
import { 
  ShieldAlert, Phone, MessageSquare, Plus, Hospital, 
  MapPin, User, ChevronRight, AlertTriangle 
} from 'lucide-react'
import Sidebar from '../components/Sidebar'
import './Emergency.css'

const HOSPITALS = [
  { id: 1, name: 'City Central Hospital', dist: '0.8 km', phone: '+91 80 1234 5678', pos: [12.9716, 77.5946] },
  { id: 2, name: 'St. Mary’s Emergency', dist: '1.2 km', phone: '+91 80 8765 4321', pos: [12.9750, 77.6000] },
  { id: 3, name: 'Apollo Specialist Care', dist: '2.5 km', phone: '+91 80 1122 3344', pos: [12.9650, 77.5850] },
]

const CONTACTS = [
  { id: 1, name: 'Rajesh Sharma', rel: 'Father', phone: '+91 98765 43210', initial: 'R' },
  { id: 2, name: 'Priya Patel', rel: 'Partner', phone: '+91 91234 56789', initial: 'P' },
]

export default function Emergency() {
  const [mounted, setMounted] = useState(false)
  const [userPos, setUserPos] = useState([12.9716, 77.5946]) // Default: Bangalore
  const [isSOSActive, setIsSOSActive] = useState(false)
  const [alertMsg, setAlertMsg] = useState(null)
  const [holdProgress, setHoldProgress] = useState(0)
  const [isHolding, setIsHolding] = useState(false)
  
  const mapRef = useRef(null)
  const mapInstance = useRef(null)

  useEffect(() => {
    setMounted(true)
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserPos([position.coords.latitude, position.coords.longitude])
      })
    }
  }, [])

  // Direct Leaflet Initialization
  useEffect(() => {
    if (mounted && mapRef.current && !mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView(userPos, 15)
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapInstance.current)

      // User Marker
      const userIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div class="marker-pulse"></div><div class="marker-dot"></div>',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      })
      L.marker(userPos, { icon: userIcon }).addTo(mapInstance.current).bindPopup('You are here')

      // Hospital Markers
      const hospitalIcon = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/3063/3063176.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      })

      HOSPITALS.forEach(h => {
        L.marker(h.pos, { icon: hospitalIcon })
          .addTo(mapInstance.current)
          .bindPopup(`
            <div class="popup-content">
              <strong>${h.name}</strong><br/>
              ${h.dist} away<br/>
              <button class="popup-call-btn" onclick="window.location.href='tel:${h.phone}'">Call Now</button>
            </div>
          `)
      })
    }

    if (mapInstance.current) {
      mapInstance.current.setView(userPos, 15)
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove()
        mapInstance.current = null
      }
    }
  }, [mounted, userPos])

  // SOS Hold Logic
  useEffect(() => {
    let timer
    if (isHolding && !isSOSActive) {
      timer = setInterval(() => {
        setHoldProgress(p => {
          if (p >= 100) {
            triggerSOS()
            return 0
          }
          return p + 2
        })
      }, 50)
    } else {
      setHoldProgress(0)
      clearInterval(timer)
    }
    return () => clearInterval(timer)
  }, [isHolding, isSOSActive])

  const triggerSOS = () => {
    setIsSOSActive(true)
    setIsHolding(false)
    setAlertMsg("SOS Signal Sent! Local authorities and emergency contacts have been notified.")
    setTimeout(() => {
      setAlertMsg(null)
      setIsSOSActive(false)
    }, 5000)
  }

  const handleCall = (num) => {
    window.location.href = `tel:${num}`
  }

  const handleMessage = (num) => {
    const msg = `URGENT: I need help. My current location is: https://www.google.com/maps?q=${userPos[0]},${userPos[1]}`
    window.location.href = `sms:${num}?body=${encodeURIComponent(msg)}`
  }

  return (
    <div className={`page-shell ${mounted ? 'mounted' : ''}`}>
      <Sidebar />

      <main className="page-body">
        <header className="page-header">
          <div className="page-header-left">
            <h1>Emergency Center</h1>
            <p>Instant help and safety resources for your journey</p>
          </div>
          <div className="flex gap-12">
            <button className="btn btn-outline" onClick={() => handleCall('112')}>
              <Phone size={16} /> 112 Emergency
            </button>
          </div>
        </header>

        <div className="page-scroll">
          <div className="em-container">
            
            {/* SOS HERO */}
            <section className="sos-hero">
              <div className="sos-hero-info">
                <h2 className="sos-title">Emergency SOS</h2>
                <p className="sos-subtitle">Press and hold the button for 3 seconds to trigger an emergency alert. This will notify your emergency contacts and local authorities.</p>
                
                {alertMsg && (
                  <div className="sos-alert-msg animate-fadeUp" style={{ marginTop: '24px' }}>
                    <AlertTriangle size={20} />
                    <span>{alertMsg}</span>
                  </div>
                )}
              </div>
              
              <div className="sos-btn-wrap">
                <svg className="sos-progress-svg" viewBox="0 0 100 100">
                  <circle className="sos-progress-bg" cx="50" cy="50" r="45" />
                  <circle 
                    className="sos-progress-fill" 
                    cx="50" cy="50" r="45"
                    style={{ strokeDasharray: 283, strokeDashoffset: 283 - (283 * holdProgress) / 100 }}
                  />
                </svg>

                <div className={`sos-pulse-ring ${isHolding ? 'sos-pulse--fast' : ''}`}></div>
                <div className={`sos-pulse-ring sos-pulse-ring-2 ${isHolding ? 'sos-pulse--fast' : ''}`}></div>
                
                <button 
                  className={`sos-btn ${isSOSActive ? 'sos-btn--active' : ''} ${isHolding ? 'sos-btn--holding' : ''}`}
                  onMouseDown={() => setIsHolding(true)}
                  onMouseUp={() => setIsHolding(false)}
                  onMouseLeave={() => setIsHolding(false)}
                  onTouchStart={() => setIsHolding(true)}
                  onTouchEnd={() => setIsHolding(false)}
                >
                  <ShieldAlert size={48} className="sos-btn-ico" />
                  <span className="sos-btn-txt">{isSOSActive ? 'SENT' : 'SOS'}</span>
                </button>
              </div>
            </section>

            <div className="em-grid">
              
              {/* LIVE LOCATION MAP */}
              <div className="card map-card">
                <div className="map-header">
                  <div className="flex items-center gap-3">
                    <MapPin className="text-blue" size={20} />
                    <span className="sec-title">Live Location</span>
                  </div>
                  <span className="badge bg-blue-bg text-blue">Live Tracking Active</span>
                </div>
                <div className="map-container-wrap">
                  <div ref={mapRef} className="full-map" />
                </div>
              </div>


              {/* SIDEBAR COL: HOSPITALS & CONTACTS */}
              <div className="flex-col gap-24">
                
                {/* EMERGENCY NUMBERS QUICK DIAL */}
                <div className="card dial-card">
                  <div className="p-5 border-b border-border">
                    <span className="sec-title">Quick Dial Services</span>
                  </div>
                  <div className="dial-grid">
                    {[
                      { lbl: 'Police', num: '100', ico: '👮', color: 'blue' },
                      { lbl: 'Ambulance', num: '102', ico: '🚑', color: 'red' },
                      { lbl: 'Fire', num: '101', ico: '🔥', color: 'amber' },
                      { lbl: 'Women Help', num: '1091', ico: '🛡️', color: 'purple' },
                    ].map(s => (
                      <button key={s.num} className={`dial-btn dial-btn--${s.color}`} onClick={() => handleCall(s.num)}>
                        <span className="dial-ico">{s.ico}</span>
                        <div className="dial-info">
                          <span className="dial-num">{s.num}</span>
                          <span className="dial-lbl">{s.lbl}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                {/* NEARBY HOSPITALS */}
                <div className="card">
                  <div className="p-5 border-b border-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Hospital className="text-red" size={20} />
                      <span className="sec-title">Nearby Hospitals</span>
                    </div>
                  </div>
                  <div className="hosp-search-wrap">
                    <input className="hosp-search-inp" placeholder="Search facilities..." />
                  </div>
                  <div className="hosp-list">
                    {HOSPITALS.map(h => (
                      <div className="hosp-item" key={h.id}>
                        <div className="hosp-info">
                          <div className="hosp-ico"><Hospital size={18} /></div>
                          <div>
                            <p className="hosp-name">{h.name}</p>
                            <p className="hosp-dist">{h.dist} away · <span className="text-green">Open 24/7</span></p>
                          </div>
                        </div>
                        <button className="btn btn-ghost p-2" onClick={() => handleCall(h.phone)}>
                          <Phone size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* EMERGENCY CONTACTS */}
                <div className="card contacts-card">
                  <div className="contacts-header">
                    <div className="flex items-center gap-3">
                      <User className="text-gold" size={20} />
                      <span className="sec-title">Emergency Contacts</span>
                    </div>
                    <button className="btn btn-ghost p-1"><Plus size={18} /></button>
                  </div>
                  <div className="contacts-list">
                    {CONTACTS.map(c => (
                      <div className="contact-item" key={c.id}>
                        <div className="contact-avatar">{c.initial}</div>
                        <div className="contact-details">
                          <p className="contact-name">{c.name}</p>
                          <p className="contact-rel">{c.rel} · {c.phone}</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="btn btn-ghost p-2 text-blue" onClick={() => handleMessage(c.phone)}>
                            <MessageSquare size={16} />
                          </button>
                          <button className="btn btn-ghost p-2 text-green" onClick={() => handleCall(c.phone)}>
                            <Phone size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="em-actions">
                    <button className="action-btn action-btn-msg" onClick={() => handleMessage(CONTACTS[0].phone)}>
                      <MessageSquare size={16} /> Urgent Req via Msg
                    </button>
                    <button className="action-btn action-btn-call" onClick={() => handleCall('112')}>
                      <ShieldAlert size={16} /> Quick SOS Call
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
