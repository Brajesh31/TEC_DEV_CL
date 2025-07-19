import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';

// Import routes
import authRoutes from './routes/auth.js';
import eventRoutes from './routes/events.js';
import rsvpRoutes from './routes/rsvp.js';
import communityRoutes from './routes/community.js';
import emailRoutes from './routes/email.js';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // In development, allow any localhost or 127.0.0.1 origin
    if (process.env.NODE_ENV !== 'production') {
      if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
        return callback(null, true);
      }
    }
    
    // Production allowed origins
    const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:3000'
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Default route for root URL
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🚀 Tech Dev Club Backend is Live!',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      events: '/api/event',
      rsvp: '/api/rsvp',
      community: '/api/community',
      email: '/api/email'
    },
    documentation: {
      swagger: '/api/docs',
      postman: '/api/postman'
    },
    contact: {
      email: 'techdevclub2025@gmail.com',
      discord: 'https://discord.gg/6MVn2N9q',
      whatsapp: 'https://chat.whatsapp.com/HtpadPkjf1S44FK7sTZMu4',
      linkedin: 'https://www.linkedin.com/company/tech-dev-club/',
      instagram: 'https://www.instagram.com/techdevclub'
    }
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/event', eventRoutes);
app.use('/api/rsvp', rsvpRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/email', emailRoutes);

// Enhanced health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Tech Dev Club API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB'
    },
    version: '1.0.0',
    status: 'healthy',
    contact: {
      email: 'techdevclub2025@gmail.com',
      discord: 'https://discord.gg/6MVn2N9q'
    }
  });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
    path: req.path,
    method: req.method,
    availableEndpoints: [
      '/api/health',
      '/api/auth',
      '/api/event',
      '/api/rsvp',
      '/api/community',
      '/api/email'
    ]
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API Health: http://localhost:${PORT}/api/health`);
  console.log(`🏠 Root URL: http://localhost:${PORT}/`);
  console.log(`📚 Available endpoints:`);
  console.log(`   - GET  /               (Welcome message)`);
  console.log(`   - GET  /api/health     (Health check)`);
  console.log(`   - POST /api/auth/*     (Authentication)`);
  console.log(`   - GET  /api/events     (Events)`);
  console.log(`   - POST /api/rsvp       (RSVP)`);
  console.log(`   - GET  /api/community  (Community)`);
  console.log(`   - POST /api/email/*    (Email services)`);
});

export default app;