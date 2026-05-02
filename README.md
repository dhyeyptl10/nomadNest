# 🌍 NomadNest — Premium Travel Planning Platform

> A full-featured, industry-ready travel planning web application built with the MERN stack (MongoDB, Express, React, Node.js), featuring authentication, CRUD operations, and a polished premium UI.

---

## 🚀 Live Preview

- **🌐 Live Demo (Netlify):** [https://nomadnesttt.netlify.app/](https://nomadnesttt.netlify.app/)
- **🛠️ Backend API (Render):** [https://nomadnest-x4an.onrender.com/](https://nomadnest-x4an.onrender.com/)
- **📖 API Documentation:** [https://nomadnest-x4an.onrender.com/api-docs/](https://nomadnest-x4an.onrender.com/api-docs/)
- **🎨 Figma Design:** [https://ream-plow-46277508.figma.site/](https://ream-plow-46277508.figma.site/)

---

## ✨ Features

### Core
- 🔐 **Authentication** — JWT-based Register, Sign-in, and Profile management
- 🗺️ **Trip Management** — Full CRUD (Create, Read, Update, Delete) for journeys
- 📅 **Bookings** — Track flights, hotels, and activities with API integration
- ❤️ **Favorites** — Save and manage dream destinations
- 🆘 **Emergency** — SOS contacts, live map, and emergency alert system
- 🎨 **Travel Style Quiz** — Personality quiz with destination matching logic
- 🌙 **Light/Dark Mode** — Theme persisted across sessions

### Technical
- ⚡ **Code Splitting** — All 12 pages lazy-loaded for peak performance
- 🛡️ **Error Boundary** — Global error handling with a friendly fallback UI
- 🔔 **MUI Integration** — Tooltips, Badges, and Loaders from Material UI
- 📊 **Analytics** — Custom event tracking and page view monitoring
- 🔍 **SEO** — Dynamic titles, meta tags, and generated `sitemap.xml`
- 📚 **Swagger UI** — Fully interactive API documentation

---

## 📁 Folder Structure

```
wanderlust/
├── frontend/               # React + Vite application
│   ├── public/             # Static assets & sitemap.xml
│   └── src/
│       ├── components/     # Reusable UI components (Sidebar, Topbar, etc.)
│       ├── context/        # Theme & Toast state management
│       ├── services/       # Axios API integration & Analytics
│       ├── store/          # Redux Toolkit slices (Auth, Trips, etc.)
│       └── pages/          # Lazy-loaded page components
└── backend/                # Node.js + Express API
    ├── models/             # MongoDB Schemas (User, Trip, etc.)
    ├── routes/             # API Endpoints (Auth, Trips, Uploads)
    ├── middleware/         # JWT Auth & Error handlers
    └── server.js           # Server entry point & Swagger config
```

---

## 🛠️ Setup & Installation

### Prerequisites
- Node.js ≥ 18
- MongoDB Atlas Account
- npm ≥ 9

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/dhyeyptl10/nomadNest.git
cd nomadNest

# 2. Setup Backend
cd backend
npm install
# Create .env with MONGO_URI, JWT_SECRET, PORT
npm start

# 3. Setup Frontend
cd ../frontend
npm install
# Create .env with VITE_API_URL
npm run dev
```

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18 + Vite |
| **State Management** | Redux Toolkit |
| **Styling** | Tailwind CSS + Material UI |
| **Backend** | Node.js + Express |
| **Database** | MongoDB Atlas |
| **Authentication** | JWT (JSON Web Tokens) |
| **Documentation** | Swagger / OpenAPI 3.0 |
| **Deployment** | Render (Backend) + Netlify (Frontend) |

---

## 📋 Checklist Compliance

| Item | Status |
|------|--------|
| Vite + Tailwind + MUI setup | ✅ |
| Redux Toolkit State Management | ✅ |
| JWT Authentication System | ✅ |
| Full CRUD Operations | ✅ |
| Interactive API Documentation | ✅ |
| SEO (Helmet + Sitemap) | ✅ |
| Analytics Tracking | ✅ |
| Code splitting & Error Boundary | ✅ |
| Light/Dark mode | ✅ |
| Live Production Deployment | ✅ |

---

## 👨‍💻 Author

**Dhyey Patel** — Full Stack Developer  
GitHub: [@dhyeyptl10](https://github.com/dhyeyptl10)
LinkedIn: [Dhyey Patel](https://linkedin.com/in/dhyey-patel)
