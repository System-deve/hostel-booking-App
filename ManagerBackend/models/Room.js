const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: [true, 'Please add a room number'],
    trim: true
  },
  hostel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hostel',
    required: true
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  roomType: {
    type: String,
    enum: ['single', 'double', 'triple', 'shared'],
    required: true
  },
  floorNumber: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  currentOccupancy: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['available', 'occupied', 'maintenance', 'cleaning'],
    default: 'available'
  },
  isSelfContained: {
    type: Boolean,
    default: false
  },
  amenities: [String],
  images: [String],
  maintenanceReason: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Index for efficient queries
roomSchema.index({ manager: 1 });
roomSchema.index({ hostel: 1 });

module.exports = mongoose.model('Room', roomSchema);