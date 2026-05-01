# 🌍 NomadNest — Premium Travel Planning Platform

> A full-featured, industry-ready travel planning web application built with React + Vite, featuring authentication, CRUD operations, and a polished premium UI.

---

## 🚀 Live Preview

Run locally → `http://localhost:5174`

Demo credentials:
- **Email:** `ananya@example.com`
- **Password:** `password123`

---

## ✨ Features

### Core
- 🔐 **Authentication** — Register, sign in, persistent login via localStorage
- 🗺️ **Trip Management** — Full CRUD (Create, Read, Update, Delete) for trips
- 📅 **Bookings** — Track flights, hotels, and activities
- ❤️ **Favorites** — Save and manage dream destinations
- 🆘 **Emergency** — SOS contacts, live map, and emergency alert system
- 🎨 **Travel Style Quiz** — 5-question personality quiz with destination matches
- 🌙 **Light/Dark Mode** — Theme persisted in localStorage

### Technical
- ⚡ **Code Splitting** — All 12 pages lazy-loaded with React.lazy + Suspense
- 🛡️ **Error Boundary** — Global error UI with friendly fallback
- 🔔 **Toast Notifications** — Success/error/info/warning feedback on all CRUD ops
- 💀 **Skeleton Loaders** — Smooth loading states for cards and lists
- 🪝 **Custom Hooks** — `useDebounce`, `useFetch`, `useLocalStorage`, `useSessionStorage`, `usePageTitle`
- 🔒 **Protected Routes** — All dashboard pages require authentication
- 📊 **localStorage + sessionStorage** — Persistent user data + temp form state
- 🔍 **SEO** — Dynamic page titles, meta description, Open Graph, Twitter Card, Schema.org

---

## 📁 Folder Structure

```
frontend/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ErrorBoundary.jsx
│   │   ├── Skeleton.jsx / Skeleton.css
│   │   ├── Sidebar.jsx / Sidebar.css
│   │   ├── Topbar.jsx / Topbar.css
│   │   ├── ProtectedRoute.jsx
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── icons/
│   │   └── layout/
│   ├── context/            # Global state providers
│   │   ├── AuthContext.jsx       # Login, register, logout, profile
│   │   ├── StorageContext.jsx    # CRUD factory for trips/bookings/favorites/emergency
│   │   ├── ThemeContext.jsx      # Light/Dark mode
│   │   └── ToastContext.jsx      # Toast notification system
│   ├── data/
│   │   └── images.js            # Centralized Unsplash image registry
│   ├── hooks/              # Custom hooks
│   │   ├── useDebounce.js
│   │   ├── useFetch.js
│   │   ├── useStorage.js        # useLocalStorage + useSessionStorage
│   │   └── usePageTitle.js
│   ├── pages/              # Route-level page components
│   │   ├── LoginPage.jsx / .css
│   │   ├── Dashboard.jsx / .css
│   │   ├── Destinations.jsx / .css
│   │   ├── Trips.jsx / .css
│   │   ├── Bookings.jsx / .css
│   │   ├── Experiences.jsx / .css
│   │   ├── Favorites.jsx / .css
│   │   ├── Messages.jsx / .css
│   │   ├── TravelStyle.jsx / .css
│   │   ├── Settings.jsx / .css
│   │   ├── Profile.jsx / .css
│   │   └── Emergency.jsx / .css
│   ├── App.jsx             # Routes + Providers + Lazy loading
│   ├── main.jsx
│   └── index.css
├── index.html              # SEO meta tags, OG tags
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 🛠️ Setup & Installation

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/dhyeyptl10/nomadNest.git
cd nomadNest/frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# → http://localhost:5173
```

### Production Build

```bash
npm run build
npm run preview
```

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 + Vite |
| Routing | React Router v6 |
| Styling | Vanilla CSS + Tailwind CSS |
| State | React Context API + localStorage |
| Maps | Leaflet.js |
| Images | Unsplash CDN |
| Icons | Inline SVG |
| Fonts | Google Fonts (Playfair Display, DM Sans) |

---

## 🔐 Authentication

- Passwords stored as `btoa()` encoded strings in `localStorage`
- User data keyed by `userId` to prevent cross-user data leakage
- All protected routes verified via `AuthContext.currentUser`
- Logout clears auth token and redirects to `/`

> ⚠️ For production: replace with a real backend API + JWT authentication

---

## 📋 Checklist Compliance

| Item | Status |
|------|--------|
| Vite project setup | ✅ |
| React Router (public + protected routes) | ✅ |
| Custom Hooks (useDebounce, useFetch, useStorage, usePageTitle) | ✅ |
| localStorage + sessionStorage | ✅ |
| Code splitting (React.lazy + Suspense) | ✅ |
| Error Boundary | ✅ |
| Toast Notifications | ✅ |
| Skeleton Loaders | ✅ |
| SEO (title, meta, OG, Twitter, Schema.org) | ✅ |
| Light/Dark mode | ✅ |
| Full CRUD (Trips, Bookings, Favorites, Emergency) | ✅ |
| Responsive design | ✅ |
| Clean folder structure | ✅ |

---

## 👨‍💻 Author

**Dhyey Patel** — Full Stack Developer  
GitHub: [@dhyeyptl10](https://github.com/dhyeyptl10)
