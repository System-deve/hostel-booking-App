import Tenant from '../models/Tenant.js';
import Room from '../models/Room.js';

export const tenantController = {
  // Get all tenants for manager
  getTenants: async (req, res) => {
    try {
      const tenants = await Tenant.find({ manager: req.user._id })
        .populate('room')
        .sort({ createdAt: -1 });

      res.json({
        success: true,
        data: tenants
      });
    } catch (error) {
      console.error('Get tenants error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching tenants'
      });
    }
  },

  // Get overdue tenants (with balance > 0)
  getOverdueTenants: async (req, res) => {
    try {
      const tenants = await Tenant.find({
        manager: req.user._id,
        balance: { $gt: 0 }
      }).populate('room');

      res.json({
        success: true,
        data: tenants
      });
    } catch (error) {
      console.error('Get overdue tenants error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching overdue tenants'
      });
    }
  },

  // Get single tenant
  getTenant: async (req, res) => {
    try {
      const tenant = await Tenant.findOne({
        _id: req.params.id,
        manager: req.user._id
      }).populate('room');

      if (!tenant) {
        return res.status(404).json({
          success: false,
          message: 'Tenant not found'
        });
      }

      res.json({
        success: true,
        data: tenant
      });
    } catch (error) {
      console.error('Get tenant error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching tenant'
      });
    }
  },

  // Update tenant
  updateTenant: async (req, res) => {
    try {
      const tenant = await Tenant.findOne({
        _id: req.params.id,
        manager: req.user._id
      });

      if (!tenant) {
        return res.status(404).json({
          success: false,
          message: 'Tenant not found'
        });
      }

      const updatedTenant = await Tenant.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      ).populate('room');

      res.json({
        success: true,
        data: updatedTenant,
        message: 'Tenant updated successfully'
      });
    } catch (error) {
      console.error('Update tenant error:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating tenant'
      });
    }
  },

  // Add payment for tenant
  addPayment: async (req, res) => {
    try {
      const { amount, method, reference } = req.body;
      const tenant = await Tenant.findOne({
        _id: req.params.tenantId,
        manager: req.user._id
      });

      if (!tenant) {
        return res.status(404).json({
          success: false,
          message: 'Tenant not found'
        });
      }

      const paymentAmount = parseInt(amount);

      // Update tenant balance
      tenant.amountPaid = (tenant.amountPaid || 0) + paymentAmount;
      tenant.balance = Math.max(0, (tenant.balance || 0) - paymentAmount);

      // Add to payment history
      tenant.paymentHistory.push({
        amount: paymentAmount,
        date: new Date(),
        method: method || 'cash',
        reference: reference
      });

      await tenant.save();

      res.json({
        success: true,
        data: tenant,
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

  // Get payment history for tenant
  getPaymentHistory: async (req, res) => {
    try {
      const tenant = await Tenant.findOne({
        _id: req.params.tenantId,
        manager: req.user._id
      });

      if (!tenant) {
        return res.status(404).json({
          success: false,
          message: 'Tenant not found'
        });
      }

      res.json({
        success: true,
        data: tenant.paymentHistory || []
      });
    } catch (error) {
      console.error('Get payments error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching payment history'
      });
    }
  },

  // Delete tenant
  deleteTenant: async (req, res) => {
    try {
      const tenant = await Tenant.findOne({
        _id: req.params.id,
        manager: req.user._id
      });

      if (!tenant) {
        return res.status(404).json({
          success: false,
          message: 'Tenant not found'
        });
      }

      // Remove tenant from room
      const room = await Room.findById(tenant.room);
      if (room) {
        room.tenants = room.tenants.filter(t => t.toString() !== req.params.id);
        room.currentOccupancy = Math.max(0, room.currentOccupancy - 1);
        await room.save();
      }

      await Tenant.findByIdAndDelete(req.params.id);

      res.json({
        success: true,
        message: 'Tenant deleted successfully'
      });
    } catch (error) {
      console.error('Delete tenant error:', error);
      res.status(500).json({
        success: false,
        message: 'Error deleting tenant'
      });
    }
  }
};