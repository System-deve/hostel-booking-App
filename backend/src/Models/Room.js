import mongoose from 'mongoose';

const roomImageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    isPrimary: {
        type: Boolean,
        default: false
    }
}, { _id: false });

const roomSchema = new mongoose.Schema({
    roomNumber: {
        type: String,
        required: [true, 'Room number is required'],
        trim: true
    },
    hostelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hostel',
        required: [true, 'Hostel ID is required']
    },
    roomGender: {
        type: String,
        enum: ['male', 'female', 'mixed'],
        required: [true, 'Room gender is required']
    },
    roomType: {
        type: String,
        enum: ['private', 'shared', 'dorm'],
        required: [true, 'Room type is required']
    },
    capacity: {
        type: Number,
        required: [true, 'Room capacity is required'],
        min: 1
    },
    roomImages: {
        type: [roomImageSchema],
        validate: {
            validator: function(images) {
                if (!images || images.length === 0) return false;
                const primaryCount = images.filter(img => img.isPrimary).length;
                return primaryCount === 1;
            },
            message: 'Room must have exactly one primary image'
        }
    },
    roomPrice: {
        type: Number,
        required: [true, 'Room price is required'],
        min: 0
    },
    roomDescription: {
        type: String,
        required: [true, 'Room description is required'],
        maxLength: 500
    },
    availableBeds: {
        type: Number,
        required: true,
        min: 0
    },
    amenities: {
        type: [String],
        default: []
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Index for efficient queries
roomSchema.index({ hostelId: 1, isAvailable: 1 });
roomSchema.index({ roomPrice: 1 });



export default mongoose.model('Room', roomSchema);