import mongoose from 'mongoose';

const tenantSchema = new mongoose.Schema({
  // Personal Information
  fullName: {
    type: String,
    required: [true, 'Please add tenant full name'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Please add phone number'],
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  dateOfBirth: Date,
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  
  // Academic Information
  university: String,
  course: String,
  studentId: String,
  yearOfStudy: Number,
  faculty: String,
  
  // Emergency Contact
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String,
    address: String
  },
  
  // Identification
  idType: {
    type: String,
    enum: ['national_id', 'passport', 'student_id', 'driving_permit'],
    default: 'national_id'
  },
  idNumber: String,
  idDocument: String,
  
  // Current Accommodation (only room reference now)
  currentRoom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room'
  },
  checkInDate: Date,
  checkOutDate: Date,
  
  // Payment Information
  paymentPlan: {
    type: String,
    enum: ['monthly', 'quarterly', 'semester', 'annual'],
    default: 'monthly'
  },
  rentAmount: Number,
  depositPaid: {
    type: Boolean,
    default: false
  },
  
  // Status
  status: {
    type: String,
    enum: ['active', 'inactive', 'graduated', 'transferred', 'evicted'],
    default: 'active'
  },
  
  // Notes
  notes: String,
  specialRequirements: String,
  
  // Management
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Tenant = mongoose.model('Tenant', tenantSchema);
export default Tenant;