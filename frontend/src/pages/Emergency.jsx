import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { 
  ShieldAlert, Phone, MessageSquare, Plus, Hospital, 
  MapPin, User, ChevronRight, AlertTriangle 
} from 'lucide-react'
import Sidebar from '../components/Sidebar'
import './Emergency.css'

// Custom Marker for User Location
const userIcon = new L.DivIcon({
  className: 'custom-marker',
  html: '<div class="marker-pulse"></div><div class="marker-dot"></div>',
  iconSize: [30, 30],
  iconAnchor: [15, 15]
})

// Custom Marker for Hospitals
const hospitalIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3063/3063176.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
})

const HOSPITALS = [
  { id: 1, name: 'City Central Hospital', dist: '0.8 km', phone: '+91 80 1234 5678', pos: [12.9716, 77.5946] },
  { id: 2, name: 'St. Mary’s Emergency', dist: '1.2 km', phone: '+91 80 8765 4321', pos: [12.9750, 77.6000] },
  { id: 3, name: 'Apollo Specialist Care', dist: '2.5 km', phone: '+91 80 1122 3344', pos: [12.9650, 77.5850] },
]

const CONTACTS = [
  { id: 1, name: 'Rajesh Sharma', rel: 'Father', phone: '+91 98765 43210', initial: 'R' },
  { id: 2, name: 'Priya Patel', rel: 'Partner', phone: '+91 91234 56789', initial: 'P' },
]

// Helper to center map on user
function ChangeView({ center }) {
  const map = useMap()
  map.setView(center, 15)
  return null
}

export default function Emergency() {
  const [mounted, setMounted] = useState(false)
  const [userPos, setUserPos] = useState([12.9716, 77.5946]) // Default: Bangalore
  const [isSOSActive, setIsSOSActive] = useState(false)
  const [alertMsg, setAlertMsg] = useState(null)

  useEffect(() => {
    setMounted(true)
    // Try to get real location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserPos([position.coords.latitude, position.coords.longitude])
      })
    }
  }, [])

  const triggerSOS = () => {
    setIsSOSActive(true)
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
              <h2 className="sos-title">Emergency SOS</h2>
              <p className="sos-subtitle">Press and hold the button for 3 seconds to trigger an emergency alert to all contacts.</p>
              
              <div className="sos-btn-wrap">
                <div className="sos-pulse-ring"></div>
                <div className="sos-pulse-ring sos-pulse-ring-2"></div>
                <button 
                  className={`sos-btn ${isSOSActive ? 'sos-btn--active' : ''}`}
                  onClick={triggerSOS}
                >
                  <ShieldAlert size={48} className="sos-btn-ico" />
                  <span className="sos-btn-txt">SOS</span>
                </button>
              </div>

              {alertMsg && (
                <div className="mt-8 p-4 bg-red-bg text-red rounded-lg flex items-center gap-3 animate-fadeUp">
                  <AlertTriangle size={20} />
                  <span className="font-semibold">{alertMsg}</span>
                </div>
              )}
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
                  <MapContainer center={userPos} zoom={15} scrollWheelZoom={false}>
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    />
                    <ChangeView center={userPos} />
                    <Marker position={userPos} icon={userIcon}>
                      <Popup>You are here</Popup>
                    </Marker>
                    {HOSPITALS.map(h => (
                      <Marker key={h.id} position={h.pos} icon={hospitalIcon}>
                        <Popup>
                          <strong>{h.name}</strong><br />
                          {h.dist} away<br />
                          <button onClick={() => handleCall(h.phone)}>Call</button>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
              </div>

              {/* SIDEBAR COL: HOSPITALS & CONTACTS */}
              <div className="flex-col gap-24">
                
                {/* NEARBY HOSPITALS */}
                <div className="card">
                  <div className="p-5 border-b border-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Hospital className="text-red" size={20} />
                      <span className="sec-title">Nearby Hospitals</span>
                    </div>
                  </div>
                  <div className="hosp-list">
                    {HOSPITALS.map(h => (
                      <div className="hosp-item" key={h.id}>
                        <div className="hosp-info">
                          <div className="hosp-ico"><Hospital size={18} /></div>
                          <div>
                            <p className="hosp-name">{h.name}</p>
                            <p className="hosp-dist">{h.dist} away</p>
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
