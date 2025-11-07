// test-user.js
require('dotenv').config();
const mongoose = require('mongoose');

// Import the User model
const User = require('./models/User');

async function testUser() {
  try {
    console.log('🔗 Connecting to database...');
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('👤 Creating test user...');
    
    // Create a test user (YOU - the hostel manager!)
    const user = await User.create({
      fullName: "Stone Ssewante",
      email: "ssewante@hostel.com",
      password: "password123",
      phone: "+256712345678",
      address: "Kampala, Uganda"
    });
    
    console.log('🎉 SUCCESS! Your first user created in MongoDB!');
    console.log('==============================================');
    console.log('User ID:', user._id);
    console.log('Name:', user.fullName);
    console.log('Email:', user.email);
    console.log('Phone:', user.phone);
    console.log('Created at:', user.createdAt);
    console.log('==============================================');
    
    // Close connection
    await mongoose.connection.close();
    console.log('🔌 Connection closed');
    
  } catch (error) {
    console.log('❌ Error:', error.message);
    
    if (error.code === 11000) {
      console.log('💡 User already exists with this email');
    }
  }
}

testUser();