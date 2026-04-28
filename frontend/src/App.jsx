import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import LoginPage    from './pages/LoginPage'
import Dashboard    from './pages/Dashboard'
import Destinations from './pages/Destinations'
import Trips        from './pages/Trips'
import Bookings     from './pages/Bookings'
import Experiences  from './pages/Experiences'
import Favorites    from './pages/Favorites'
import Messages     from './pages/Messages'
import TravelStyle  from './pages/TravelStyle'
import Settings     from './pages/Settings'
import Profile      from './pages/Profile'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"             element={<LoginPage />} />
          <Route path="/dashboard"    element={<Dashboard />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/trips"        element={<Trips />} />
          <Route path="/bookings"     element={<Bookings />} />
          <Route path="/experiences"  element={<Experiences />} />
          <Route path="/favorites"    element={<Favorites />} />
          <Route path="/messages"     element={<Messages />} />
          <Route path="/travel-style" element={<TravelStyle />} />
          <Route path="/settings"     element={<Settings />} />
          <Route path="/profile"      element={<Profile />} />
          <Route path="*"             element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
