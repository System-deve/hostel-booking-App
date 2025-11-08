import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; 

const router = express.Router();

const JWT_SECRET = (typeof globalThis !== 'undefined' && globalThis.process && globalThis.process.env && globalThis.process.env.JWT_SECRET)
  ? globalThis.process.env.JWT_SECRET
  : 'dev-secret-change-me';

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already in use' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ fullName, email, password: hashedPassword });

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: newUser._id, fullName, email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, fullName: user.fullName, email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
