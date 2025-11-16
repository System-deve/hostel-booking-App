import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  // Reference to booking
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  tenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',
    required: true
  },
  
  // Payment Details
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'UGX'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'mobile_money', 'bank_transfer', 'credit_card'],
    required: true
  },
  
  // Mobile Money Details
  mobileMoney: {
    provider: {
      type: String,
      enum: ['mtn', 'airtel', 'africell', '']
    },
    phoneNumber: String,
    transactionId: String
  },
  
  // Bank Transfer Details
  bankTransfer: {
    bankName: String,
    accountNumber: String,
    transactionReference: String
  },
  
  // Purpose
  purpose: {
    type: String,
    enum: ['registration_fee', 'rent', 'deposit', 'utility', 'maintenance', 'other'],
    required: true
  },
  period: {
    month: Number,
    year: Number
  },
  
  // Status
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  
  // Dates
  paidDate: Date,
  dueDate: Date,
  
  // Additional Information
  notes: String,
  receiptNumber: String,
  
  // Management
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for efficient queries
paymentSchema.index({ tenant: 1 });
paymentSchema.index({ booking: 1 });
paymentSchema.index({ paidDate: -1 });

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;