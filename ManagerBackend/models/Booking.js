import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  // Tenant Information
  tenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',
    required: true
  },
  
  // Accommodation Details (only room reference now)
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  
  // Dates
  checkInDate: {
    type: Date,
    required: true
  },
  checkOutDate: {
    type: Date,
    required: true
  },
  actualCheckIn: Date,
  actualCheckOut: Date,
  
  // Financial Information
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  amountPaid: {
    type: Number,
    default: 0,
    min: 0
  },
  currency: {
    type: String,
    default: 'UGX'
  },
  securityDeposit: {
    type: Number,
    default: 0
  },
  
  // Status
  paymentStatus: {
    type: String,
    enum: ['pending', 'partial', 'paid', 'overdue', 'refunded'],
    default: 'pending'
  },
  bookingStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'active', 'completed', 'cancelled'],
    default: 'pending'
  },
  
  // Additional Information
  specialRequirements: String,
  notes: String,
  
  // Management
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Virtuals remain the same
bookingSchema.virtual('remainingAmount').get(function() {
  return this.totalAmount - this.amountPaid;
});

bookingSchema.virtual('durationMonths').get(function() {
  const diffTime = Math.abs(this.checkOutDate - this.checkInDate);
  const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
  return diffMonths;
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;