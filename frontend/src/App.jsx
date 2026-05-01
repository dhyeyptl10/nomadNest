import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { StorageProvider } from './context/StorageContext'
import ProtectedRoute   from './components/ProtectedRoute'
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
import Emergency    from './pages/Emergency'

function Wrap({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <StorageProvider>
            <Routes>
              <Route path="/"             element={<LoginPage />} />
              <Route path="/dashboard"    element={<Wrap><Dashboard /></Wrap>} />
              <Route path="/destinations" element={<Wrap><Destinations /></Wrap>} />
              <Route path="/trips"        element={<Wrap><Trips /></Wrap>} />
              <Route path="/bookings"     element={<Wrap><Bookings /></Wrap>} />
              <Route path="/experiences"  element={<Wrap><Experiences /></Wrap>} />
              <Route path="/favorites"    element={<Wrap><Favorites /></Wrap>} />
              <Route path="/messages"     element={<Wrap><Messages /></Wrap>} />
              <Route path="/travel-style" element={<Wrap><TravelStyle /></Wrap>} />
              <Route path="/settings"     element={<Wrap><Settings /></Wrap>} />
              <Route path="/profile"      element={<Wrap><Profile /></Wrap>} />
              <Route path="/emergency"    element={<Wrap><Emergency /></Wrap>} />
              <Route path="*"             element={<Navigate to="/" replace />} />
            </Routes>
          </StorageProvider>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}
