import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';

// Import routes
import authRoutes from './routes/auth.js';
import roomRoutes from './routes/rooms.js';
import tenantRoutes from './routes/tenants.js';
import paymentRoutes from './routes/payments.js';
import bookingRoutes from './routes/bookings.js';
import maintenanceRoutes from './routes/maintenance.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/maintenance', maintenanceRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: '🏠 Hostel Manager API is running!',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: '/api/auth',
      rooms: '/api/rooms',
      tenants: '/api/tenants',
      bookings: '/api/bookings',
      payments: '/api/payments',
      maintenance: '/api/maintenance'
    }
  });
});

// Health check route
app.get('/api/health', (req, res) => {
  import('mongoose').then(mongoose => {
    const dbStatus = mongoose.default.connection.readyState;
    
    const statusMessages = {
      0: 'disconnected',
      1: 'connected', 
      2: 'connecting',
      3: 'disconnecting'
    };

    res.json({
      status: 'healthy',
      database: statusMessages[dbStatus],
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`📍 API URL: http://localhost:${PORT}`);
  console.log('📡 Available routes:');
  console.log('   GET  /              - API status');
  console.log('   GET  /api/health    - Health check');
  console.log('   POST /api/auth/register - Register manager');
  console.log('   POST /api/auth/login    - Login manager');
  console.log('   GET  /api/auth/me       - Get current manager');
  console.log('   GET  /api/rooms         - Get manager rooms');
  console.log('   POST /api/rooms         - Create room');
  console.log('   PUT  /api/rooms/:id     - Update room');
  console.log('   DEL  /api/rooms/:id     - Delete room');
});

export default app;