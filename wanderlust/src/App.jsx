import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import Destinations from './pages/Destinations'
import Trips from './pages/Trips'
import Bookings from './pages/Bookings'
import Experiences from './pages/Experiences'
import Favorites from './pages/Favorites'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"             element={<LoginPage />} />
        <Route path="/dashboard"    element={<Dashboard />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/trips"        element={<Trips />} />
        <Route path="/bookings"     element={<Bookings />} />
        <Route path="/experiences"  element={<Experiences />} />
        <Route path="/favorites"    element={<Favorites />} />
        <Route path="*"             element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
