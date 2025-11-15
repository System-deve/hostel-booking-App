import express from 'express';
import { bookingController } from '../controllers/bookingController.js';
import { protect, checkOwnership } from '../middleware/auth.js';
import Booking from '../models/Booking.js';

const router = express.Router();

// Apply protect middleware to all routes
router.use(protect);

// GET /api/bookings - Get all bookings
router.get('/', bookingController.getBookings);

// GET /api/bookings/stats - Get booking statistics
router.get('/stats', bookingController.getBookingStats);

// GET /api/bookings/:id - Get single booking
router.get('/:id', checkOwnership(Booking), bookingController.getBooking);

// POST /api/bookings - Create new booking
router.post('/', bookingController.createBooking);

// PUT /api/bookings/:id - Update booking
router.put('/:id', checkOwnership(Booking), bookingController.updateBooking);

// PATCH /api/bookings/:id/status - Update booking status
router.patch('/:id/status', checkOwnership(Booking), bookingController.updateBookingStatus);

// PATCH /api/bookings/:id/payments - Add payment to booking
router.patch('/:id/payments', checkOwnership(Booking), bookingController.addPayment);

// DELETE /api/bookings/:id - Delete booking
router.delete('/:id', checkOwnership(Booking), bookingController.deleteBooking);

export default router;