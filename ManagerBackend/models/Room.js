const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: [true, 'Please add a room number'],
    trim: true
  },
  roomType: {
    type: String,
    enum: ['single', 'double', 'triple'],
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
    enum: ['available', 'occupied', 'partially-occupied', 'maintenance'],
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
  },
  // This links the room to the manager who owns it
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Room', roomSchema);