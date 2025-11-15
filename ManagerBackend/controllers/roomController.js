import mongoose from 'mongoose';
import Room from '../models/Room.js';

export const roomController = {
  // @desc    Get all rooms for logged-in manager
  // @route   GET /api/rooms
  // @access  Private
  getRooms: async (req, res) => {
    try {
      const { 
        status, 
        roomType, 
        hostelName,
        page = 1, 
        limit = 10,
        search 
      } = req.query;

      // Build filter object
      const filter = { manager: req.user._id };
      
      if (status) filter.status = status;
      if (roomType) filter.roomType = roomType;
      if (hostelName) filter['hostelInfo.name'] = { $regex: hostelName, $options: 'i' };
      
      if (search) {
        filter.$or = [
          { roomNumber: { $regex: search, $options: 'i' } },
          { roomName: { $regex: search, $options: 'i' } },
          { 'hostelInfo.name': { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }

      const rooms = await Room.find(filter)
        .sort({ createdAt: -1 })
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
  },

  // @desc    Get room statistics
  // @route   GET /api/rooms/stats
  // @access  Private
  getRoomStats: async (req, res) => {
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
            partiallyOccupiedRooms: {
              $sum: {
                $cond: [{ $eq: ['$status', 'partially-occupied'] }, 1, 0]
              }
            },
            maintenanceRooms: {
              $sum: {
                $cond: [{ $eq: ['$status', 'maintenance'] }, 1, 0]
              }
            },
            totalRevenue: { 
              $sum: { 
                $multiply: ['$price', '$currentOccupancy'] 
              } 
            },
            averagePrice: { $avg: '$price' }
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
            capacity: { $sum: '$capacity' },
            averagePrice: { $avg: '$price' }
          }
        }
      ]);

      const hostelStats = await Room.aggregate([
        { $match: { manager: req.user._id } },
        {
          $group: {
            _id: '$hostelInfo.name',
            count: { $sum: 1 },
            occupancy: { $sum: '$currentOccupancy' },
            capacity: { $sum: '$capacity' }
          }
        }
      ]);

      res.json({
        success: true,
        data: {
          overview: stats[0] || {
            totalRooms: 0,
            totalCapacity: 0,
            totalOccupied: 0,
            availableRooms: 0,
            occupiedRooms: 0,
            partiallyOccupiedRooms: 0,
            maintenanceRooms: 0,
            totalRevenue: 0,
            averagePrice: 0
          },
          byType: typeStats,
          byHostel: hostelStats
        }
      });
    } catch (error) {
      console.error('Get room stats error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching room statistics'
      });
    }
  },

  // @desc    Get single room
  // @route   GET /api/rooms/:id
  // @access  Private
  getRoom: async (req, res) => {
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
  },

  // @desc    Create new room
  // @route   POST /api/rooms
  // @access  Private
  createRoom: async (req, res) => {
    try {
      // Add manager to room data
      const roomData = {
        ...req.body,
        manager: req.user._id
      };

      // Check if room number already exists for this manager in the same hostel
      const existingRoom = await Room.findOne({
        roomNumber: roomData.roomNumber,
        'hostelInfo.name': roomData.hostelInfo.name,
        manager: req.user._id
      });

      if (existingRoom) {
        return res.status(400).json({
          success: false,
          message: 'Room number already exists in this hostel'
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
  },

  // @desc    Update room
  // @route   PUT /api/rooms/:id
  // @access  Private
  updateRoom: async (req, res) => {
    try {
      let room = await Room.findOne({ 
        _id: req.params.id, 
        manager: req.user._id 
      });

      if (!room) {
        return res.status(404).json({
          success: false,
          message: 'Room not found'
        });
      }

      // Check if updating room number would cause duplicate
      if (req.body.roomNumber && req.body.roomNumber !== room.roomNumber) {
        const duplicateRoom = await Room.findOne({
          roomNumber: req.body.roomNumber,
          'hostelInfo.name': room.hostelInfo.name,
          manager: req.user._id,
          _id: { $ne: req.params.id }
        });

        if (duplicateRoom) {
          return res.status(400).json({
            success: false,
            message: 'Room number already exists in this hostel'
          });
        }
      }

      room = await Room.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

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
  },

  // @desc    Update room occupancy
  // @route   PATCH /api/rooms/:id/occupancy
  // @access  Private
  updateRoomOccupancy: async (req, res) => {
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

      if (occupancy < 0 || occupancy > room.capacity) {
        return res.status(400).json({
          success: false,
          message: `Occupancy must be between 0 and ${room.capacity}`
        });
      }

      room.currentOccupancy = occupancy;
      
      // Update status based on occupancy
      if (occupancy === 0) {
        room.status = 'available';
      } else if (occupancy === room.capacity) {
        room.status = 'occupied';
      } else {
        room.status = 'partially-occupied';
      }

      await room.save();

      res.json({
        success: true,
        data: room,
        message: 'Room occupancy updated successfully'
      });
    } catch (error) {
      console.error('Update occupancy error:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating room occupancy'
      });
    }
  },

  // @desc    Set room to maintenance
  // @route   PATCH /api/rooms/:id/maintenance
  // @access  Private
  setRoomMaintenance: async (req, res) => {
    try {
      const { reason, expectedCompletion, cost, notes } = req.body;
      
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

      room.status = 'maintenance';
      room.maintenance = {
        required: true,
        reason,
        startDate: new Date(),
        expectedCompletion: expectedCompletion ? new Date(expectedCompletion) : undefined,
        cost: cost || 0,
        notes: notes || ''
      };

      await room.save();

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
  },

  // @desc    Clear room maintenance
  // @route   PATCH /api/rooms/:id/clear-maintenance
  // @access  Private
  clearRoomMaintenance: async (req, res) => {
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

      room.status = 'available';
      room.maintenance = {
        required: false,
        reason: '',
        startDate: null,
        expectedCompletion: null,
        cost: 0,
        notes: ''
      };

      await room.save();

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
  },

  // @desc    Add tenant to room
  // @route   POST /api/rooms/:id/tenants
  // @access  Private
  addTenant: async (req, res) => {
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

      if (room.currentOccupancy >= room.capacity) {
        return res.status(400).json({
          success: false,
          message: 'Room is at full capacity'
        });
      }

      // Create tenant logic here
      // You'll need to import Tenant model and create tenant
      res.json({
        success: true,
        message: 'Tenant added successfully'
      });
    } catch (error) {
      console.error('Add tenant error:', error);
      res.status(500).json({
        success: false,
        message: 'Error adding tenant'
      });
    }
  },

  // @desc    Remove tenant from room
  // @route   DELETE /api/rooms/:roomId/tenants/:tenantId
  // @access  Private
  removeTenant: async (req, res) => {
    try {
      const room = await Room.findOne({ 
        _id: req.params.roomId, 
        manager: req.user._id 
      });

      if (!room) {
        return res.status(404).json({
          success: false,
          message: 'Room not found'
        });
      }

      // Remove tenant logic here
      res.json({
        success: true,
        message: 'Tenant removed successfully'
      });
    } catch (error) {
      console.error('Remove tenant error:', error);
      res.status(500).json({
        success: false,
        message: 'Error removing tenant'
      });
    }
  },

  // @desc    Upload room images
  // @route   POST /api/rooms/:id/images
  // @access  Private
  uploadImages: async (req, res) => {
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

      const { images } = req.body;

      if (!images || !Array.isArray(images)) {
        return res.status(400).json({
          success: false,
          message: 'Images array is required'
        });
      }

      room.images = [...room.images, ...images];
      
      if (!room.primaryImage && room.images.length > 0) {
        room.primaryImage = room.images[0];
      }

      await room.save();

      res.json({
        success: true,
        data: room.images,
        message: 'Images uploaded successfully'
      });
    } catch (error) {
      console.error('Upload images error:', error);
      res.status(500).json({
        success: false,
        message: 'Error uploading images'
      });
    }
  },

  // @desc    Delete room
  // @route   DELETE /api/rooms/:id
  // @access  Private
  deleteRoom: async (req, res) => {
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

      // Add check for tenants before deletion
      if (room.currentOccupancy > 0) {
        return res.status(400).json({
          success: false,
          message: 'Cannot delete room with tenants'
        });
      }

      await Room.findByIdAndDelete(req.params.id);

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
  }
};