const Booking = require('../model/bookingmodel');
const Users = require("../model/userModel")
exports.createBooking = async (req, res) => {
    try {
        const { userId,eventType, peopleNumber, date } = req.body;
        
        // Validate input fields
        if (!eventType || !peopleNumber || !date) {
            return res.status(400).json({ message: 'Please provide all required fields: eventType, peopleNumber, date' });
        }

        // Check if user exists
        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newBooking = new Booking({
           
            userId,
            eventType,
            peopleNumber,
            date,
        });

        await newBooking.save();
        res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (error) {
        console.error('Error creating booking', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


exports.getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.getBooking = async (req, res) => {
    try {
        const userId = req.params.userId;
        // Check if user exists
        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Fetch bookings for the user
        const bookings = await Booking.find({ userId }).exec();
        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found for this user' });
        }
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.updateBooking = async (req, res) => {
    try {
        const { eventType, peopleNumber, date } = req.body;
        const booking = await Booking.findByIdAndUpdate(req.params.id, {
            eventType,
            peopleNumber,
            date,
        }, { new: true });
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json({ message: 'Booking updated successfully', booking });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
