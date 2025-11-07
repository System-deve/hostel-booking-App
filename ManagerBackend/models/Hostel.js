const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a hostel name'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  contactPhone: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: true
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  totalRooms: {
    type: Number,
    default: 0
  },
  amenities: [String],
  images: [String],
  description: {
    type: String,
    trim: true
  },
  location: {
    coordinates: {
      lat: Number,
      lng: Number
    },
    area: String,
    city: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for efficient queries
hostelSchema.index({ manager: 1 });
hostelSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Hostel', hostelSchema);