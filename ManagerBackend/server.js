const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: '🏠 Hostel Manager API is running!',
    database: 'Connected to MongoDB Atlas',
    timestamp: new Date().toISOString()
  });
});

// Health check route
app.get('/api/health', (req, res) => {
  const mongoose = require('mongoose');
  const dbStatus = mongoose.connection.readyState;
  
  const statusMessages = {
    0: 'disconnected',
    1: 'connected', 
    2: 'connecting',
    3: 'disconnecting'
  };

  res.json({
    status: 'healthy',
    database: statusMessages[dbStatus],
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(`📍 API URL: http://localhost:${PORT}`);
  console.log('📡 Available routes:');
  console.log('   GET  /              - API status');
  console.log('   GET  /api/health    - Health check');
  console.log('   POST /api/auth/register - Register user');
  console.log('   GET  /api/auth/users    - List users');
});