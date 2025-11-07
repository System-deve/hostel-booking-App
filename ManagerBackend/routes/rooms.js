const express = require('express');
const Room = require('../models/Room');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes are protected - manager must be logged in
router.use(protect);

// @desc    Get all rooms for logged-in manager with filtering
// @route   GET /api/rooms
// @access  Private
router.get('/', async (req, res) => {
  try {
    const { 
      status, 
      roomType, 
      floor, 
      minPrice, 
      maxPrice,
      search,
      page = 1,
      limit = 10
    } = req.query;

    // Build filter object
    const filter = { manager: req.user._id };
    
    if (status) filter.status = status;
    if (roomType) filter.roomType = roomType;
    if (floor) filter.floorNumber = parseInt(floor);
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseInt(minPrice);
      if (maxPrice) filter.price.$lte = parseInt(maxPrice);
    }
    
    if (search) {
      filter.$or = [
        { roomNumber: { $regex: search, $options: 'i' } },
        { roomName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const rooms = await Room.find(filter)
      .sort({ floorNumber: 1, roomNumber: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Room.countDocuments(filter);

    res.json({
      success: true,
      count: rooms.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: rooms
    });
  } catch (error) {
    console.error('Get rooms error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching rooms'
    });
  }
});

// @desc    Get room statistics
// @route   GET /api/rooms/stats
// @access  Private
router.get('/stats', async (req, res) => {
  try {
    const stats = await Room.aggregate([
      { $match: { manager: req.user._id } },
      {
        $group: {
          _id: null,
          totalRooms: { $sum: 1 },
          totalCapacity: { $sum: '$capacity' },
          totalOccupied: { $sum: '$currentOccupancy' },
          availableRooms: {
            $sum: {
              $cond: [{ $eq: ['$status', 'available'] }, 1, 0]
            }
          },
          occupiedRooms: {
            $sum: {
              $cond: [{ $eq: ['$status', 'occupied'] }, 1, 0]
            }
          },
          maintenanceRooms: {
            $sum: {
              $cond: [{ $eq: ['$status', 'maintenance'] }, 1, 0]
            }
          },
          averagePrice: { $avg: '$price' },
          totalRevenue: { $sum: { $multiply: ['$price', '$currentOccupancy'] } }
        }
      }
    ]);

    const typeStats = await Room.aggregate([
      { $match: { manager: req.user._id } },
      {
        $group: {
          _id: '$roomType',
          count: { $sum: 1 },
          occupancy: { $sum: '$currentOccupancy' },
          capacity: { $sum: '$capacity' }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        overview: stats[0] || {},
        byType: typeStats
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics'
    });
  }
});

// @desc    Get single room
// @route   GET /api/rooms/:id
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findOne({ 
      _id: req.params.id, 
      manager: req.user._id 
    });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }

    res.json({
      success: true,
      data: room
    });
  } catch (error) {
    console.error('Get room error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching room'
    });
  }
});

// @desc    Create new room
// @route   POST /api/rooms
// @access  Private
router.post('/', async (req, res) => {
  try {
    // Add the manager ID to the room data
    const roomData = {
      ...req.body,
      manager: req.user._id
    };

    // Check if room number already exists for this manager
    const existingRoom = await Room.findOne({
      roomNumber: roomData.roomNumber,
      manager: req.user._id
    });

    if (existingRoom) {
      return res.status(400).json({
        success: false,
        message: 'Room number already exists'
      });
    }

    const room = await Room.create(roomData);

    res.status(201).json({
      success: true,
      data: room,
      message: 'Room created successfully'
    });
  } catch (error) {
    console.error('Create room error:', error);
    
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
      message: 'Error creating room'
    });
  }
});

// @desc    Update room
// @route   PUT /api/rooms/:id
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const room = await Room.findOneAndUpdate(
      { _id: req.params.id, manager: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }

    res.json({
      success: true,
      data: room,
      message: 'Room updated successfully'
    });
  } catch (error) {
    console.error('Update room error:', error);
    
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
      message: 'Error updating room'
    });
  }
});

// @desc    Update room occupancy
// @route   PATCH /api/rooms/:id/occupancy
// @access  Private
router.patch('/:id/occupancy', async (req, res) => {
  try {
    const { occupancy } = req.body;
    
    const room = await Room.findOne({ 
      _id: req.params.id, 
      manager: req.user._id 
    });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }

    await room.updateOccupancy(occupancy);

    res.json({
      success: true,
      data: room,
      message: 'Room occupancy updated successfully'
    });
  } catch (error) {
    console.error('Update occupancy error:', error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Set room to maintenance
// @route   PATCH /api/rooms/:id/maintenance
// @access  Private
router.patch('/:id/maintenance', async (req, res) => {
  try {
    const { reason, startDate, expectedCompletion } = req.body;
    
    const room = await Room.findOne({ 
      _id: req.params.id, 
      manager: req.user._id 
    });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }

    await room.setMaintenance(reason, startDate, expectedCompletion);

    res.json({
      success: true,
      data: room,
      message: 'Room set to maintenance successfully'
    });
  } catch (error) {
    console.error('Set maintenance error:', error);
    res.status(500).json({
      success: false,
      message: 'Error setting room to maintenance'
    });
  }
});

// @desc    Clear room maintenance
// @route   PATCH /api/rooms/:id/clear-maintenance
// @access  Private
router.patch('/:id/clear-maintenance', async (req, res) => {
  try {
    const room = await Room.findOne({ 
      _id: req.params.id, 
      manager: req.user._id 
    });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }

    await room.clearMaintenance();

    res.json({
      success: true,
      data: room,
      message: 'Room maintenance cleared successfully'
    });
  } catch (error) {
    console.error('Clear maintenance error:', error);
    res.status(500).json({
      success: false,
      message: 'Error clearing room maintenance'
    });
  }
});

// @desc    Delete room
// @route   DELETE /api/rooms/:id
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const room = await Room.findOneAndDelete({ 
      _id: req.params.id, 
      manager: req.user._id 
    });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }

    res.json({
      success: true,
      message: 'Room deleted successfully'
    });
  } catch (error) {
    console.error('Delete room error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting room'
    });
  }
});

module.exports = router;