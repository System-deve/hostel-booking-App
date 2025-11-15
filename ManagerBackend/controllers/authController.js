import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

export const authController = {
  // Register new hostel manager
  register: async (req, res) => {
    try {
     let { fullName, email, password, phone, address, businessName, businessType } = req.body;

// Trim string fields safely (only if they exist)
fullName = fullName?.trim();
email = email?.toLowerCase().trim();
password = password?.trim();
phone = phone?.trim();
businessName = businessName?.trim();
businessType = businessType?.trim();


      // Check if user exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({
          success: false,
          message: 'Email already registered'
        });
      }

   // Create user - hashing will be done automatically by the schema
const user = await User.create({
  fullName,
  email,
  password,
  phone,
  address,
  businessName,
  businessType
});


      // Generate token
      const token = generateToken(user._id);

      res.status(201).json({
        success: true,
        data: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          address: user.address,
          businessName: user.businessName,
          businessType: user.businessType,
          subscription: user.subscription,
          token
        },
        message: 'Hostel manager account created successfully'
      });

    } catch (error) {
      console.error('Registration error:', error);
      
      // FIXED: Add duplicate email error handling
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: 'Email already registered'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Server error during registration'
      });
    }
  },

  // Login hostel manager
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if user exists
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }



      // In your login controller - use the method from your User model
const isMatch = await user.matchPassword(password);
if (!isMatch) {
  return res.status(401).json({
    success: false,
    message: 'Invalid credentials'
  });
}

const token = generateToken(user._id);
      // FIXED: Use bcrypt.compare instead of matchPassword
  /*  const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      const token = generateToken(user._id);*/

      res.json({
        success: true,
        data: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          address: user.address,
          businessName: user.businessName,
          businessType: user.businessType,
          subscription: user.subscription,
          token
        },
        message: 'Login successful'
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error during login'
      });
    }
  },

  // Get current user profile
  getMe: async (req, res) => {
    try {
      res.json({
        success: true,
        data: req.user
      });
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching user profile'
      });
    }
  },

  // Update user profile
  updateProfile: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.user._id,
        req.body,
        { new: true, runValidators: true }
      ).select('-password');

      res.json({
        success: true,
        data: user,
        message: 'Profile updated successfully'
      });
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating profile'
      });
    }
  }
};