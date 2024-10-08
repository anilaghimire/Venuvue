const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users", // Reference to the Users collection
        required: true
    },
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
