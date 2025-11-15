import Booking from '../models/Booking.js';
import Tenant from '../models/Tenant.js';
import Room from '../models/Room.js';

export const bookingController = {
  // Get all bookings for manager
  getBookings: async (req, res) => {
    try {
      const { 
        status, 
        paymentStatus, 
        page = 1, 
        limit = 10,
        search 
      } = req.query;

      const filter = { manager: req.user._id };
      
      if (status) filter.bookingStatus = status;
      if (paymentStatus) filter.paymentStatus = paymentStatus;
      
      if (search) {
        filter.$or = [
          { specialRequirements: { $regex: search, $options: 'i' } },
          { notes: { $regex: search, $options: 'i' } }
        ];
      }

      const bookings = await Booking.find(filter)
        .populate('tenant', 'name email phone idNumber')
        .populate('room', 'roomNumber roomName hostelInfo.name price')
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await Booking.countDocuments(filter);

      res.json({
        success: true,
        data: bookings,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(total / limit),
          results: bookings.length,
          totalBookings: total
        }
      });
    } catch (error) {
      console.error('Get bookings error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching bookings'
      });
    }
  },

  // Get single booking
  getBooking: async (req, res) => {
    try {
      const booking = await Booking.findOne({ 
        _id: req.params.id, 
        manager: req.user._id 
      })
      .populate('tenant', 'name email phone idNumber emergencyContact')
      .populate('room', 'roomNumber roomName hostelInfo.name price capacity amenities');

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: 'Booking not found'
        });
      }

      res.json({
        success: true,
        data: booking
      });
    } catch (error) {
      console.error('Get booking error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching booking'
      });
    }
  },

  // Create new booking
  createBooking: async (req, res) => {
    try {
      const { tenantId, roomId, checkInDate, checkOutDate, totalAmount, securityDeposit, specialRequirements, notes } = req.body;

      // Verify tenant and room belong to manager
      const tenant = await Tenant.findOne({ _id: tenantId, manager: req.user._id });
      if (!tenant) {
        return res.status(404).json({
          success: false,
          message: 'Tenant not found'
        });
      }

      const room = await Room.findOne({ _id: roomId, manager: req.user._id });
      if (!room) {
        return res.status(404).json({
          success: false,
          message: 'Room not found'
        });
      }

      // Check if room is available for the dates
      const conflictingBooking = await Booking.findOne({
        room: roomId,
        bookingStatus: { $in: ['confirmed', 'active'] },
        $or: [
          { 
            checkInDate: { $lte: new Date(checkOutDate) },
            checkOutDate: { $gte: new Date(checkInDate) }
          }
        ]
      });

      if (conflictingBooking) {
        return res.status(400).json({
          success: false,
          message: 'Room is not available for the selected dates'
        });
      }

      const booking = await Booking.create({
        tenant: tenantId,
        room: roomId,
        checkInDate,
        checkOutDate,
        totalAmount,
        securityDeposit: securityDeposit || 0,
        specialRequirements,
        notes,
        manager: req.user._id
      });

      await booking.populate('tenant', 'name email phone');
      await booking.populate('room', 'roomNumber roomName hostelInfo.name');

      res.status(201).json({
        success: true,
        data: booking,
        message: 'Booking created successfully'
      });
    } catch (error) {
      console.error('Create booking error:', error);
      
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(val => val.message);
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: messages
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error creating booking'
      });
    }
  },

  // Update booking
  updateBooking: async (req, res) => {
    try {
      const booking = await Booking.findOne({ 
        _id: req.params.id, 
        manager: req.user._id 
      });

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: 'Booking not found'
        });
      }

      // Don't allow updating certain fields directly
      const { tenant, room, manager, ...updateData } = req.body;

      const updatedBooking = await Booking.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
      )
      .populate('tenant', 'name email phone')
      .populate('room', 'roomNumber roomName hostelInfo.name');

      res.json({
        success: true,
        data: updatedBooking,
        message: 'Booking updated successfully'
      });
    } catch (error) {
      console.error('Update booking error:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating booking'
      });
    }
  },

  // Update booking status
  updateBookingStatus: async (req, res) => {
    try {
      const { status } = req.body;
      const booking = await Booking.findOne({ 
        _id: req.params.id, 
        manager: req.user._id 
      });

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: 'Booking not found'
        });
      }

      booking.bookingStatus = status;
      
      // Set actual dates based on status
      if (status === 'active' && !booking.actualCheckIn) {
        booking.actualCheckIn = new Date();
      } else if (status === 'completed' && !booking.actualCheckOut) {
        booking.actualCheckOut = new Date();
      }

      await booking.save();
      await booking.populate('tenant', 'name email phone');
      await booking.populate('room', 'roomNumber roomName hostelInfo.name');

      res.json({
        success: true,
        data: booking,
        message: 'Booking status updated successfully'
      });
    } catch (error) {
      console.error('Update booking status error:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating booking status'
      });
    }
  },

  // Add payment to booking
  addPayment: async (req, res) => {
    try {
      const { amount } = req.body;
      const booking = await Booking.findOne({ 
        _id: req.params.id, 
        manager: req.user._id 
      });

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: 'Booking not found'
        });
      }

      const paymentAmount = parseFloat(amount);
      booking.amountPaid += paymentAmount;

      // Update payment status
      if (booking.amountPaid >= booking.totalAmount) {
        booking.paymentStatus = 'paid';
      } else if (booking.amountPaid > 0) {
        booking.paymentStatus = 'partial';
      }

      await booking.save();
      await booking.populate('tenant', 'name email phone');
      await booking.populate('room', 'roomNumber roomName hostelInfo.name');

      res.json({
        success: true,
        data: booking,
        message: 'Payment added successfully'
      });
    } catch (error) {
      console.error('Add payment error:', error);
      res.status(500).json({
        success: false,
        message: 'Error adding payment'
      });
    }
  },

  // Delete booking
  deleteBooking: async (req, res) => {
    try {
      const booking = await Booking.findOne({ 
        _id: req.params.id, 
        manager: req.user._id 
      });

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: 'Booking not found'
        });
      }

      // Only allow deletion of pending or cancelled bookings
      if (!['pending', 'cancelled'].includes(booking.bookingStatus)) {
        return res.status(400).json({
          success: false,
          message: 'Cannot delete confirmed or active bookings'
        });
      }

      await Booking.findByIdAndDelete(req.params.id);

      res.json({
        success: true,
        message: 'Booking deleted successfully'
      });
    } catch (error) {
      console.error('Delete booking error:', error);
      res.status(500).json({
        success: false,
        message: 'Error deleting booking'
      });
    }
  },

  // Get booking statistics
  getBookingStats: async (req, res) => {
    try {
      const stats = await Booking.aggregate([
        { $match: { manager: req.user._id } },
        {
          $group: {
            _id: null,
            totalBookings: { $sum: 1 },
            totalRevenue: { $sum: '$totalAmount' },
            totalCollected: { $sum: '$amountPaid' },
            pendingBookings: {
              $sum: { $cond: [{ $eq: ['$bookingStatus', 'pending'] }, 1, 0] }
            },
            confirmedBookings: {
              $sum: { $cond: [{ $eq: ['$bookingStatus', 'confirmed'] }, 1, 0] }
            },
            activeBookings: {
              $sum: { $cond: [{ $eq: ['$bookingStatus', 'active'] }, 1, 0] }
            },
            completedBookings: {
              $sum: { $cond: [{ $eq: ['$bookingStatus', 'completed'] }, 1, 0] }
            }
          }
        }
      ]);

      const paymentStats = await Booking.aggregate([
        { $match: { manager: req.user._id } },
        {
          $group: {
            _id: '$paymentStatus',
            count: { $sum: 1 },
            totalAmount: { $sum: '$totalAmount' },
            totalPaid: { $sum: '$amountPaid' }
          }
        }
      ]);

      res.json({
        success: true,
        data: {
          overview: stats[0] || {
            totalBookings: 0,
            totalRevenue: 0,
            totalCollected: 0,
            pendingBookings: 0,
            confirmedBookings: 0,
            activeBookings: 0,
            completedBookings: 0
          },
          paymentStats
        }
      });
    } catch (error) {
      console.error('Get booking stats error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching booking statistics'
      });
    }
  }
};