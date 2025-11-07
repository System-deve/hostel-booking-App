// test-connection.js
const mongoose = require('mongoose');
require('dotenv').config();

console.log('🧪 Testing MongoDB Connection...');

async function testConnection() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('✅ SUCCESS! Connected to MongoDB');
    console.log('📊 Database:', mongoose.connection.name);
    
    // Close connection
    await mongoose.connection.close();
    console.log('🔌 Connection closed');
    
  } catch (error) {
    console.log('❌ FAILED:', error.message);
  }
}

testConnection();