import jwt from 'jsonwebtoken';
import User from '../Models/User.js';
import { AppError } from '../utils/errorHandler.js';
import { sendSuccess } from '../utils/responseHelper.js';

// Generate JWT Token
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '7d'
    });
};

// Register
export const register = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, confirmPassword } = req.body;

        // Validation
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return next(new AppError('Please provide all required fields', 400));
        }

        if (password !== confirmPassword) {
            return next(new AppError('Passwords do not match', 400));
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new AppError('Email already in use', 400));
        }

        // Create user
        const user = await User.create({
            firstName,
            lastName,
            email,
            password
        });

        // Generate token
        const token = generateToken(user._id, user.role);

        sendSuccess(res, {
            token,
            user: user.toJSON()
        }, 'User registered successfully', 201);
    } catch (error) {
        next(error);
    }
};

// Login
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return next(new AppError('Please provide email and password', 400));
        }

        // Check for user (include password field)
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return next(new AppError('Invalid credentials', 401));
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return next(new AppError('Invalid credentials', 401));
        }

        // Generate token
        const token = generateToken(user._id, user.role);

        sendSuccess(res, {
            token,
            user: user.toJSON()
        }, 'Login successful');
    } catch (error) {
        next(error);
    }
};

// Get current user
export const getCurrentUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return next(new AppError('User not found', 404));
        }

        sendSuccess(res, { user });
    } catch (error) {
        next(error);
    }
};

// Update profile
export const updateProfile = async (req, res, next) => {
    try {
        const { firstName, lastName, phone, profileImage } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { firstName, lastName, phone, profileImage },
            { new: true, runValidators: true }
        );

        if (!user) {
            return next(new AppError('User not found', 404));
        }

        sendSuccess(res, { user }, 'Profile updated successfully');
    } catch (error) {
        next(error);
    }
};

// Logout (frontend will handle token removal)
export const logout = async (req, res, next) => {
    try {
        sendSuccess(res, {}, 'Logout successful');
    } catch (error) {
        next(error);
    }
};