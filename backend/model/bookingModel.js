const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    eventType: {
        type: String,
        required: true,
    },
    peopleNumber: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
