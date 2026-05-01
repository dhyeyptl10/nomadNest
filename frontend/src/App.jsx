import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider }  from './context/ThemeContext'
import { StorageProvider } from './context/StorageContext'
import { ToastProvider }  from './context/ToastContext'
import ErrorBoundary      from './components/ErrorBoundary'
import ProtectedRoute     from './components/ProtectedRoute'

/* ── Lazy-loaded pages (code splitting) ── */
const LoginPage    = lazy(() => import('./pages/LoginPage'))
const Dashboard    = lazy(() => import('./pages/Dashboard'))
const Destinations = lazy(() => import('./pages/Destinations'))
const Trips        = lazy(() => import('./pages/Trips'))
const Bookings     = lazy(() => import('./pages/Bookings'))
const Experiences  = lazy(() => import('./pages/Experiences'))
const Favorites    = lazy(() => import('./pages/Favorites'))
const Messages     = lazy(() => import('./pages/Messages'))
const TravelStyle  = lazy(() => import('./pages/TravelStyle'))
const Settings     = lazy(() => import('./pages/Settings'))
const Profile      = lazy(() => import('./pages/Profile'))
const Emergency    = lazy(() => import('./pages/Emergency'))

/* ── Page loading fallback ── */
function PageLoader() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: '#F7F3EE',
    }}>
      <div className="spinner" style={{ width: 36, height: 36 }} />
    </div>
  )
}

function Wrap({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BrowserRouter>
          <StorageProvider>
            <ToastProvider>
              <Suspense fallback={<PageLoader />}>
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
              </Suspense>
            </ToastProvider>
          </StorageProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
