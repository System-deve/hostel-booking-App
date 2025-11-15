import Maintenance from '../models/Maintenance.js';
import Room from '../models/Room.js';

export const maintenanceController = {
  // Get all maintenance requests for manager
  getMaintenanceRequests: async (req, res) => {
    try {
      const { 
        status, 
        priority, 
        category,
        page = 1, 
        limit = 10 
      } = req.query;

      const filter = { manager: req.user._id };
      
      if (status) filter.status = status;
      if (priority) filter.priority = priority;
      if (category) filter.category = category;

      const maintenanceRequests = await Maintenance.find(filter)
        .populate('room', 'roomNumber roomName hostelInfo.name')
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await Maintenance.countDocuments(filter);

      res.json({
        success: true,
        data: maintenanceRequests,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(total / limit),
          results: maintenanceRequests.length,
          totalRequests: total
        }
      });
    } catch (error) {
      console.error('Get maintenance requests error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching maintenance requests'
      });
    }
  },

  // Get single maintenance request
  getMaintenanceRequest: async (req, res) => {
    try {
      const maintenance = await Maintenance.findOne({ 
        _id: req.params.id, 
        manager: req.user._id 
      }).populate('room', 'roomNumber roomName hostelInfo.name capacity');

      if (!maintenance) {
        return res.status(404).json({
          success: false,
          message: 'Maintenance request not found'
        });
      }

      res.json({
        success: true,
        data: maintenance
      });
    } catch (error) {
      console.error('Get maintenance request error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching maintenance request'
      });
    }
  },

  // Create new maintenance request
  createMaintenanceRequest: async (req, res) => {
    try {
      const { 
        title, 
        description, 
        priority, 
        category, 
        roomId, 
        specificLocation, 
        reportedBy, 
        reporterPhone, 
        reporterEmail, 
        notes, 
        images 
      } = req.body;

      // Verify room belongs to manager
      const room = await Room.findOne({ _id: roomId, manager: req.user._id });
      if (!room) {
        return res.status(404).json({
          success: false,
          message: 'Room not found'
        });
      }

      const maintenance = await Maintenance.create({
        title,
        description,
        priority: priority || 'medium',
        category,
        room: roomId,
        specificLocation,
        reportedBy,
        reporterPhone,
        reporterEmail,
        notes,
        images: images || [],
        manager: req.user._id
      });

      await maintenance.populate('room', 'roomNumber roomName hostelInfo.name');

      res.status(201).json({
        success: true,
        data: maintenance,
        message: 'Maintenance request created successfully'
      });
    } catch (error) {
      console.error('Create maintenance request error:', error);
      
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
        message: 'Error creating maintenance request'
      });
    }
  },

  // Update maintenance request
  updateMaintenanceRequest: async (req, res) => {
    try {
      const maintenance = await Maintenance.findOne({ 
        _id: req.params.id, 
        manager: req.user._id 
      });

      if (!maintenance) {
        return res.status(404).json({
          success: false,
          message: 'Maintenance request not found'
        });
      }

      // Don't allow updating certain fields directly
      const { room, manager, ...updateData } = req.body;

      const updatedMaintenance = await Maintenance.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
      ).populate('room', 'roomNumber roomName hostelInfo.name');

      res.json({
        success: true,
        data: updatedMaintenance,
        message: 'Maintenance request updated successfully'
      });
    } catch (error) {
      console.error('Update maintenance request error:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating maintenance request'
      });
    }
  },

  // Update maintenance status
  updateMaintenanceStatus: async (req, res) => {
    try {
      const { status, assignedTo, estimatedCost, actualCost, notes } = req.body;
      const maintenance = await Maintenance.findOne({ 
        _id: req.params.id, 
        manager: req.user._id 
      });

      if (!maintenance) {
        return res.status(404).json({
          success: false,
          message: 'Maintenance request not found'
        });
      }

      maintenance.status = status;
      
      // Update dates based on status changes
      if (status === 'assigned' && !maintenance.assignedDate) {
        maintenance.assignedDate = new Date();
        maintenance.assignedTo = assignedTo;
      } else if (status === 'in_progress' && !maintenance.startedDate) {
        maintenance.startedDate = new Date();
      } else if (status === 'completed' && !maintenance.completedDate) {
        maintenance.completedDate = new Date();
        maintenance.actualCost = actualCost || maintenance.estimatedCost;
      }

      if (estimatedCost) maintenance.estimatedCost = estimatedCost;
      if (notes) maintenance.notes = notes;

      await maintenance.save();
      await maintenance.populate('room', 'roomNumber roomName hostelInfo.name');

      res.json({
        success: true,
        data: maintenance,
        message: 'Maintenance status updated successfully'
      });
    } catch (error) {
      console.error('Update maintenance status error:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating maintenance status'
      });
    }
  },

  // Add images to maintenance request
  addMaintenanceImages: async (req, res) => {
    try {
      const { images } = req.body;
      const maintenance = await Maintenance.findOne({ 
        _id: req.params.id, 
        manager: req.user._id 
      });

      if (!maintenance) {
        return res.status(404).json({
          success: false,
          message: 'Maintenance request not found'
        });
      }

      if (!images || !Array.isArray(images)) {
        return res.status(400).json({
          success: false,
          message: 'Images array is required'
        });
      }

      maintenance.images = [...maintenance.images, ...images];
      await maintenance.save();

      res.json({
        success: true,
        data: maintenance.images,
        message: 'Images added successfully'
      });
    } catch (error) {
      console.error('Add maintenance images error:', error);
      res.status(500).json({
        success: false,
        message: 'Error adding images'
      });
    }
  },

  // Delete maintenance request
  deleteMaintenanceRequest: async (req, res) => {
    try {
      const maintenance = await Maintenance.findOne({ 
        _id: req.params.id, 
        manager: req.user._id 
      });

      if (!maintenance) {
        return res.status(404).json({
          success: false,
          message: 'Maintenance request not found'
        });
      }

      await Maintenance.findByIdAndDelete(req.params.id);

      res.json({
        success: true,
        message: 'Maintenance request deleted successfully'
      });
    } catch (error) {
      console.error('Delete maintenance request error:', error);
      res.status(500).json({
        success: false,
        message: 'Error deleting maintenance request'
      });
    }
  },

  // Get maintenance statistics
  getMaintenanceStats: async (req, res) => {
    try {
      const stats = await Maintenance.aggregate([
        { $match: { manager: req.user._id } },
        {
          $group: {
            _id: null,
            totalRequests: { $sum: 1 },
            totalCost: { $sum: '$actualCost' },
            estimatedCost: { $sum: '$estimatedCost' },
            reportedCount: {
              $sum: { $cond: [{ $eq: ['$status', 'reported'] }, 1, 0] }
            },
            assignedCount: {
              $sum: { $cond: [{ $eq: ['$status', 'assigned'] }, 1, 0] }
            },
            inProgressCount: {
              $sum: { $cond: [{ $eq: ['$status', 'in_progress'] }, 1, 0] }
            },
            completedCount: {
              $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
            }
          }
        }
      ]);

      const categoryStats = await Maintenance.aggregate([
        { $match: { manager: req.user._id } },
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 },
            totalCost: { $sum: '$actualCost' },
            averageCost: { $avg: '$actualCost' }
          }
        }
      ]);

      const priorityStats = await Maintenance.aggregate([
        { $match: { manager: req.user._id } },
        {
          $group: {
            _id: '$priority',
            count: { $sum: 1 },
            averageCompletionTime: { 
              $avg: { 
                $subtract: ['$completedDate', '$reportedDate'] 
              } 
            }
          }
        }
      ]);

      res.json({
        success: true,
        data: {
          overview: stats[0] || {
            totalRequests: 0,
            totalCost: 0,
            estimatedCost: 0,
            reportedCount: 0,
            assignedCount: 0,
            inProgressCount: 0,
            completedCount: 0
          },
          byCategory: categoryStats,
          byPriority: priorityStats
        }
      });
    } catch (error) {
      console.error('Get maintenance stats error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching maintenance statistics'
      });
    }
  }
};

