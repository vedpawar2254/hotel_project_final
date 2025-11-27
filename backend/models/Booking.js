const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    bookingId: {
        type: String,
        required: true,
        unique: true
    },
    roomNumber: {
        type: Number,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    contactEmail: {
        type: String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    contactPhone: {
        type: String
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed', 'refunded'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        enum: ['card', 'upi', 'cash', 'netbanking', 'wallet']
    },
    bookingStatus: {
        type: String,
        enum: ['reserved', 'checked_in', 'checked_out', 'cancelled', 'no_show'],
        default: 'reserved'
    },
    guests: {
        type: Number
    },
    roomType: {
        type: String,
        enum: ['single', 'double', 'suite']
    },
    specialRequests: {
        type: String
    },
    checkIn: {
        checkInDate: { type: Date, required: true },
        checkInMonth: { type: Number, min: 1, max: 12 },
        checkInDay: { type: Number, min: 1, max: 31 },
        checkInYear: { type: Number }
    },
    checkOut: {
        checkOutDate: { type: Date, required: true },
        checkOutMonth: { type: Number, min: 1, max: 12 },
        checkOutDay: { type: Number, min: 1, max: 31 },
        checkOutYear: { type: Number }
    },
    nights: {
        type: Number
    },
    totalAmount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'INR'
    },
    airportPickupIncluded: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Calculate nights before saving
bookingSchema.pre('save', function (next) {
    if (this.checkIn.checkInDate && this.checkOut.checkOutDate) {
        const diffTime = Math.abs(this.checkOut.checkOutDate - this.checkIn.checkInDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        this.nights = diffDays;
    }
    next();
});

// Indexes
bookingSchema.index({ roomNumber: 1 });
bookingSchema.index({ 'checkIn.checkInDate': 1 });
bookingSchema.index({ 'checkOut.checkOutDate': 1 });
bookingSchema.index({ 'checkIn.checkInYear': 1, 'checkIn.checkInMonth': 1, 'checkIn.checkInDay': 1 });
bookingSchema.index({ 'checkOut.checkOutYear': 1, 'checkOut.checkOutMonth': 1, 'checkOut.checkOutDay': 1 });
bookingSchema.index({ customerName: 1, 'checkIn.checkInDate': -1 });
bookingSchema.index({ bookingStatus: 1 });
bookingSchema.index({ roomType: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
