import Payment from '../models/Payment.js';
import Tenant from '../models/Tenant.js';
import Room from '../models/Room.js';

export const paymentController = {
  // Add payment for tenant (matches your client API)
  addPayment: async (req, res) => {
    try {
      const { roomId, tenantId } = req.params;
      const paymentData = req.body;

      // Verify room and tenant belong to manager
      const room = await Room.findOne({ _id: roomId, manager: req.user._id });
      if (!room) {
        return res.status(404).json({
          success: false,
          message: 'Room not found'
        });
      }

      const tenant = await Tenant.findOne({ _id: tenantId, manager: req.user._id });
      if (!tenant) {
        return res.status(404).json({
          success: false,
          message: 'Tenant not found'
        });
      }

      // Create payment
      const payment = await Payment.create({
        ...paymentData,
        tenant: tenantId,
        manager: req.user._id,
        status: 'completed',
        paidDate: new Date()
      });

      // Update tenant balance
      const paymentAmount = parseInt(paymentData.amount);
      tenant.amountPaid = (tenant.amountPaid || 0) + paymentAmount;
      tenant.balance = Math.max(0, (tenant.balance || 0) - paymentAmount);

      // Add to tenant's payment history (embedded)
      if (!tenant.paymentHistory) tenant.paymentHistory = [];
      tenant.paymentHistory.push({
        amount: paymentAmount,
        date: new Date(),
        method: paymentData.paymentMethod || 'cash',
        reference: paymentData.receiptNumber,
        paymentId: payment._id
      });

      await tenant.save();

      // Populate and return
      await payment.populate('tenant', 'name phone email');

      res.status(201).json({
        success: true,
        data: payment,
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

  // Get payment history for tenant (matches your client API)
  getPaymentHistory: async (req, res) => {
    try {
      const { roomId, tenantId } = req.params;

      // Verify room and tenant belong to manager
      const room = await Room.findOne({ _id: roomId, manager: req.user._id });
      if (!room) {
        return res.status(404).json({
          success: false,
          message: 'Room not found'
        });
      }

      const tenant = await Tenant.findOne({ _id: tenantId, manager: req.user._id });
      if (!tenant) {
        return res.status(404).json({
          success: false,
          message: 'Tenant not found'
        });
      }

      // Get payments for this tenant
      const payments = await Payment.find({ 
        tenant: tenantId,
        manager: req.user._id 
      })
      .sort({ paidDate: -1 })
      .populate('tenant', 'name phone email');

      res.json({
        success: true,
        data: payments
      });

    } catch (error) {
      console.error('Get payment history error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching payment history'
      });
    }
  },

  // Update payment (matches your client API)
  updatePayment: async (req, res) => {
    try {
      const { roomId, tenantId, paymentId } = req.params;
      const updateData = req.body;

      // Verify room, tenant and payment belong to manager
      const room = await Room.findOne({ _id: roomId, manager: req.user._id });
      if (!room) {
        return res.status(404).json({
          success: false,
          message: 'Room not found'
        });
      }

      const tenant = await Tenant.findOne({ _id: tenantId, manager: req.user._id });
      if (!tenant) {
        return res.status(404).json({
          success: false,
          message: 'Tenant not found'
        });
      }

      const payment = await Payment.findOne({ _id: paymentId, manager: req.user._id });
      if (!payment) {
        return res.status(404).json({
          success: false,
          message: 'Payment not found'
        });
      }

      // Update payment
      const updatedPayment = await Payment.findByIdAndUpdate(
        paymentId,
        updateData,
        { new: true, runValidators: true }
      ).populate('tenant', 'name phone email');

      res.json({
        success: true,
        data: updatedPayment,
        message: 'Payment updated successfully'
      });

    } catch (error) {
      console.error('Update payment error:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating payment'
      });
    }
  },

  // Delete payment (matches your client API)
  deletePayment: async (req, res) => {
    try {
      const { roomId, tenantId, paymentId } = req.params;

      // Verify room, tenant and payment belong to manager
      const room = await Room.findOne({ _id: roomId, manager: req.user._id });
      if (!room) {
        return res.status(404).json({
          success: false,
          message: 'Room not found'
        });
      }

      const tenant = await Tenant.findOne({ _id: tenantId, manager: req.user._id });
      if (!tenant) {
        return res.status(404).json({
          success: false,
          message: 'Tenant not found'
        });
      }

      const payment = await Payment.findOne({ _id: paymentId, manager: req.user._id });
      if (!payment) {
        return res.status(404).json({
          success: false,
          message: 'Payment not found'
        });
      }

      // Remove from tenant's balance and payment history
      const paymentAmount = payment.amount;
      tenant.amountPaid = Math.max(0, (tenant.amountPaid || 0) - paymentAmount);
      tenant.balance = (tenant.balance || 0) + paymentAmount;
      
      // Remove from payment history
      if (tenant.paymentHistory) {
        tenant.paymentHistory = tenant.paymentHistory.filter(
          p => p.paymentId?.toString() !== paymentId
        );
      }

      await tenant.save();
      await Payment.findByIdAndDelete(paymentId);

      res.json({
        success: true,
        message: 'Payment deleted successfully'
      });

    } catch (error) {
      console.error('Delete payment error:', error);
      res.status(500).json({
        success: false,
        message: 'Error deleting payment'
      });
    }
  },

  // Additional useful payment methods
  getAllPayments: async (req, res) => {
    try {
      const { page = 1, limit = 20, status, purpose } = req.query;
      
      const filter = { manager: req.user._id };
      if (status) filter.status = status;
      if (purpose) filter.purpose = purpose;

      const payments = await Payment.find(filter)
        .populate('tenant', 'name phone email room')
        .populate({
          path: 'tenant',
          populate: { path: 'room', select: 'roomNumber' }
        })
        .sort({ paidDate: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await Payment.countDocuments(filter);

      res.json({
        success: true,
        data: payments,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(total / limit),
          results: payments.length,
          totalPayments: total
        }
      });

    } catch (error) {
      console.error('Get all payments error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching payments'
      });
    }
  },

  // Get payment statistics
  getPaymentStats: async (req, res) => {
    try {
      const today = new Date();
      const currentMonth = today.getMonth() + 1;
      const currentYear = today.getFullYear();

      // Monthly stats
      const monthlyStats = await Payment.aggregate([
        {
          $match: {
            manager: req.user._id,
            status: 'completed',
            'period.month': currentMonth,
            'period.year': currentYear
          }
        },
        {
          $group: {
            _id: '$purpose',
            totalAmount: { $sum: '$amount' },
            count: { $sum: 1 }
          }
        }
      ]);

      // Total collected
      const totalCollected = await Payment.aggregate([
        {
          $match: {
            manager: req.user._id,
            status: 'completed'
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$amount' },
            count: { $sum: 1 }
          }
        }
      ]);

      res.json({
        success: true,
        data: {
          monthlyStats,
          totalCollected: totalCollected[0]?.total || 0,
          totalTransactions: totalCollected[0]?.count || 0
        }
      });

    } catch (error) {
      console.error('Get payment stats error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching payment statistics'
      });
    }
  }
};