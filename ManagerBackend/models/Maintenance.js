import mongoose from 'mongoose';

const maintenanceSchema = new mongoose.Schema({
  // Issue Information
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  category: {
    type: String,
    enum: ['plumbing', 'electrical', 'furniture', 'cleaning', 'security', 'other'],
    required: true
  },
  
  // Location (only room reference now)
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  specificLocation: String,
  
  // Reporting
  reportedBy: {
    type: String,
    required: true
  },
  reporterPhone: String,
  reporterEmail: String,
  
  // Status & Resolution
  status: {
    type: String,
    enum: ['reported', 'assigned', 'in_progress', 'completed', 'cancelled'],
    default: 'reported'
  },
  assignedTo: String,
  estimatedCost: Number,
  actualCost: Number,
  completionDate: Date,
  
  // Timeline
  reportedDate: {
    type: Date,
    default: Date.now
  },
  assignedDate: Date,
  startedDate: Date,
  completedDate: Date,
  
  // Additional Information
  notes: String,
  images: [String],
  
  // Management
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Maintenance = mongoose.model('Maintenance', maintenanceSchema);
export default Maintenance;