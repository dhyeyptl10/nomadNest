const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Swagger Definition
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'WanderLust API',
      version: '1.0.0',
      description: 'API Documentation for WanderLust Travel Planner',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: [path.join(__dirname, './routes/*.js')],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// CORS — support Netlify frontend, Render preview, localhost, and custom domains
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5174',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith('.netlify.app') ||
      origin.endsWith('.onrender.com') ||
      origin.includes('localhost')
    ) {
      return callback(null, true);
    }
    return callback(null, true); // Permissive for API consumers
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

app.use(express.json());
app.use(morgan('dev'));

// Static folder for uploads
app.use('/uploads', express.static(uploadsDir));

// Database state tracking
let dbStatus = {
  connected: false,
  error: null,
  connectedAt: null,
};

// Health check & diagnostic endpoints
app.get('/', (req, res) => {
  res.json({
    name: 'WanderLust / NomadNest API',
    status: 'online',
    database: dbStatus.connected ? 'connected' : 'disconnected',
    dbError: dbStatus.error,
    environment: process.env.NODE_ENV || 'development',
    time: new Date().toISOString(),
  });
});

app.get('/api/health', (req, res) => {
  res.status(dbStatus.connected ? 200 : 503).json({
    status: dbStatus.connected ? 'healthy' : 'database_disconnected',
    database: dbStatus.connected ? 'connected' : 'disconnected',
    error: dbStatus.error,
    timestamp: new Date().toISOString(),
  });
});

// Middleware to check DB readiness for API routes
app.use('/api', (req, res, next) => {
  if (req.path === '/health') return next();
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      message: 'Database is not connected. Please verify MONGO_URI in your Render environment variables and MongoDB Atlas Network Access (0.0.0.0/0).',
      dbError: dbStatus.error,
    });
  }
  next();
});

// Routes
const authRoutes = require('./routes/authRoutes');
const tripRoutes = require('./routes/tripRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const emergencyRoutes = require('./routes/emergencyRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/emergency', emergencyRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});

// Global error handling
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  console.error('Server Error:', err.message);
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

// Listen on all network interfaces for Render compatibility
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  dbStatus.error = 'MONGO_URI is missing in environment variables';
  console.error('CRITICAL WARNING: MONGO_URI is not defined in environment variables!');
} else {
  mongoose.connect(mongoUri)
    .then(() => {
      dbStatus.connected = true;
      dbStatus.error = null;
      dbStatus.connectedAt = new Date().toISOString();
      console.log('MongoDB Connected successfully');
    })
    .catch((err) => {
      dbStatus.connected = false;
      dbStatus.error = err.message;
      console.error('MongoDB connection error:', err.message);
    });

  mongoose.connection.on('disconnected', () => {
    dbStatus.connected = false;
    dbStatus.error = 'MongoDB disconnected';
    console.warn('MongoDB connection lost');
  });

  mongoose.connection.on('reconnected', () => {
    dbStatus.connected = true;
    dbStatus.error = null;
    console.log('MongoDB reconnected');
  });
}
