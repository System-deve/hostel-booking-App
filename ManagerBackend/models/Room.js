import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  // Basic Information
  roomNumber: {
    type: String,
    required: [true, 'Please add a room number'],
    trim: true,
    uppercase: true
  },
  roomName: {
    type: String,
    trim: true
  },
  
  // Hostel Information (now part of room data)
  hostelInfo: {
    name: {
      type: String,
      required: [true, 'Please add hostel name'],
      trim: true
    },
    location: {
      district: {
        type: String,
        required: true
      },
      street: String,
      gpsCoordinates: {
        lat: Number,
        lng: Number
      }
    },
    contact: {
      phone: String,
      email: String
    },
    hostelType: {
      type: String,
      enum: ['male', 'female', 'mixed'],
      default: 'mixed'
    },
    hostelCategory: {
      type: String,
      enum: ['economy', 'standard', 'premium', 'luxury'],
      default: 'standard'
    }
  },
  
  // Room Classification
  roomType: {
    type: String,
    enum: ['single', 'double', 'triple', 'quad', 'shared-dorm'],
    required: true
  },
  floorNumber: {
    type: Number,
    required: true,
    min: 0
  },
  
  // Capacity & Occupancy
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  currentOccupancy: {
    type: Number,
    default: 0,
    min: 0,
    validate: {
      validator: function(value) {
        return value <= this.capacity;
      },
      message: 'Current occupancy cannot exceed room capacity'
    }
  },
  
  // Features
  isSelfContained: {
    type: Boolean,
    default: false
  },
  hasAirConditioning: {
    type: Boolean,
    default: false
  },
  hasWifi: {
    type: Boolean,
    default: false
  },
  hasTV: {
    type: Boolean,
    default: false
  },
  hasFridge: {
    type: Boolean,
    default: false
  },
  hasBalcony: {
    type: Boolean,
    default: false
  },
  
  // Amenities
  amenities: [String],
  
  // Pricing
  price: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'UGX'
  },
  deposit: {
    type: Number,
    default: 0
  },
  
  // Status
  status: {
    type: String,
    enum: ['available', 'occupied', 'partially-occupied', 'maintenance', 'cleaning'],
    default: 'available'
  },
  
  // Maintenance
  maintenance: {
    required: { type: Boolean, default: false },
    reason: String,
    startDate: Date,
    expectedCompletion: Date,
    cost: { type: Number, default: 0 },
    notes: String
  },
  
  // Images
  images: [String],
  primaryImage: {
    type: String,
    default: ''
  },
  
  // Description
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  
  // Management
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Virtuals
roomSchema.virtual('availableBeds').get(function() {
  return this.capacity - this.currentOccupancy;
});

roomSchema.virtual('occupancyPercentage').get(function() {
  return this.capacity > 0 ? (this.currentOccupancy / this.capacity) * 100 : 0;
});

// Methods
roomSchema.methods.isAvailable = function() {
  return this.status === 'available' && this.currentOccupancy < this.capacity;
};

const Room = mongoose.model('Room', roomSchema);
export default Room;